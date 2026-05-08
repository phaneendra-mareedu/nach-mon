# NACH Dashboard v6.5

National Automated Clearing House (NACH) — Centralized Monitoring Platform for NPCI Member Banks

## 📋 Project Overview

The NACH Dashboard is a professional enterprise monitoring solution for managing NACH (National Automated Clearing House) transactions across all NPCI member banks. Built with a modern design system, it provides real-time monitoring, AI-powered insights, and comprehensive analytics.

## 🚀 Features

- **Real-time Monitoring**: Live transaction feeds and performance metrics
- **AI Intelligence**: Predictive anomaly detection and root cause analysis
- **Bank Integration**: Seamless integration with all NPCI member banks
- **Analytics & Reporting**: Comprehensive transaction analysis with custom reports
- **Security & Compliance**: Enterprise-grade security with role-based access
- **Communication Hub**: Institutional communication centre for bank correspondence

## 📁 File Structure

```
nach-mon/
├── index.html              # Home page
├── dashboard.html          # Real-time monitoring dashboard
├── alerts.html            # Alert management & incidents
├── analytics.html         # Analytics & reporting
├── banks.html            # Bank management
├── settings.html         # User settings & configuration
├── styles.css            # Shared design system stylesheet
├── scripts.js            # Shared JavaScript functionality
├── Dockerfile            # Docker containerization
├── docker-compose.yml    # Docker Compose configuration
├── .dockerignore         # Docker ignore patterns
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions CI/CD pipeline
└── README.md            # This file
```

## 🎨 Design System

The dashboard implements **v6.0 Institutional Design System** featuring:

- **Color Palette**: Professional NPCI blue accent (#2558e8) with semantic colors
  - Success: #0a7d3e (Green)
  - Warning: #c67211 (Amber)
  - Critical: #b0232e (Red)
  - Information: #2558e8 (Blue)

- **Typography**:
  - Display: Georgia / EB Garamond (serif)
  - Body: Inter / Inter Tight (sans-serif)
  - Data: JetBrains Mono (monospace)

- **Components**:
  - Cards with accent borders and hover states
  - Custom buttons (Primary, Secondary, Ghost, Small)
  - Severity indicators with animations
  - Data tables with search and filtering
  - Forms with validation states
  - Badges and status indicators

## 📚 Pages

### Home (`index.html`)
Welcome page with feature overview and call-to-action buttons.

### Dashboard (`dashboard.html`)
Real-time monitoring with:
- Key performance metrics (Transactions, Success Rate, Response Time)
- 24-hour transaction volume chart
- Bank-wise success rate distribution
- Recent transaction table with search

### Alerts (`alerts.html`)
Incident management featuring:
- Alert summary (Critical, Warning, AI Insights)
- Active alerts table with severity indicators
- Root cause analysis with AI-powered recommendations

### Analytics (`analytics.html`)
Comprehensive reporting suite:
- Report generation with multiple formats (PDF, CSV, Excel)
- Daily transaction trends
- Success rate distribution
- Saved reports library

### Banks (`banks.html`)
Bank integration management:
- Bank connectivity status
- Performance metrics by bank
- Uptime and latency monitoring
- Connection health indicators

### Settings (`settings.html`)
User configuration and preferences:
- Profile management
- Notification preferences
- Alert thresholds
- API key management
- Security settings (2FA, password, session timeout)

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Server**: Nginx (Alpine Linux)
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions

## 📦 Docker Setup

### Build and Run with Docker Compose

```bash
docker-compose up --build
```

The application will be available at `http://localhost`

### Build Docker Image Manually

```bash
docker build -t nach-mon .
docker run -p 80:80 nach-mon
```

## 📝 Styling

All styles are defined in `styles.css` using CSS variables for consistency. Key variable groups:

```css
--v6-ink*         /* Text colors */
--v6-rule*        /* Border colors */
--v6-paper*       /* Background colors */
--v6-card         /* Card backgrounds */
--v6-accent*      /* Primary brand color */
--v6-ok*          /* Success states */
--v6-warn*        /* Warning states */
--v6-crit*        /* Critical states */
--v6-fs-*         /* Font sizes */
--v6-font-*       /* Font families */
```

## 🎯 JavaScript Utilities (`scripts.js`)

- `Notification.show()` - Toast notifications
- `animateNumber()` - Animate number transitions
- `filterTable()` - Table search and filtering
- `copyToClipboard()` - Copy functionality
- `openModal() / closeModal()` - Modal management

## 🔒 Security

- Role-based access control (RBAC)
- Audit logging on all operations
- API key management with regeneration
- Two-factor authentication support
- Session timeout configuration
- Compliance-ready design

## 📊 Features Highlights

### Real-time Data
- Live transaction feeds updating every 6 seconds
- Real-time performance metrics
- Instant alert notifications

### AI-Powered Insights
- Anomaly detection with confidence scores
- Predictive failure analysis
- Root cause correlation
- Recommended actions

### Compliance
- NPCI-compliant communication templates
- Audit trails for all actions
- Escalation protocol management
- Bank-to-bank communication logs

## 🔄 CI/CD Pipeline

GitHub Actions workflow automatically:
1. Builds Docker image on push to main
2. Validates Nginx configuration
3. Tests container startup

## 📱 Responsive Design

The dashboard is fully responsive with breakpoints for:
- Desktop (1400px max-width)
- Tablet (1200px and below)
- Mobile (768px and below)

## 🚦 Status Indicators

- **Green (#0a7d3e)**: Healthy, Operational, Success
- **Amber (#c67211)**: Warning, Degraded, Monitoring
- **Red (#b0232e)**: Critical, Failed, Requires Action
- **Blue (#2558e8)**: Information, Processing, AI Insight

## 📞 Support

For issues, questions, or contributions, please contact the NACH operations team or create an issue in the repository.

## 📄 License

© 2026 NPCI. All rights reserved.

## 🎓 Version

NACH Dashboard v6.5 — May 2026
