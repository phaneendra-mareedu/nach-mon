// ══════════════════════════════════════════════════════════════════════════════
// NACH Dashboard v6.5 — Shared JavaScript
// Real-time monitoring, animations, and interactive components
// ══════════════════════════════════════════════════════════════════════════════

// ─── Navigation Active State ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Set active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});

// ─── Modal Management ──────────────────────────────────────────────────────────
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Close modal when clicking overlay
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// ─── Tooltip Management ───────────────────────────────────────────────────────
function showTooltip(element, text) {
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
  tooltip.style.top = (rect.top - tooltip.offsetHeight - 8) + 'px';
  tooltip.style.opacity = '1';

  setTimeout(() => {
    tooltip.style.opacity = '0';
    setTimeout(() => tooltip.remove(), 200);
  }, 2000);
}

// ─── Real-time Number Animation ───────────────────────────────────────────────
function animateNumber(element, targetValue, duration = 1000) {
  const startValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
  const prefix = element.textContent.match(/^[^\d]*/)[0];
  const suffix = element.textContent.match(/[^\d]*$/)[0];
  
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
    
    element.textContent = prefix + currentValue.toLocaleString('en-IN') + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

// ─── Status Indicator Animation ───────────────────────────────────────────────
function createStatusIndicator(status) {
  const indicator = document.createElement('div');
  indicator.className = 'sev ' + status;
  
  if (status === 'crit') {
    const pulse = document.createElement('div');
    pulse.style.cssText = `
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      background: #b0232e;
      opacity: 0.3;
      animation: pulse 2s infinite;
    `;
    indicator.appendChild(pulse);
  }
  
  return indicator;
}

// ─── Data Table Filtering ───────────────────────────────────────────────────────
function filterTable(tableId, searchTerm) {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const rows = table.querySelectorAll('tbody tr');
  const lowerSearch = searchTerm.toLowerCase();
  
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(lowerSearch) ? '' : 'none';
  });
}

// ─── Copy to Clipboard ────────────────────────────────────────────────────────
function copyToClipboard(text, button) {
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = '✓ Copied';
    setTimeout(() => {
      button.textContent = originalText;
    }, 2000);
  });
}

// ─── Notification System ─────────────────────────────────────────────────────
class Notification {
  static show(message, type = 'info', duration = 3000) {
    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.textContent = message;
    notif.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      font-weight: 500;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    
    const colors = {
      'success': { bg: '#eef7f0', color: '#0a7d3e' },
      'error': { bg: '#fcedef', color: '#b0232e' },
      'warning': { bg: '#fdf6ea', color: '#c67211' },
      'info': { bg: '#eef2ff', color: '#2558e8' }
    };
    
    const color = colors[type] || colors['info'];
    notif.style.backgroundColor = color.bg;
    notif.style.color = color.color;
    notif.style.border = `1px solid ${color.color}`;
    
    document.body.appendChild(notif);
    
    setTimeout(() => {
      notif.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, duration);
  }
}

// ─── Keyboard Navigation ───────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  // Cmd/Ctrl + K for search
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('[data-search]');
    if (searchInput) searchInput.focus();
  }
  
  // Escape to close modals
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('[data-modal]');
    modals.forEach(m => m.style.display = 'none');
  }
});

// ─── Initialize Page ──────────────────────────────────────────────────────────
function initPage() {
  // Attach event listeners to dynamic elements
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
      showTooltip(this, this.dataset.tooltip);
    });
  });
  
  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', function() {
      copyToClipboard(this.dataset.copy, this);
    });
  });
  
  // Initialize search filters
  const searchInputs = document.querySelectorAll('[data-search]');
  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      filterTable(this.dataset.search, this.value);
    });
  });
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Notification, animateNumber, filterTable, copyToClipboard };
}
