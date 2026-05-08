# Installation & Setup Guide

## Prerequisites

- Docker & Docker Compose
- Git
- Modern web browser

## Local Development Setup

### 1. Clone the Repository
```bash
git clone https://github.com/phaneendra-mareedu/nach-mon.git
cd nach-mon
```

### 2. Build and Start with Docker Compose
```bash
docker-compose up --build
```

The dashboard will be available at `http://localhost`

### 3. Development Without Docker
If you prefer local development without Docker:

```bash
# No build required - just serve the HTML files
# You can use any simple HTTP server
python3 -m http.server 8000
# or
npx http-server
```

Then visit `http://localhost:8000`

## File Structure Overview

```
nach-mon/
├── HTML Pages (Landing & Dashboard)
│   ├── index.html           # Welcome/Home page
│   ├── dashboard.html       # Real-time monitoring
│   ├── alerts.html         # Incident management
│   ├── analytics.html      # Reports & analytics
│   ├── banks.html          # Bank management
│   └── settings.html       # User settings
│
├── Styling & Scripting
│   ├── styles.css          # Design system stylesheet
│   └── scripts.js          # Shared JavaScript utilities
│
├── Docker Configuration
│   ├── Dockerfile          # Container definition
│   ├── docker-compose.yml  # Orchestration config
│   └── .dockerignore       # Build exclusions
│
├── CI/CD
│   └── .github/workflows/deploy.yml  # Automated builds
│
└── Documentation
    ├── README.md           # Main documentation
    ├── SETUP.md           # This file
    └── assets/            # Images, icons, docs
```

## Key Navigation

Once deployed, you can navigate:

- **Home** (`/index.html`) - Feature overview
- **Dashboard** (`/dashboard.html`) - Real-time metrics
- **Alerts** (`/alerts.html`) - Incident tracking
- **Analytics** (`/analytics.html`) - Reports & trends
- **Banks** (`/banks.html`) - Bank monitoring
- **Settings** (`/settings.html`) - Preferences

## Design System CSS Classes

The dashboard uses a component-based CSS system:

### Layouts
```html
<div class="grid">                <!-- Responsive grid -->
<div class="grid-2 grid-3 grid-4"> <!-- 2, 3, or 4 columns -->
<div class="container">             <!-- Max-width container -->
```

### Cards
```html
<div class="card">
  <div class="card-head">          <!-- Header with icon -->
    <div class="card-icon">📊</div>
    <div class="card-title">Title</div>
  </div>
  <div class="card-body">          <!-- Main content -->
    Content here
  </div>
</div>
```

### Buttons
```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-xs">Extra Small</button>
```

### Badges & Status
```html
<span class="badge">INFO</span>
<span class="badge ok">✓ Success</span>
<span class="badge warn">⚠ Warning</span>
<span class="badge crit">✕ Critical</span>
<div class="sev ok/warn/crit"></div> <!-- Severity dot -->
```

### Forms
```html
<div class="form-group">
  <label>Field Label</label>
  <input type="text" />
  <select></select>
  <textarea></textarea>
</div>
```

### Utility Classes
```html
<div class="flex items-center justify-between gap-2">
  <p class="text-muted">Muted text</p>
  <p class="text-error">Error text</p>
</div>

<div class="mt-3 mb-3">           <!-- Margin utilities -->
<div class="text-center">         <!-- Text alignment -->
```

## JavaScript Utilities

### Notifications
```javascript
Notification.show('Success message', 'success');  // or 'error', 'warning', 'info'
```

### Number Animation
```javascript
animateNumber(element, targetValue, duration);
// Animates element's number value smoothly
```

### Table Filtering
```javascript
filterTable('tableId', 'search term');
// Filters table rows based on search term
```

### Copy to Clipboard
```javascript
copyToClipboard(text, button);
// Copies text and shows "✓ Copied" feedback
```

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
  --v6-accent: #2558e8;      /* Primary blue */
  --v6-ok: #0a7d3e;          /* Success green */
  --v6-warn: #c67211;        /* Warning amber */
  --v6-crit: #b0232e;        /* Error red */
}
```

### Fonts
Update font families:
```css
--v6-font-display: 'Georgia', serif;
--v6-font-body: 'Inter', sans-serif;
--v6-font-mono: 'JetBrains Mono', monospace;
```

## Troubleshooting

### Container won't start
```bash
docker-compose down
docker-compose up --build
```

### Port 80 already in use
```bash
docker-compose down
# Or change port in docker-compose.yml:
# ports:
#   - "8080:80"
```

### CSS/JS not loading
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify files are copied to container (check Dockerfile)

## Performance Tips

1. **Use table data-search attribute** for automatic filtering
2. **Add data-live attribute** to elements for real-time updates
3. **Use grid classes** for responsive layouts
4. **Leverage CSS variables** for consistent theming

## Next Steps

1. Connect to real API endpoints
2. Implement authentication
3. Add WebSocket for live updates
4. Integrate with bank systems
5. Deploy to production infrastructure

## Support

For help or issues:
- Check existing documentation in `/assets/docs/`
- Review the dashboard wireframe (NACH_Dashboard_v6.5_2.html)
- Contact the NACH operations team

---

**Last Updated**: May 2026  
**Version**: 6.5
