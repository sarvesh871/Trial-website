/**
 * ScaleWise - Main Application Logic & Progress State Manager
 * Zero backend dependencies; uses browser localStorage for persistence.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'scalewise_progress_v1';
  const ACTIVITIES = [
    { id: 'activity-1', num: 1, title: 'Sustainability Audit of a Startup', url: 'activity-1.html' },
    { id: 'activity-2', num: 2, title: 'Scalable Business Model Redesign', url: 'activity-2.html' },
    { id: 'activity-3', num: 3, title: 'Supply Chain and Operations Scaling Plan', url: 'activity-3.html' },
    { id: 'activity-4', num: 4, title: 'Financial Projections for Scaling', url: 'activity-4.html' },
    { id: 'activity-5', num: 5, title: 'Risk Assessment and Mitigation Roadmap', url: 'activity-5.html' },
    { id: 'activity-6', num: 6, title: 'ESG Integration and Impact Measurement', url: 'activity-6.html' },
    { id: 'activity-7', num: 7, title: 'Team and Culture Scaling Exercise', url: 'activity-7.html' },
  ];

  // Storage Manager
  const ScaleWiseTracker = {
    getAllActivities() {
      return ACTIVITIES;
    },

    getProgress() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
          return JSON.parse(data);
        }
      } catch (e) {
        console.warn('localStorage read error:', e);
      }
      // Initial default state
      const initial = {};
      ACTIVITIES.forEach((act) => {
        initial[act.id] = { completed: false, completedAt: null };
      });
      return initial;
    },

    saveProgress(progress) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        window.dispatchEvent(new CustomEvent('scalewise:progress-changed', { detail: progress }));
      } catch (e) {
        console.warn('localStorage write error:', e);
      }
    },

    isCompleted(activityId) {
      const progress = this.getProgress();
      return progress[activityId] ? progress[activityId].completed : false;
    },

    setCompleted(activityId, status) {
      const progress = this.getProgress();
      if (!progress[activityId]) {
        progress[activityId] = { completed: false, completedAt: null };
      }
      progress[activityId].completed = Boolean(status);
      progress[activityId].completedAt = status ? new Date().toISOString() : null;
      this.saveProgress(progress);
      this.updateUI();
    },

    toggleCompleted(activityId) {
      const current = this.isCompleted(activityId);
      this.setCompleted(activityId, !current);
      return !current;
    },

    resetAll() {
      const initial = {};
      ACTIVITIES.forEach((act) => {
        initial[act.id] = { completed: false, completedAt: null };
      });
      this.saveProgress(initial);
      this.updateUI();
    },

    getStats() {
      const progress = this.getProgress();
      let completedCount = 0;
      ACTIVITIES.forEach((act) => {
        if (progress[act.id] && progress[act.id].completed) {
          completedCount++;
        }
      });
      const total = ACTIVITIES.length;
      const percentage = Math.round((completedCount / total) * 100);
      return {
        total,
        completed: completedCount,
        remaining: total - completedCount,
        percentage,
      };
    },

    updateUI() {
      const stats = this.getStats();

      // Update header pills
      document.querySelectorAll('.nav-progress-text').forEach((el) => {
        el.textContent = `${stats.completed}/${stats.total} Done`;
      });
      document.querySelectorAll('.nav-progress-percent').forEach((el) => {
        el.textContent = `${stats.percentage}%`;
      });

      // Update progress bars if present
      document.querySelectorAll('.js-progress-bar-fill').forEach((bar) => {
        bar.style.width = `${stats.percentage}%`;
      });
      document.querySelectorAll('.js-progress-percent-val').forEach((el) => {
        el.textContent = `${stats.percentage}%`;
      });
      document.querySelectorAll('.js-completed-count').forEach((el) => {
        el.textContent = stats.completed;
      });
      document.querySelectorAll('.js-remaining-count').forEach((el) => {
        el.textContent = stats.remaining;
      });

      // Update Activity Cards in Hub or Hub Grid
      ACTIVITIES.forEach((act) => {
        const isDone = this.isCompleted(act.id);
        const card = document.querySelector(`[data-activity-card="${act.id}"]`);
        if (card) {
          if (isDone) {
            card.classList.add('is-completed');
            const statusText = card.querySelector('.activity-status-text');
            if (statusText) statusText.textContent = 'Completed';
          } else {
            card.classList.remove('is-completed');
            const statusText = card.querySelector('.activity-status-text');
            if (statusText) statusText.textContent = 'Not Started';
          }
        }

        // Update single-activity action buttons on workspace pages (only .btn elements)
        document.querySelectorAll(`.btn[data-toggle-complete="${act.id}"]`).forEach((toggleBtn) => {
          if (isDone) {
            toggleBtn.classList.remove('btn-outline');
            toggleBtn.classList.add('btn-primary');
            toggleBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Activity Completed</span>
            `;
          } else {
            toggleBtn.classList.remove('btn-primary');
            toggleBtn.classList.add('btn-outline');
            toggleBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Mark as Completed</span>
            `;
          }
        });

        // Update checklist checkbox buttons on the Growth Dashboard
        document.querySelectorAll(`.checklist-checkbox-btn[data-toggle-complete="${act.id}"]`).forEach((checkboxBtn) => {
          if (isDone) {
            checkboxBtn.classList.add('checked');
            checkboxBtn.setAttribute('aria-checked', 'true');
            checkboxBtn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
          } else {
            checkboxBtn.classList.remove('checked');
            checkboxBtn.setAttribute('aria-checked', 'false');
            checkboxBtn.innerHTML = '';
          }
        });
      });
    },
  };

  // Toast Notification System
  function showToast(message, type = 'info') {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('visible');
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }

  // Header scroll detection
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Mobile navigation drawer toggle
  function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const drawer = document.querySelector('.mobile-nav');
    if (!btn || !drawer) return;

    btn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Activity Workspace completion toggle binding
  function initCompletionToggles() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-toggle-complete]');
      if (!btn) return;
      const activityId = btn.getAttribute('data-toggle-complete');
      const newState = ScaleWiseTracker.toggleCompleted(activityId);
      if (newState) {
        showToast('Activity marked as completed! Progress updated.', 'success');
      } else {
        showToast('Activity marked as incomplete.', 'info');
      }
    });
  }

  // Modal dialog handling
  function initModals() {
    document.addEventListener('click', (e) => {
      // Open modal trigger
      const openTrigger = e.target.closest('[data-open-modal]');
      if (openTrigger) {
        const modalId = openTrigger.getAttribute('data-open-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('open');
          const firstFocus = modal.querySelector('button, [href], input, select, textarea');
          if (firstFocus) firstFocus.focus();
        }
      }

      // Close modal trigger
      const closeTrigger = e.target.closest('[data-close-modal]');
      if (closeTrigger) {
        const modal = closeTrigger.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      }

      // Click outside dialog to close
      if (e.target.classList.contains('modal-backdrop')) {
        e.target.classList.remove('open');
      }
    });

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach((m) => m.classList.remove('open'));
      }
    });
  }

  // Reset progress confirmation dialog
  function initResetHandlers() {
    document.addEventListener('click', (e) => {
      const confirmResetBtn = e.target.closest('#confirm-reset-btn');
      if (confirmResetBtn) {
        ScaleWiseTracker.resetAll();
        const modal = document.getElementById('reset-confirm-modal');
        if (modal) modal.classList.remove('open');
        showToast('Simulation progress has been reset to 0%.', 'info');
      }
    });
  }

  // Expose to window
  window.ScaleWiseTracker = ScaleWiseTracker;
  window.ScaleWise = {
    showToast,
  };

  // Run on DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initCompletionToggles();
    initModals();
    initResetHandlers();
    ScaleWiseTracker.updateUI();
  });
})();
