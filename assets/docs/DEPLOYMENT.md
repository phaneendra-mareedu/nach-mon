# Deployment Guide

## Overview

This guide covers deploying the NACH Dashboard v6.5 to production environments.

## Pre-Deployment Checklist

- [ ] All code committed to main branch
- [ ] README updated with current version
- [ ] Security review completed
- [ ] Performance testing passed
- [ ] All links verified
- [ ] API endpoints configured
- [ ] HTTPS certificates ready
- [ ] Database connections tested
- [ ] Backup strategy in place

## Deployment Methods

### Method 1: Docker Compose (Recommended)

Simplest method for single-server deployments.

**Requirements**:
- Docker 20.10+
- Docker Compose 2.0+

**Steps**:

```bash
# 1. Clone or pull latest code
git clone https://github.com/phaneendra-mareedu/nach-mon.git
cd nach-mon

# 2. Build image
docker build -t nach-mon:latest .

# 3. Run container
docker run -d \
  --name nach-dashboard \
  -p 80:80 \
  -p 443:443 \
  --restart always \
  nach-mon:latest

# 4. Verify
docker ps
curl http://localhost
```

**With HTTPS** (Recommended for Production):

```bash
# 1. Place SSL cert in /etc/nginx/certs/
# 2. Mount and configure in docker-compose.yml

docker-compose up -d
```

### Method 2: Docker Swarm (Multi-Server)

For scaling across multiple servers.

```bash
# 1. Initialize swarm
docker swarm init

# 2. Create stack from compose file
docker stack deploy -c docker-compose.yml nach

# 3. Monitor services
docker service ls
docker service logs nach_hello-app
```

### Method 3: Kubernetes (Enterprise)

For Kubernetes clusters.

```yaml
# deploy.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nach-dashboard
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nach-dashboard
  template:
    metadata:
      labels:
        app: nach-dashboard
    spec:
      containers:
      - name: nach-dashboard
        image: nach-mon:latest
        ports:
        - containerPort: 80
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: nach-dashboard-service
spec:
  selector:
    app: nach-dashboard
  type: LoadBalancer
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
```

```bash
# Deploy
kubectl apply -f deploy.yaml

# Monitor
kubectl get pods
kubectl get services
```

### Method 4: AWS ECS (Container Service)

```bash
# 1. Push to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin [AWS_ACCOUNT].dkr.ecr.us-east-1.amazonaws.com

docker tag nach-mon:latest [AWS_ACCOUNT].dkr.ecr.us-east-1.amazonaws.com/nach-nach-mon:latest

docker push [AWS_ACCOUNT].dkr.ecr.us-east-1.amazonaws.com/nach-mon:latest

# 2. Create ECS task definition
# 3. Create ECS service with ALB
# 4. Configure auto-scaling
```

## Environment Configuration

### Environment Variables

```bash
# .env file (not in git)
NODE_ENV=production
LOG_LEVEL=info
API_ENDPOINT=https://api.bank.example.com
REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://user:pass@localhost/nach
```

### Configuration Files

#### nginx.conf (in container)
```nginx
server {
    listen 80;
    server_name _;
    
    # Redirect to HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name nach.example.com;
    
    ssl_certificate /etc/nginx/certs/cert.pem;
    ssl_certificate_key /etc/nginx/certs/key.pem;
    
    root /usr/share/nginx/html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache busting
    location ~* \.(?:css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
}
```

## HTTPS Configuration

### Using Let's Encrypt with Certbot

```bash
# Install certbot
apt-get update && apt-get install -y certbot python3-certbot-nginx

# Generate certificate
certbot certonly --standalone -d nach.example.com

# Auto-renewal
systemctl enable certbot.timer
systemctl start certbot.timer
```

### Manual Certificate

1. Obtain SSL certificate from your provider
2. Place files in `/etc/nginx/certs/`
3. Update Dockerfile to copy certificates
4. Configure nginx to use HTTPS

## Performance Optimization

### Content Delivery Network (CDN)

