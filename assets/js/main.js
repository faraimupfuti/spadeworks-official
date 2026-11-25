/**
 * Spadeworks Automation - Core Interactive Application Logic
 * Brand: Spadeworks (Matte Charcoal, Coral Red, Cream & White)
 * "Faster. Cheaper. Sharper. Yours."
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSandboxSimulator();
  initFaqAccordion();
  initDemoModal();
  initAnimatedCounters();
  initLiveTicker();
});

// Toast notification helper
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  const icon = type === 'success' 
    ? `<svg class="w-5 h-5 text-[#E22D39]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`
    : `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Sticky header blur effect on scroll
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('bg-[#0e1117]/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-xl');
    } else {
      navbar.classList.remove('bg-[#0e1117]/90', 'backdrop-blur-md', 'border-b', 'border-slate-800', 'shadow-xl');
    }
  });
}

// Mobile navigation menu
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    const isHidden = menu.classList.contains('hidden');
    if (isHidden) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

// Interactive Live Sandbox Simulator
function initSandboxSimulator() {
  const simNavBtns = document.querySelectorAll('[data-sim-target]');
  const simViews = document.querySelectorAll('[data-sim-view]');

  simNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-sim-target');

      simNavBtns.forEach(b => {
        b.classList.remove('bg-[#E22D39]/20', 'text-[#FF4D5A]', 'border-[#E22D39]/50');
        b.classList.add('text-slate-400', 'border-slate-800');
      });
      btn.classList.add('bg-[#E22D39]/20', 'text-[#FF4D5A]', 'border-[#E22D39]/50');
      btn.classList.remove('text-slate-400', 'border-slate-800');

      simViews.forEach(view => {
        if (view.getAttribute('data-sim-view') === target) {
          view.classList.remove('hidden');
        } else {
          view.classList.add('hidden');
        }
      });
    });
  });

  // Action: "Run Auto-Reconcile" Simulator button
  const runReconcileBtn = document.getElementById('btn-run-sim-reconcile');
  const matchRateBadge = document.getElementById('sim-match-rate');
  const simStatusLog = document.getElementById('sim-status-log');
  const simTableRows = document.querySelectorAll('.sim-tx-row');

  if (runReconcileBtn) {
    runReconcileBtn.addEventListener('click', () => {
      runReconcileBtn.disabled = true;
      runReconcileBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Bot is checking every bank number...
      `;

      if (simStatusLog) {
        simStatusLog.textContent = 'Reading bank lines... Comparing against bills & receipts... Zero typing needed.';
      }

      setTimeout(() => {
        simTableRows.forEach((row, idx) => {
          setTimeout(() => {
            const badge = row.querySelector('.tx-status-badge');
            if (badge) {
              badge.className = 'tx-status-badge inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#E22D39]/20 text-[#FF6B76] border border-[#E22D39]/40';
              badge.textContent = 'Matched & Checked ✓';
            }
            row.classList.add('bg-[#E22D39]/5');
          }, idx * 150);
        });

        setTimeout(() => {
          if (matchRateBadge) {
            matchRateBadge.textContent = '100% Matched';
            matchRateBadge.classList.remove('text-amber-400');
            matchRateBadge.classList.add('text-[#FF6B76]');
          }
          if (simStatusLog) {
            simStatusLog.textContent = 'Done! All 1,420 lines checked in 0.8 seconds. Zero human typing.';
          }
          runReconcileBtn.disabled = false;
          runReconcileBtn.innerHTML = `
            <svg class="w-4 h-4 mr-1.5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
            All Done! Run Again
          `;
          showToast('The bot matched every single bank line in 0.8 seconds! No mistakes.');
        }, 800);
      }, 1000);
    });
  }

  // Interactive Close Checklist & Progress Bar
  const checklistItems = document.querySelectorAll('.close-chk-item');
  const closeProgressBar = document.getElementById('close-progress-bar');
  const closeProgressText = document.getElementById('close-progress-text');
  const closeDaysEstimated = document.getElementById('close-days-estimated');

  function updateCloseProgress() {
    if (!checklistItems.length) return;
    const total = checklistItems.length;
    let checkedCount = 0;

    checklistItems.forEach(item => {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (checkbox && checkbox.checked) {
        checkedCount++;
        item.classList.add('opacity-75');
      } else {
        item.classList.remove('opacity-75');
      }
    });

    const percent = Math.round((checkedCount / total) * 100);
    if (closeProgressBar) closeProgressBar.style.width = percent + '%';
    if (closeProgressText) closeProgressText.textContent = percent + '% Done';

    if (closeDaysEstimated) {
      if (percent === 100) {
        closeDaysEstimated.textContent = 'All books locked! Your team gets to go home early today! 🎉';
        closeDaysEstimated.classList.add('text-[#FF6B76]');
      } else {
        const hoursLeft = Math.round((1 - checkedCount / total) * 10);
        closeDaysEstimated.textContent = `Just ${hoursLeft} minutes left before books are sealed`;
        closeDaysEstimated.classList.remove('text-[#FF6B76]');
      }
    }
  }

  checklistItems.forEach(item => {
    const checkbox = item.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        updateCloseProgress();
        showToast(`Task "${item.getAttribute('data-task-name') || 'Task'}" completed by bot!`);
      });
    }
  });

  // Action: Fraud / Anomaly Resolve Simulation
  const resolveAnomalyBtns = document.querySelectorAll('.btn-resolve-anomaly');
  resolveAnomalyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.anomaly-card');
      if (card) {
        card.style.opacity = '0.5';
        btn.textContent = 'Stopped & Saved!';
        btn.disabled = true;
        btn.classList.add('bg-slate-800', 'text-slate-400', 'border-slate-700');
        showToast('Double payment stopped! You just saved money.');
      }
    });
  });
}

// FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });

        if (isOpen) {
          item.classList.remove('open');
        } else {
          item.classList.add('open');
        }
      });
    }
  });
}

// Modal handling
function initDemoModal() {
  const openButtons = document.querySelectorAll('[data-open-demo-modal]');
  const modal = document.getElementById('demo-modal');
  const closeBtn = document.getElementById('demo-modal-close');
  const form = document.getElementById('demo-booking-form');
  const formStep1 = document.getElementById('modal-step-1');
  const formStep2 = document.getElementById('modal-step-2');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5 text-white inline-block mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        Booking Your Review...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        if (formStep1 && formStep2) {
          formStep1.classList.add('hidden');
          formStep2.classList.remove('hidden');
        }
        showToast('Review booked! Farai will reach out to schedule your free workflow review.');
      }, 1200);
    });
  }

  const resetBtn = document.getElementById('modal-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (formStep1 && formStep2 && form) {
        form.reset();
        formStep2.classList.add('hidden');
        formStep1.classList.remove('hidden');
      }
      closeModal();
    });
  }
}

// Animated statistical counters
function initAnimatedCounters() {
  const counterElements = document.querySelectorAll('[data-counter-target]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target'));
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = target * easedProgress;

          el.textContent = prefix + (decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal).toLocaleString()) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = prefix + (decimals > 0 ? target.toFixed(decimals) : target.toLocaleString()) + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

// Live Financial Event Ticker
function initLiveTicker() {
  const tickerEl = document.getElementById('live-feed-ticker');
  if (!tickerEl) return;

  const events = [
    { text: "Bot matched 1,420 bank lines with receipts in 2.1 seconds", time: "just now" },
    { text: "Bot caught a duplicate $14,000 bill before it was paid", time: "22s ago" },
    { text: "Month-end close completed in 24 hours instead of 14 days", time: "45s ago" },
    { text: "Bot sent 80 overdue invoice reminders with zero human effort", time: "1m ago" },
    { text: "ZIMRA tax & VAT figures gathered and ready for review", time: "2m ago" }
  ];

  let currentIdx = 0;

  setInterval(() => {
    currentIdx = (currentIdx + 1) % events.length;
    tickerEl.style.opacity = '0';
    setTimeout(() => {
      tickerEl.innerHTML = `
        <span class="inline-block w-2 h-2 rounded-full bg-[#E22D39] mr-2 animate-ping"></span>
        <span class="text-slate-300">${events[currentIdx].text}</span>
        <span class="text-xs text-slate-500 ml-2">(${events[currentIdx].time})</span>
      `;
      tickerEl.style.opacity = '1';
    }, 250);
  }, 4500);
}
