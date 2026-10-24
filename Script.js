/**
 * ==============================================================================
 * SHAIK MAHAMMAD SHAHID — DEVELOPER PORTFOLIO SCRIPT
 * ==============================================================================
 * Central configuration and interactive logic in a single file.
 * 
 * TO UPDATE YOUR LINKS & DETAILS:
 * Simply edit the `PORTFOLIO_CONFIG` object below!
 * ==============================================================================
 */

const PORTFOLIO_CONFIG = {
  personal: {
    fullName: "Shaik Mahammad Shahid",
    preferredName: "Shahid",
    tagline: "Aspiring Software Developer | BCA 2nd Year Student",
    roles: [
      "Aspiring Software Developer",
      "Full-Stack Web Enthusiast",
      "AI-Assisted Builder",
      "Problem Solver",
      "Technology Explorer"
    ],
    institution: "St. Joseph's Degree College (SJDC)",
    location: "Kurnool, Andhra Pradesh, India",
    phone: "+91 95533 08917",
    currentStatus: "BCA 2nd Year Student",
    availability: "Open to Internships & Junior Roles"
  },

  // Edit your social URLs here:
  social: {
    github: {
      url: "https://github.com/shahiddevop", // Replace with your actual GitHub profile
      isPlaceholder: false
    },
    linkedin: {
      url: "https://linkedin.com/in/shaik-mahammad-shahid", // Replace with your actual LinkedIn profile
      isPlaceholder: true
    },
    email: {
      address: "shaiksh37@gmail.com", // Replace with your actual email address
      isPlaceholder: false
    },
    phone: {
      number: "+91 95533 08917",
      telUrl: "tel:+919553308917",
      isPlaceholder: false
    }
  },

  // Edit project URLs here:
  projects: {
    adt: {
      title: "ADT — Academic Departmental Track",
      githubUrl: "https://github.com/shahiddevop/Department-Track.git",
      isPlaceholder: false
    },
    apexFinance: {
      title: "ApexFinance",
      githubUrl: "https://github.com/shahiddevop/Apex-finance.git",
      isPlaceholder: false
    },
    amazonClone: {
      title: "Amazon Clone",
      githubUrl: "https://github.com/shahiddevop/amazon_clone.git",
      isPlaceholder: false
    }
  },

  // Optional: Contact form backend (Web3Forms or Formspree). Leave empty to use mailto fallback
  contact: {
    endpoint: "", // e.g. "https://api.web3forms.com/submit"
    accessKey: "" // e.g. "YOUR_WEB3FORMS_ACCESS_KEY"
  }
};

/* ==============================================================================
   INTERACTIVE LOGIC & CONTROLLERS
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavigation();
  initSkillsFilter();
  initProjectsFilter();
  initContactForm();
  initModals();
  initFooterYear();
});

/**
 * Theme Manager: Dark / Light Mode with localStorage & System Preference
 */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('shahid_portfolio_theme');
  const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;

  const currentTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');
  applyTheme(currentTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('shahid_portfolio_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (toggleBtn) {
    toggleBtn.setAttribute('title', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    toggleBtn.innerHTML = theme === 'dark'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/**
 * Typewriter Effect for Hero Roles
 */
function initTypewriter() {
  const el = document.getElementById('role-typewriter');
  if (!el) return;

  const roles = PORTFOLIO_CONFIG.personal.roles;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIdx];
    if (!isDeleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, isDeleting ? 45 : 110);
  }

  type();
}

/**
 * Navigation, Scroll-Spy, and Mobile Drawer
 */
function initNavigation() {
  const header = document.querySelector('.navbar-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDropdown = document.getElementById('mobile-dropdown');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll detection & header shadow
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll spy
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { passive: true });

  // Mobile menu open / close
  function closeMobile() {
    if (mobileDropdown) mobileDropdown.classList.remove('open');
    if (mobileToggle) {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggle && mobileDropdown) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDropdown.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobile();
      }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobile();
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobile();
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Back to top button
  const backToTop = document.getElementById('back-to-top-btn');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Auto-close mobile drawer on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
      closeMobile();
    }
  }, { passive: true });
}

/**
 * Skills Filtering by Category
 */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.getAttribute('data-category');
      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-category') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Projects Filtering
 */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.projects-filter-bar .filter-btn');
  const cards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-approach') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Modals: Resume & Config Notice
 */
