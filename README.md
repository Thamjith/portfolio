# portfolio

## Server Setup

### Prerequisites
- Ubuntu server with nginx installed
- Domain DNS A records pointing to `18.210.59.148`
- Certbot installed: `sudo apt install certbot python3-certbot-nginx`
- **Deploy target directory:** GitHub Actions rsync needs `EC2_DEPLOY_PATH` to exist and be writable by **`ubuntu`** (`EC2_USER`); otherwise deploy fails. **§1 Create web root** does exactly that—run it once on the server before the first deploy to `main`.

### 1. Create web root

Rsync deploys over SSH as **`ubuntu`** (set **`EC2_USER`** to `ubuntu` in secrets). That user must own **`EC2_DEPLOY_PATH`** so it can create and replace files there.

```bash
sudo mkdir -p /var/www/thamjiththaha.com
sudo chown -R ubuntu:ubuntu /var/www/thamjiththaha.com
sudo chmod -R u+rwX /var/www/thamjiththaha.com
```

If the folder already existed with other ownership (e.g. `root` or `www-data`), the recursive `chown` fixes rsync “Permission denied”. Nginx still serves static files if files stay world-readable and directories traversable (`644` / `755`), which rsync’s defaults usually preserve.

### 2. Configure nginx
```bash
sudo apt update && sudo apt install -y curl
sudo curl -fsSL https://raw.githubusercontent.com/Thamjith/portfolio/refs/heads/main/setup/nginx.conf -o /etc/nginx/sites-available/thamjiththaha.com

# Enable the site
sudo ln -s /etc/nginx/sites-available/thamjiththaha.com /etc/nginx/sites-enabled/thamjiththaha.com

# Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### 3. SSL certificate
```bash
sudo certbot --nginx -d thamjiththaha.com -d www.thamjiththaha.com
```

### 4. Allow nginx reload without password (required for GitHub Actions)
```bash
echo "ubuntu ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/nginx-reload
```

### 5. GitHub Secrets
Add these in **Settings → Secrets and variables → Actions**:

| Secret | Value |
|---|---|
| `EC2_HOST` | `18.210.59.148` |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Contents of your `.pem` private key file |
| `EC2_DEPLOY_PATH` | `/var/www/thamjiththaha.com` |
| `EC2_SSH_PORT` | `22` |

`EC2_DEPLOY_PATH` is not sensitive; you can store it as a **repository variable** instead of a secret so logs show the real path when debugging. If you keep it as a secret, GitHub masks it as `***`, including in rsync errors like `mkdir "***" failed: Permission denied`.

**That error usually means the path in `EC2_DEPLOY_PATH` is wrong, not that “files already exist”.** Typical cases: the secret is **empty** or only whitespace (rsync then targets `/` and cannot create directories); the value is **`/var/www`** instead of **`/var/www/thamjiththaha.com`** (as `ubuntu` you cannot create directories under `/var/www` when it is `root`-owned `755`); or the value has accidental **leading/trailing spaces or newlines** from pasting—delete and re-create the secret/variable.

### If deploy fails: rsync permission denied

On the server, confirm **`ubuntu`** owns `/var/www/thamjiththaha.com` (same as **`EC2_DEPLOY_PATH`**):

```bash
ls -ld /var/www /var/www/thamjiththaha.com
stat -c '%U %G' /var/www/thamjiththaha.com
```

For the site directory, `ls -ld` should show **`ubuntu`** **`ubuntu`** in the third and fourth columns; `stat` should print **`ubuntu ubuntu`**.

Then repair:

```bash
sudo chown -R ubuntu:ubuntu /var/www/thamjiththaha.com
sudo chmod -R u+rwX /var/www/thamjiththaha.com
```

Ensure the SSH private key is for the **`ubuntu`** account, not `root`.

### 6. Updating nginx config later
```bash
sudo apt install -y curl
sudo curl -fsSL https://raw.githubusercontent.com/Thamjith/portfolio/refs/heads/main/setup/nginx.conf -o /etc/nginx/sites-available/thamjiththaha.com
sudo nginx -t && sudo systemctl reload nginx
```