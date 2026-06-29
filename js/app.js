/* ═══════════════════════════════════════════════
   THILAK T M — PORTFOLIO JS
   Full functionality: typing, skills, projects,
   timeline, contact, theme, animations
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Splash / Intro Screen ── */
  const splash = document.getElementById('splash-screen');
  const loaderFill = document.getElementById('splash-loader-fill');
  const loaderText = document.getElementById('splash-loader-text');
  const splashSkip = document.getElementById('splash-skip');

  const loadingSteps = [
    { pct: 20, text: 'Loading assets...' },
    { pct: 45, text: 'Building components...' },
    { pct: 70, text: 'Rendering portfolio...' },
    { pct: 90, text: 'Almost ready...' },
    { pct: 100, text: 'Welcome!' }
  ];

  // Add splash-active class to prevent scroll
  document.body.classList.add('splash-active');

  function dismissSplash() {
    splash.classList.add('fade-out');
    document.body.classList.remove('splash-active');
    setTimeout(() => {
      splash.classList.add('hidden');
    }, 900);
  }

  // Animate loader steps
  let stepIndex = 0;
  const stepInterval = setInterval(() => {
    if (stepIndex >= loadingSteps.length) {
      clearInterval(stepInterval);
      setTimeout(dismissSplash, 400);
      return;
    }
    const step = loadingSteps[stepIndex];
    loaderFill.style.width = step.pct + '%';
    loaderText.textContent = step.text;
    stepIndex++;
  }, 600);

  // Skip button
  splashSkip.addEventListener('click', () => {
    clearInterval(stepInterval);
    loaderFill.style.width = '100%';
    loaderText.textContent = 'Welcome!';
    setTimeout(dismissSplash, 250);
  });

  /* ── Cursor Glow ── */
  const cursorGlow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  /* ── Navbar: scroll behavior + active link ── */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sTop = section.offsetTop - 100;
      if (window.scrollY >= sTop) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });

    // Scroll progress bar
    const scrollBar = document.getElementById('scroll-bar');
    if (scrollBar) {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPct = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      scrollBar.style.width = scrollPct + '%';
    }

    // Back to top
    const btt = document.getElementById('back-to-top');
    if (window.scrollY > 400) btt.classList.add('visible');
    else btt.classList.remove('visible');
  });

  /* ── Hamburger Menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });

  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinksContainer.classList.remove('open');
    });
  });

  /* ── Theme Toggle ── */
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeIcon.className = 'fas fa-sun';
  }

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeIcon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  });

  /* ── Dynamic Greeting ── */
  const greetEl = document.getElementById('time-greeting');
  const hour = new Date().getHours();
  if (hour < 12) greetEl.textContent = 'Good Morning';
  else if (hour < 17) greetEl.textContent = 'Good Afternoon';
  else if (hour < 21) greetEl.textContent = 'Good Evening';
  else greetEl.textContent = 'Good Night';

  /* ── Typing Animation ── */
  const typedEl = document.getElementById('typed-text');
  const words = [
    'Full Stack Developer',
    'MERN Stack Developer',
    'AI & Data Science Graduate'
  ];
  let wIndex = 0, cIndex = 0, deleting = false;

  function type() {
    const word = words[wIndex];
    if (!deleting) {
      typedEl.textContent = word.slice(0, cIndex + 1);
      cIndex++;
      if (cIndex === word.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typedEl.textContent = word.slice(0, cIndex - 1);
      cIndex--;
      if (cIndex === 0) {
        deleting = false;
        wIndex = (wIndex + 1) % words.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  /* ── Render Skills ── */
  const skillsGrid = document.getElementById('skills-grid');

  function renderSkills(filter = 'all') {
    skillsGrid.innerHTML = '';
    const filtered = filter === 'all' ? skillsData : skillsData.filter(s => s.category === filter);

    filtered.forEach((skill, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card glass-card reveal';
      card.style.animationDelay = `${i * 0.04}s`;
      card.dataset.category = skill.category;

      const iconHTML = skill.icon
        ? `<i class="${skill.icon} skill-fallback"></i>`
        : `<img class="skill-img" src="${skill.image}" alt="${skill.name}" onerror="this.style.display='none'" />`;

      card.innerHTML = `
        <div class="skill-icon-wrap">${iconHTML}</div>
        <div class="skill-name">${skill.name}</div>
      `;
      skillsGrid.appendChild(card);
    });

    observeReveal();
  }

  renderSkills();

  // Skills filter
  document.querySelectorAll('.skills-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.skills-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.filter);
    });
  });



  /* ── Render Projects ── */
  const projectsGrid = document.getElementById('projects-grid');

  const projectIcons = {
    'AI-ML': 'fas fa-brain',
    'ML': 'fas fa-chart-line',
    'Web': 'fas fa-globe',
    'default': 'fas fa-code'
  };

  function renderProjects(filter = 'all', query = '') {
    projectsGrid.innerHTML = '';
    let data = projectsData;

    if (filter !== 'all') data = data.filter(p => p.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      data = data.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    if (!data.length) {
      projectsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 0;font-size:1rem;">No projects found. Try a different search or filter.</div>`;
      return;
    }

    data.forEach((proj, i) => {
      const card = document.createElement('div');
      card.className = 'project-card glass-card';
      card.style.animationDelay = `${i * 0.08}s`;

      const statusClass = {
        'Live': 'status-live',
        'Completed': 'status-completed',
        'WIP': 'status-wip'
      }[proj.status] || 'status-completed';

      const tags = proj.technologies.map(t => `<span class="tag">${t}</span>`).join('');
      const featuresList = proj.features ? proj.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--purple-light);margin-right:6px"></i>${f}</li>`).join('') : '';

      card.innerHTML = `
        <div class="project-img-container">
          <img src="${proj.image}" alt="${proj.name}" class="project-card-image" />
          <span class="project-status-badge ${statusClass}">${proj.status}</span>
        </div>
        <div class="project-card-body">
          <span class="project-card-cat"># ${proj.category}</span>
          <h3 class="project-card-title">${proj.name}</h3>
          <p class="project-card-desc">${proj.description}</p>
          <div class="project-card-features">
            <h4 class="features-title">Key Features:</h4>
            <ul>${featuresList}</ul>
          </div>
          <div class="project-tags">${tags}</div>
          <div class="project-card-links">
            ${proj.github !== '#' ? `<a href="${proj.github}" target="_blank" class="btn-secondary proj-btn" onclick="event.stopPropagation()"><i class="fab fa-github"></i> GitHub</a>` : ''}
            ${proj.liveDemo !== '#' ? `<a href="${proj.liveDemo}" target="_blank" class="btn-primary proj-btn" onclick="event.stopPropagation()"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(proj));
      projectsGrid.appendChild(card);
    });

    observeReveal();
  }

  renderProjects();

  // Project filter
  let activeFilter = 'all';
  document.querySelectorAll('.project-filters .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.project-filters .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.pfilter;
      renderProjects(activeFilter, document.getElementById('project-search').value);
    });
  });

  // Project search
  document.getElementById('project-search').addEventListener('input', (e) => {
    renderProjects(activeFilter, e.target.value);
  });

  /* ── Render Education Timeline ── */
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  educationData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-node reveal';
    el.style.animationDelay = `${i * 0.15}s`;

    el.innerHTML = `
      <div class="timeline-dot-wrap">
        <div class="timeline-dot-glow"></div>
        <div class="timeline-dot"><i class="${item.icon}"></i></div>
      </div>
      <div class="timeline-card glass-card">
        <div class="tl-card-header">
          <span class="tl-period">${item.period}</span>
          <h3 class="tl-title">${item.title}</h3>
        </div>
        <p class="tl-subject">${item.subject}</p>
        <p class="tl-institution"><i class="fas fa-university"></i> ${item.institution}</p>
      </div>
    `;

    timeline.appendChild(el);
  });

  /* ── Project Modal ── */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalContent = document.getElementById('modal-content');

  function openModal(proj) {
    const statusClass = {
      'Live': 'status-live', 'Completed': 'status-completed', 'WIP': 'status-wip'
    }[proj.status] || 'status-completed';
    
    const tags = proj.technologies.map(t => `<span class="tag">${t}</span>`).join('');
    const featuresList = proj.features ? proj.features.map(f => `<li><i class="fas fa-check-circle" style="color:var(--purple-light);margin-right:8px"></i>${f}</li>`).join('') : '';

    modalContent.innerHTML = `
      <div class="modal-project-img-wrapper" style="position:relative;width:100%;height:220px;overflow:hidden;border-radius:var(--radius-sm);margin-bottom:20px;">
        <img src="${proj.image}" alt="${proj.name}" style="width:100%;height:100%;object-fit:cover;" />
        <span class="project-status-badge ${statusClass}" style="position:absolute;top:16px;right:16px;">${proj.status}</span>
      </div>
      <span class="project-category" style="font-size:0.8rem;color:var(--purple-light);font-family:'JetBrains Mono',monospace;"># ${proj.category}</span>
      <h2 class="modal-title" style="margin-top:4px;font-size:1.6rem;font-weight:800;color:var(--text-primary);">${proj.name}</h2>
      <p class="modal-description" style="margin-top:12px;color:var(--text-secondary);font-size:0.95rem;line-height:1.6;">${proj.description}</p>
      
      <div class="modal-features-wrap" style="margin-top:20px;">
        <h4 style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Core Features:</h4>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:8px;font-size:0.9rem;color:var(--text-secondary);">${featuresList}</ul>
      </div>

      <div class="modal-tags" style="margin-top:20px;display:flex;flex-wrap:wrap;gap:8px;">${tags}</div>
      
      <div class="modal-links" style="margin-top:24px;display:flex;gap:12px;">
        ${proj.github !== '#' ? `<a href="${proj.github}" target="_blank" class="btn-secondary" style="flex:1;padding:12px;text-align:center;font-size:0.9rem;border-radius:10px;justify-content:center;display:flex;align-items:center;gap:8px;"><i class="fab fa-github"></i> Code Repository</a>` : ''}
        ${proj.liveDemo !== '#' ? `<a href="${proj.liveDemo}" target="_blank" class="btn-primary" style="flex:1;padding:12px;text-align:center;font-size:0.9rem;border-radius:10px;justify-content:center;display:flex;align-items:center;gap:8px;"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
      </div>
    `;
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  /* ── Contact Form — Smart Dual Strategy ── */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');
  const errorMsgText = document.getElementById('error-message-text');
  const formMessage = document.getElementById('form-message');

  function validateField(id, validFn, errorMsg) {
    const input = document.getElementById(id);
    if (!input) return true;
    const val = input.value.trim();
    if (!val || (validFn && !validFn(val))) {
      formMessage.textContent = errorMsg;
      input.style.borderColor = '#f43f5e';
      return false;
    }
    input.style.borderColor = 'var(--green)';
    return true;
  }

  function showSuccess() {
    form.reset();
    ['contact-name','contact-email','cf-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) input.style.borderColor = '';
    });
    formMessage.textContent = '';
    errorMsg.classList.remove('show');
    successMsg.classList.add('show');
    setTimeout(() => successMsg.classList.remove('show'), 6000);
  }

  function showError(msg) {
    errorMsgText.innerHTML = msg;
    successMsg.classList.remove('show');
    errorMsg.classList.add('show');
  }

  // mailto: fallback — opens Gmail compose with all fields filled
  function sendViaMailto() {
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:thilakawm123@gmail.com`
      + `?subject=${encodeURIComponent('Portfolio Contact Message')}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    showSuccess();
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide any previous messages
    successMsg.classList.remove('show');
    errorMsg.classList.remove('show');
    formMessage.textContent = '';

    const isNameValid = validateField('contact-name', v => v.length >= 2, 'Name must be at least 2 characters.');
    const isEmailValid = isNameValid && validateField('contact-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.');
    const isMessageValid = isEmailValid && validateField('cf-message', v => v.length >= 10, 'Message must be at least 10 characters.');

    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    const btn = document.getElementById('submit-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;

    // If running locally (file://) go straight to mailto
    if (window.location.protocol === 'file:') {
      btn.disabled = false;
      btn.innerHTML = 'Submit';
      sendViaMailto();
      return;
    }

    // If served from http/https — try FormSubmit first
    try {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch('https://formsubmit.co/ajax/thilakawm123@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: json
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.success === 'true' || result.success === true) {
        showSuccess();
      } else {
        throw new Error(result.message || 'FormSubmit failed');
      }
    } catch (err) {
      console.warn('FormSubmit failed:', err);
      
      const name    = document.getElementById('contact-name').value.trim();
      const email   = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();
      const mailtoLink = `mailto:thilakawm123@gmail.com?subject=${encodeURIComponent('Portfolio Contact Message')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

      showError(`Submission failed. If this is your first time, please check your inbox (<strong>thilakawm123@gmail.com</strong>) for a confirmation email from FormSubmit and click the link to activate it. <br><br>Alternatively, <a href="${mailtoLink}" style="color: var(--cyan); text-decoration: underline; font-weight: 600;">click here to email directly</a>.`);
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Submit';
    }
  });

  // Clear errors on input
  ['contact-name','contact-email','cf-message'].forEach(id => {
    const input = document.getElementById(id);
    if (input) {
      input.addEventListener('input', () => {
        input.style.borderColor = '';
        formMessage.textContent = '';
        errorMsg.classList.remove('show');
      });
    }
  });

  // Cancel button logic
  const cancelBtn = document.getElementById('form-cancel');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      form.reset();
      formMessage.textContent = '';
      ['contact-name','contact-email','cf-message'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.style.borderColor = '';
      });
      successMsg.classList.remove('show');
      errorMsg.classList.remove('show');
    });
  }

  /* ── Counter Animation ── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  }

  /* ── Scroll Reveal + Counter Trigger ── */
  function observeReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // If it's a counter
          if (entry.target.classList.contains('stats-row')) {
            entry.target.querySelectorAll('.counter').forEach(animateCounter);
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.querySelectorAll('.stats-row').forEach(el => observer.observe(el));

    // Timeline items
    document.querySelectorAll('.timeline-node').forEach((el, i) => {
      setTimeout(() => {
        const tObs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'none';
              tObs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        tObs.observe(el);
      }, i * 100);
    });
  }

  observeReveal();

  /* ── Back to Top ── */
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Smooth scroll for all nav links ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