```bash
# Using CloudFlare (recommended)
1. Add domain to CloudFlare
2. Update nameservers
3. Enable caching rules
4. Set security level to "High"
```

### Caching Strategy

```nginx
# Cache static assets 1 year
location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location ~* \.html$ {
    expires -1;
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

### Database Optimization

```sql
-- Create indexes for common queries
CREATE INDEX idx_transactions_bank ON transactions(bank_id);
CREATE INDEX idx_transactions_date ON transactions(created_at);
CREATE INDEX idx_alerts_status ON alerts(status);

-- Regular maintenance
VACUUM ANALYZE;
```

## Monitoring & Logging

### Health Checks

```bash
# Simple health endpoint
curl https://nach.example.com/

# Monitor with Prometheus
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v /etc/prometheus:/etc/prometheus \
  prom/prometheus
```

### Log Aggregation (ELK Stack)

```docker
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node
    ports:
      - "9200:9200"
      
  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - "5000:5000"
      
  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch
```

## Backup & Disaster Recovery

### Daily Backups

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backups/nach"
DATE=$(date +%Y-%m-%d)

# Backup database
pg_dump postgresql://user:pass@localhost/nach > \
  $BACKUP_DIR/nach-db-$DATE.sql.gz

# Backup application files
tar -czf $BACKUP_DIR/nach-app-$DATE.tar.gz /path/to/nach-mon

# Upload to S3
aws s3 cp $BACKUP_DIR/ s3://backups.example.com/nach/$DATE/
```

### Disaster Recovery

```bash
# 1. Restore from backup
pg_restore -d nach backup-$DATE.sql.gz

# 2. Rollback container
docker pull nach-mon:previous-tag
docker stop nach-dashboard
docker rm nach-dashboard
docker run -d --name nach-dashboard nach-mon:previous-tag

# 3. Verify services
curl https://nach.example.com/
```

## Security Hardening

### SSL/TLS Configuration

```nginx
# Modern configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers HIGH:!aNULL:!MD5;
ssl_prefer_server_ciphers on;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
```

### CSP Headers

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'";
```

### Rate Limiting

```nginx
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=100r/m;

location / {
    limit_req zone=general burst=20;
}

location /api/ {
    limit_req zone=api burst=10;
}
```

## Post-Deployment Verification

```bash
# 1. Check service status
docker ps
docker service ls

# 2. Test endpoints
curl -I https://nach.example.com
curl https://nach.example.com/dashboard.html

# 3. Run security checks
nmap -p 80,443 nach.example.com
ssl-test.ssllabs.com/analyze?d=nach.example.com

# 4. Load testing
ab -n 1000 -c 10 https://nach.example.com/

# 5. Monitor logs
docker logs -f nach-dashboard
```

## Rollback Procedure

```bash
# 1. Identify previous working version
docker images | grep nach-mon

# 2. Stop current
docker stop nach-dashboard

# 3. Run previous version
docker run -d \
  --name nach-dashboard \
  -p 80:80 \
  -p 443:443 \
  nach-mon:v6.4

# 4. Verify
curl https://nach.example.com/

# 5. Investigate failure
docker logs nach-dashboard-old
```

## Maintenance Windows

### Planned Maintenance

```bash
# 1. Schedule notification (24h before)
# 2. Drain connections gracefully
nginx -s reload

# 3. Perform upgrade
docker-compose down
docker-compose pull
docker-compose up -d

# 4. Run tests
npm run test:e2e

# 5. Clear cache if needed
redis-cli FLUSHALL

# 6. Announce completion
```

## Support & Escalation

**On-Call Runbook**:

| Issue | Action |
|-------|--------|
| Service down | Check Docker status, restart if needed |
| High latency | Check DB queries, clear cache |
| SSL certificate error | Verify expiration, renew if needed |
| Out of disk space | Archive old logs, add storage |
| Memory leak | Restart service, profile application |

**Contacts**:
- DevOps Lead: [email]
- DBA: [email]
- Security: [email]
- Vendor Support: [email]

---

**Last Updated**: May 2026  
**Status**: Production Ready  
**Version**: 6.5
