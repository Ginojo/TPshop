# AWS Complete Setup Guide for TPshop + Bot + Other Services

## 🎯 What This Setup Gives You:

One EC2 instance running:
- ✅ TPshop website
- ✅ Email server for contact forms
- ✅ Your bot (24/7)
- ✅ PostgreSQL database
- ✅ Redis cache
- ✅ Room for more services

## 💰 Cost Estimate:

**Option 1: t3.medium EC2 instance**
- ~$30/month (if running 24/7)
- 2 vCPUs, 4GB RAM
- Good for website + bot + email server

**Option 2: t3.small EC2 instance**
- ~$15/month (if running 24/7)
- 2 vCPUs, 2GB RAM
- Minimum viable option

**Free Tier Option (first year only):**
- t2.micro: 1 vCPU, 1GB RAM
- Free for 12 months
- May be tight for all services

## 🚀 Step-by-Step Setup:

### 1. Launch EC2 Instance

```bash
# Go to AWS Console > EC2 > Launch Instance
# Choose:
- AMI: Ubuntu Server 22.04 LTS
- Instance Type: t3.medium (recommended)
- Storage: 30GB gp3
- Security Group: Open ports 22, 80, 443, 3001
```

### 2. Connect to Your Instance

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 3. Install Docker & Docker Compose

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add user to docker group
sudo usermod -aG docker $USER

# Logout and login again for changes to take effect
exit
# Then SSH back in
```

### 4. Clone Your Repository

```bash
git clone https://github.com/yourusername/TPshop.git
cd TPshop
```

### 5. Set Up Environment Variables

```bash
# Create .env file
nano .env

# Add these variables:
AWS_SES_USER=your-ses-smtp-user
AWS_SES_PASSWORD=your-ses-smtp-password
BOT_TOKEN=your-bot-token
DB_PASSWORD=choose-a-strong-password
TO_EMAIL=ginoludik@gmail.com
FROM_EMAIL=noreply@tpshop.be
```

### 6. Configure AWS SES for Email

```bash
# In AWS Console:
1. Go to Simple Email Service (SES)
2. Verify your domain (tpshop.be)
3. Create SMTP credentials
4. Add credentials to .env file
```

### 7. Start All Services

```bash
# Build and start all containers
sudo docker-compose up -d

# Check if everything is running
sudo docker-compose ps

# View logs
sudo docker-compose logs -f
```

### 8. Set Up SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d tpshop.be -d www.tpshop.be
```

### 9. Set Up Auto-restart on Reboot

```bash
# Docker containers already have "restart: always"
# But ensure Docker starts on boot:
sudo systemctl enable docker
```

## 🔧 Managing Your Services:

### Check Status:
```bash
sudo docker-compose ps
```

### Restart a Service:
```bash
sudo docker-compose restart email-server
sudo docker-compose restart bot
```

### View Logs:
```bash
sudo docker-compose logs -f bot
sudo docker-compose logs -f email-server
```

### Update Code:
```bash
git pull
sudo docker-compose down
sudo docker-compose up -d --build
```

## 📊 Monitoring:

### Free Monitoring with CloudWatch:
```bash
# AWS automatically provides basic monitoring
# CPU, Network, Disk usage visible in EC2 console
```

### Check Resource Usage:
```bash
docker stats
htop  # Install with: sudo apt install htop
```

## 🔐 Security Best Practices:

1. **Use Security Groups properly:**
   - Only open necessary ports
   - Restrict SSH to your IP

2. **Regular Updates:**
   ```bash
   # Set up automatic security updates
   sudo apt install unattended-upgrades -y
   sudo dpkg-reconfigure unattended-upgrades
   ```

3. **Backup Strategy:**
   - Use AWS EBS snapshots
   - Set up automated backups

## 💡 Tips:

1. **Use Elastic IP:** Prevents IP change on restart
2. **Set up CloudWatch Alarms:** Get notified if server goes down
3. **Consider AWS Systems Manager:** For easier management
4. **Use Route 53:** For DNS management

## 🆘 Troubleshooting:

### If email server doesn't work:
```bash
# Check logs
sudo docker-compose logs email-server

# Test SES credentials
curl http://localhost:3001/api/health
```

### If bot crashes:
```bash
# Check logs
sudo docker-compose logs bot

# Restart bot
sudo docker-compose restart bot
```

### If running out of space:
```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a
```

## 📈 Scaling Options:

When you grow, you can:
1. **Vertical Scaling:** Upgrade to larger EC2 instance
2. **Horizontal Scaling:** Add load balancer + multiple instances
3. **Serverless Migration:** Move some services to Lambda
4. **Managed Services:** Use RDS for database, ElastiCache for Redis

## 💰 Money-Saving Tips:

1. **Use Reserved Instances:** Save 40-70% for 1-3 year commitment
2. **Use Spot Instances:** For non-critical services (not the bot)
3. **Stop Dev/Test instances:** When not in use
4. **Use S3 for static assets:** Instead of serving from EC2
5. **Enable CloudFront CDN:** For better performance and lower costs