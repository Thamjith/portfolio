# portfolio

## Server Setup

### Prerequisites
- Ubuntu server with nginx installed
- Domain DNS A records pointing to `18.210.59.148`
- Certbot installed: `sudo apt install certbot python3-certbot-nginx`

### 1. Create web root
```bash
sudo mkdir -p /var/www/thamjiththaha.com
sudo chown ubuntu:ubuntu /var/www/thamjiththaha.com
```

### 2. Configure nginx
```bash
# Copy nginx config from repo
sudo cp setup/nginx.conf /etc/nginx/sites-available/thamjiththaha.com

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

### 6. Updating nginx config later
If `setup/nginx.conf` is ever changed, re-apply it on the server:
```bash
sudo cp setup/nginx.conf /etc/nginx/sites-available/thamjiththaha.com
sudo nginx -t && sudo systemctl reload nginx
```