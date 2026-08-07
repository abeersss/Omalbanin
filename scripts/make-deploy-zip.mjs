/**
 * Builds the deploy zip with correct Unix permissions.
 *
 * Why this exists: a zip produced by Windows tooling (including .NET's
 * ZipFile.CreateFromDirectory) carries no Unix mode bits. Extracting it on the
 * Linux host produced directories without the execute bit, so the web server
 * could not traverse into them: /_next/ returned 403 and every stylesheet
 * inside it 404'd, leaving the site rendering as unstyled HTML. It also broke
 * the file manager's own move operation, which silently created empty
 * directory shells because it could not descend either.
 *
 * Setting externalAttributes to (mode << 16) stores 0755 on directories and
 * 0644 on files, which is what the extractor then applies.
 */
import { createWriteStream } from "node:fs";
import { readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { createReadStream } from "node:fs";
import { ZipFile } from "yazl";

const SRC = process.argv[2] ?? "out";
const OUT = process.argv[3] ?? "omalbnin-deploy.zip";

const DIR_MODE = 0o40755; // drwxr-xr-x
const FILE_MODE = 0o100644; // -rw-r--r--

async function walk(dir, acc = { dirs: [], files: [] }) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) {
      acc.dirs.push(full);
      await walk(full, acc);
    } else {
      acc.files.push(full);
    }
  }
  return acc;
}

const zip = new ZipFile();
const { dirs, files } = await walk(SRC);

// Directory entries must be present and executable, otherwise the extractor
// invents them with whatever the umask gives.
for (const d of dirs) {
  const rel = relative(SRC, d).split(sep).join("/") + "/";
  zip.addEmptyDirectory(rel, { mode: DIR_MODE });
}

for (const f of files) {
  const rel = relative(SRC, f).split(sep).join("/");
  zip.addReadStream(createReadStream(f), rel, { mode: FILE_MODE });
}

zip.outputStream.pipe(createWriteStream(OUT)).on("close", () => {
  console.log(`${OUT}: ${dirs.length} directories (0755), ${files.length} files (0644)`);
});
zip.end();