function initModals() {
  const resumeModal = document.getElementById('resumeModal');
  const configModal = document.getElementById('configNoticeModal');

  // Open Resume
  const openResumeBtns = document.querySelectorAll('.open-resume-trigger');
  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) resumeModal.classList.add('open');
    });
  });

  // Close Modals
  document.querySelectorAll('.modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      if (resumeModal) resumeModal.classList.remove('open');
      if (configModal) configModal.classList.remove('open');
    });
  });

  // Close on backdrop click
  [resumeModal, configModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
        }
      });
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (resumeModal) resumeModal.classList.remove('open');
      if (configModal) configModal.classList.remove('open');
    }
  });

  // Print Resume
  const printBtn = document.getElementById('print-resume-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Handle Placeholder Link clicks
  document.querySelectorAll('[data-config-target]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('data-config-target');
      let configItem = null;

      if (target === 'github') configItem = PORTFOLIO_CONFIG.social.github;
      else if (target === 'linkedin') configItem = PORTFOLIO_CONFIG.social.linkedin;
      else if (target === 'adt') configItem = PORTFOLIO_CONFIG.projects.adt;
      else if (target === 'apex') configItem = PORTFOLIO_CONFIG.projects.apexFinance;
      else if (target === 'amazon') configItem = PORTFOLIO_CONFIG.projects.amazonClone;

      if (configItem && configItem.isPlaceholder) {
        e.preventDefault();
        showConfigNotice(
          `Configure Link for ${configItem.title || target.toUpperCase()}`,
          `This button currently uses a placeholder URL. You can customize your exact link in 'Script.js' inside the 'PORTFOLIO_CONFIG' object!`,
          configItem.url || configItem.githubUrl
        );
      }
    });
  });
}

function showConfigNotice(title, message, url) {
  const modal = document.getElementById('configNoticeModal');
  const titleEl = document.getElementById('config-notice-title');
  const msgEl = document.getElementById('config-notice-msg');
  const visitBtn = document.getElementById('config-visit-anyway-btn');

  if (titleEl) titleEl.textContent = title;
  if (msgEl) msgEl.textContent = message;

  if (visitBtn) {
    if (url) {
      visitBtn.style.display = 'inline-flex';
      visitBtn.href = url;
    } else {
      visitBtn.style.display = 'none';
    }
  }

  if (modal) modal.classList.add('open');
}

/**
 * Contact Form Controller
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const banner = document.getElementById('contact-status-banner');
  const copyBtn = document.getElementById('copy-msg-btn');
  const mailtoBtn = document.getElementById('launch-mailto-btn');

  let cooldown = 0;

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (cooldown > 0) return;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    // Validation
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setErr(id, err) {
      const el = document.getElementById(id);
      if (el) el.textContent = err || '';
      if (err) valid = false;
    }

    setErr('err-name', name.length < 2 ? 'Please enter a valid name (min 2 chars).' : '');
    setErr('err-email', !emailRegex.test(email) ? 'Please enter a valid email address.' : '');
    setErr('err-subject', subject.length < 3 ? 'Subject must be at least 3 chars.' : '');
    setErr('err-message', message.length < 10 ? 'Message must be at least 10 chars.' : '');

    if (!valid) return;

    // Check if external endpoint is set
    const { endpoint, accessKey } = PORTFOLIO_CONFIG.contact;
    if (endpoint && endpoint.trim().length > 0) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const payload = accessKey ? { name, email, subject, message, access_key: accessKey } : { name, email, subject, message };
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          showBanner('success', 'Message sent successfully! Shahid will get back to you shortly.');
          form.reset();
          startCooldown(30);
        } else {
          showBanner('fallback', 'Could not deliver via endpoint. You can open your email client directly below:');
        }
      } catch (err) {
        showBanner('fallback', 'Network error. You can open your email client directly below:');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    } else {
      // Endpoint is empty -> transparently use direct mailto launch
      showBanner('fallback', 'Ready to deliver! Click below to send directly through your email app:');
      startCooldown(15);
    }
  });

  function showBanner(type, text) {
    if (!banner) return;
    banner.className = `status-banner show ${type}`;
    const txtEl = document.getElementById('banner-text');
    if (txtEl) txtEl.textContent = text;
  }

  function startCooldown(sec) {
    cooldown = sec;
    const interval = setInterval(() => {
      cooldown--;
      if (cooldown <= 0) {
        clearInterval(interval);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      } else {
        submitBtn.disabled = true;
        submitBtn.textContent = `Wait ${cooldown}s`;
      }
    }, 1000);
  }

  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => {
      const name = form.name.value;
      const email = form.email.value;
      const sub = form.subject.value || 'Portfolio Inquiry for Shahid';
      const msg = form.message.value;
      window.location.href = `mailto:${PORTFOLIO_CONFIG.social.email.address}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(`Hello Shahid,\n\n${msg}\n\nBest regards,\n${name}\nEmail: ${email}`)}`;
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = `Subject: ${form.subject.value}\nFrom: ${form.name.value} (${form.email.value})\n\n${form.message.value}`;
      navigator.clipboard.writeText(text);
      copyBtn.textContent = 'Copied to Clipboard!';
      setTimeout(() => { copyBtn.textContent = 'Copy Form Content'; }, 2500);
    });
  }

  // Copy email button
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PORTFOLIO_CONFIG.social.email.address);
      copyEmailBtn.innerHTML = '✓ Copied';
      setTimeout(() => { copyEmailBtn.innerHTML = '📋 Copy Email'; }, 2000);
    });
  }
}

function initFooterYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
}
