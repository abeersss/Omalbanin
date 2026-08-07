# Deploying omalbnin.com to Hostinger

The site is a static export. There is no Node runtime on the server, no
database and no build step to run there. Deploying means copying files into
the domain's document root.

Deploy package: `C:\Users\Lenovo1\Downloads\omalbnin-deploy.zip` (3.8 MB, 587
files). It contains the **contents** of `out/`, so extracting it directly
inside the document root puts `index.html` at the site root, not inside a
subfolder.

Rebuild it any time with:

```bash
npm run build
```

then re-zip the contents of `out/`.

---

## Route A: hPanel File Manager (no FTP password needed)

This is the route to use if you do not have FTP credentials. Everything
happens in the browser with your normal Hostinger login.

### 1. Back up what is live now

Do this before touching anything. It is the only step that cannot be undone
later.

1. hPanel, then **Files**, then **File Manager**.
2. Open the document root. It is usually `public_html`. If your domain is an
   addon domain it may be `domains/omalbnin.com/public_html` instead. The
   correct folder is the one containing `wp-config.php` and `wp-content`.
3. Select everything in that folder, right-click, then **Compress**, and name
   it `wp-backup-before-migration.zip`.
4. **Download that zip to your computer.** A backup that only exists on the
   server is not a backup, because the next step edits that same server.
5. Separately, hPanel, then **Files**, then **Backups**, and take a full
   account backup including the database if your plan offers it.

Note on scope: this repo already carries a *content* archive at
`Downloads\Omalbanin-wp-backup` (38 media files plus the legacy page HTML).
That is not a substitute for step 1. It does not contain the WordPress
installation, the theme, plugins, or the database.

### 2. Clear the document root

Safer than deleting: create a folder `old-wp/` and move the existing
WordPress files and folders into it. You can delete `old-wp/` once the new
site is verified.

If you delete instead, remove the WordPress files but leave any folder
Hostinger manages itself (for example `.well-known`, which holds SSL
validation data).

### 3. Upload and extract

1. With the document root open, use **Upload Files** and select
   `omalbnin-deploy.zip`.
2. Right-click the uploaded zip, then **Extract**, into the current folder.
3. Delete the zip from the server once extracted.

### 4. Confirm `.htaccess` actually landed

This is the step people miss. `.htaccess` starts with a dot, so File Manager
hides it by default and every legacy URL redirect depends on it.

In File Manager, open **Settings** and enable **Show hidden files**. You
should see `.htaccess` at the document root, about 4 KB. If it is missing,
the redirects are dead even though the site will otherwise look fine.

---

## Route B: scripted FTP upload

Use this if you later create FTP credentials. In hPanel, go to **Files**,
then **FTP Accounts**, where you can see the FTP host and username and set a
new password. Hostinger does not show you an existing password, it only lets
you set a new one.

Put the credentials in a local `.env.deploy` file, which is gitignored:

```
FTP_HOST=ftp.omalbnin.com
FTP_USER=your-ftp-username
FTP_PASSWORD=the-password-you-just-set
FTP_REMOTE_DIR=/public_html
```

Then install the uploader and run it:

```bash
npm install --save-dev basic-ftp dotenv
```

```bash
node scripts/deploy-ftp.mjs
```

Keep `.env.deploy` on your machine only. Never commit it.

---

## Verification after deploy

Run these from your machine. Each one checks something that has actually
broken on this project before.

HTTPS and both locales load:

```bash
curl -sI https://omalbnin.com/ar/ | head -n 1
```

```bash
curl -sI https://omalbnin.com/en/ | head -n 1
```

Root redirects to the Arabic homepage:

```bash
curl -sI https://omalbnin.com/ | grep -i -E "^(HTTP|location)"
```

A legacy Arabic URL still 301s. This is the one that was silently broken
before the `.htaccess` rewrite, so it is worth checking carefully. Expect
`301` and a `location` of `/ar/hadith-al-kisa/`:

```bash
curl -sI "https://omalbnin.com/%d8%ad%d8%af%d9%8a%d8%ab-%d8%a7%d9%84%d9%83%d8%b3%d8%a7%d8%a1/" | grep -i -E "^(HTTP|location)"
```

A legacy ASCII URL 301s to the Sofra al-Khidr page:

```bash
curl -sI https://omalbnin.com/sample-page/ | grep -i -E "^(HTTP|location)"
```

The rescued legacy images are served by the new site, not the old WordPress
uploads folder. Expect `200` and `image/png`:

```bash
curl -sI https://omalbnin.com/images/legacy/ur-6.png | grep -i -E "^(HTTP|content-type)"
```

Old wp-content image URLs still resolve, so anything linking them externally
does not break:

```bash
curl -sI https://omalbnin.com/wp-content/uploads/2023/03/ur-6.png | grep -i -E "^(HTTP|location)"
```

Sitemap and robots are live:

```bash
curl -s https://omalbnin.com/robots.txt
```

Then load `https://omalbnin.com/ar/` on a phone, and check the browser
console for errors.

---

## Known cosmetic issue

Next.js 16 writes its client-side prefetch payloads as directory paths
(`/ar/duas/__next.$d$locale/duas/__PAGE__.txt`) while the browser requests
them dot-joined (`/ar/duas/__next.$d$locale.duas.__PAGE__.txt`). Those
requests 404 in the console.

Impact is limited to prefetching. Navigation still works because it falls
back to a normal page load. It is noise in the console, not a broken site.
