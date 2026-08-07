/**
 * Uploads the contents of out/ to Hostinger over FTPS.
 *
 * Credentials are read from .env.deploy, which is gitignored and must never be
 * committed. This script does not accept a password on the command line, so it
 * does not end up in your shell history.
 *
 *   npm install --save-dev basic-ftp dotenv
 *   node scripts/deploy-ftp.mjs           # upload
 *   node scripts/deploy-ftp.mjs --dry-run # list what would be uploaded
 */
import { Client } from "basic-ftp";
import dotenv from "dotenv";
import { readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

dotenv.config({ path: ".env.deploy" });

const { FTP_HOST, FTP_USER, FTP_PASSWORD } = process.env;
const REMOTE_DIR = process.env.FTP_REMOTE_DIR || "/public_html";
const LOCAL_DIR = "out";
const dryRun = process.argv.includes("--dry-run");

const missing = ["FTP_HOST", "FTP_USER", "FTP_PASSWORD"].filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing in .env.deploy: ${missing.join(", ")}`);
  console.error("See DEPLOY.md, Route B, for how to create these in hPanel.");
  process.exit(1);
}

if (!existsSync(LOCAL_DIR)) {
  console.error(`${LOCAL_DIR}/ does not exist. Run "npm run build" first.`);
  process.exit(1);
}

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(LOCAL_DIR);
const htaccess = files.find((f) => f.endsWith(".htaccess"));

// The redirects for every legacy WordPress URL live in .htaccess. Without it
// the site still renders, so a broken deploy looks fine until you test an old
// URL. Fail loudly instead.
if (!htaccess) {
  console.error("out/.htaccess is missing. The legacy URL redirects would be lost.");
  console.error('Check that public/.htaccess exists, then rebuild with "npm run build".');
  process.exit(1);
}

console.log(`${files.length} files in ${LOCAL_DIR}/, including .htaccess`);

if (dryRun) {
  for (const f of files) console.log(`  would upload ${relative(LOCAL_DIR, f)}`);
  console.log(`\nDry run only. Target would be ${FTP_HOST}${REMOTE_DIR}`);
  process.exit(0);
}

const client = new Client(30_000);
client.ftp.verbose = false;

try {
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASSWORD,
    secure: true,
    secureOptions: { rejectUnauthorized: true },
  });

  console.log(`Connected to ${FTP_HOST}, uploading to ${REMOTE_DIR}`);
  await client.ensureDir(REMOTE_DIR);

  client.trackProgress((info) => {
    if (info.name) process.stdout.write(`\r  ${info.name.padEnd(70).slice(0, 70)}`);
  });

  // uploadFromDir sends directory contents, so out/index.html lands at the
  // document root rather than inside an out/ subfolder.
  await client.uploadFromDir(LOCAL_DIR, REMOTE_DIR);
  client.trackProgress();

  console.log("\n\nUpload finished.");
  console.log("Now run the verification commands in DEPLOY.md, especially the");
  console.log("legacy Arabic URL check, which confirms .htaccess is active.");
} catch (err) {
  console.error(`\nDeploy failed: ${err.message}`);
  process.exitCode = 1;
} finally {
  client.close();
}
