# portfolio

Live: **[thamjiththaha.com](https://thamjiththaha.com)** — open in a browser for the SPA; use **`curl https://thamjiththaha.com`** for the plain-text terminal resume (CLI user agents).

| Browser | `curl` |
| --- | --- |
| ![Browser](https://github.com/user-attachments/assets/fa01c7f6-0c06-46bd-bd87-a6b2dfc97df0) | ![curl](https://github.com/user-attachments/assets/080780a8-1b3f-4974-8134-092936563aa1) |

## GitHub Actions

`.github/workflows/build.yml`: **`npm ci`** + **`npm run build`** on pushes and PRs to **`main`**. **Deploy (rsync to EC2)** only runs on push to **`main`** after a successful build.

### Secrets / variables

| Name | Example |
| --- | --- |
| `EC2_HOST` | `18.210.59.148` |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | PEM key contents |
| `EC2_DEPLOY_PATH` | `/var/www/thamjiththaha.com` |
| `EC2_SSH_PORT` | `22` |

Deploy needs **`EC2_DEPLOY_PATH`** owned by **`EC2_USER`** (see setup commands below).

## Server setup (once)

Prerequisites: Ubuntu, nginx, DNS if you want HTTPS.

```bash
# Web root (must match EC2_DEPLOY_PATH)
sudo mkdir -p /var/www/thamjiththaha.com
sudo chown -R ubuntu:ubuntu /var/www/thamjiththaha.com

# Site config — see comments in setup/nginx.conf (Certbot order, merge warnings)
sudo apt update && sudo apt install -y curl
sudo curl -fsSL https://raw.githubusercontent.com/Thamjith/portfolio/refs/heads/main/setup/nginx.conf \
  -o /etc/nginx/sites-available/thamjiththaha.com
sudo ln -sf /etc/nginx/sites-available/thamjiththaha.com /etc/nginx/sites-enabled/thamjiththaha.com
sudo nginx -t && sudo systemctl reload nginx

# TLS (paths in nginx.conf expect certs afterward)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d thamjiththaha.com -d www.thamjiththaha.com
```


### After `setup/nginx.conf` changes

Fetch **`main`**’s [`setup/nginx.conf`](setup/nginx.conf) and reload nginx:

```bash
sudo curl -fsSL https://raw.githubusercontent.com/Thamjith/portfolio/refs/heads/main/setup/nginx.conf \
  -o /etc/nginx/sites-available/thamjiththaha.com
sudo nginx -t && sudo systemctl reload nginx
```
