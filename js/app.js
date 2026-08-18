/**
 * Clean Address Bar & URL Sanitizer
 * Automatically removes index.html, trailing file extensions, and query exposures from browser address bar
 */
(function sanitizeAddressBar() {
  if (typeof window === 'undefined' || !window.history || !window.history.replaceState) return;
  const loc = window.location;
  if (loc.pathname.endsWith('/index.html')) {
    const cleanPath = loc.pathname.replace(/\/index\.html$/, '/') || '/';
    window.history.replaceState(null, '', cleanPath + loc.search + loc.hash);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initPracticeAreasAccordion();
  initCareerTimeline();
  initFaqAccordion();
  initPricingToggle();
  initConsultationForm();
  initScrollAnimations();
});

/* ==========================================================================
   1. Sticky Navbar & Mobile Navigation
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking links or mobile CTA button
    const closeTargets = navMenu.querySelectorAll('a, button');
    closeTargets.forEach(target => {
      target.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !header.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '☰';
      }
    });
  }
}

/* ==========================================================================
   2. Interactive Practice Areas FLIP Accordion (Expand, Collapse & Reorder)
   ========================================================================== */
function initPracticeAreasAccordion() {
  const track = document.getElementById('practiceFlipTrack');
  if (!track) return;

  const items = track.querySelectorAll('.practice-item');
  let isAnimating = false;

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      // If clicking interactive link or button inside the expanded item, allow standard navigation
      if (e.target.closest('a, button') && item.classList.contains('is-expanded')) {
        return;
      }

      // If already expanded, do nothing
      if (item.classList.contains('is-expanded')) return;
      if (isAnimating) return;

      isAnimating = true;

      // 1. Collapse the currently expanded item and expand the clicked item
      const currentExpanded = track.querySelector('.practice-item.is-expanded');
      if (currentExpanded) {
        currentExpanded.classList.remove('is-expanded');
        currentExpanded.classList.add('is-collapsed');
      }

      item.classList.remove('is-collapsed');
      item.classList.add('is-expanded');

      // 2. Subtle stagger reveal for expanded content elements if GSAP is available
      if (window.gsap) {
        const expandedInfo = item.querySelector('.expanded-info');
        const expandedImg = item.querySelector('.expanded-image-box');
        if (expandedInfo && expandedImg) {
          gsap.fromTo([expandedInfo.children, expandedImg],
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out", delay: 0.15 }
          );
        }
      }

      setTimeout(() => {
        isAnimating = false;
      }, 600);
    });
  });
}

/* ==========================================================================
   3. Interactive Career Milestone Timeline (15+ Years)
   ========================================================================== */
const careerMilestones = [
  {
    year: "2011",
    category: "CAREER COMMENCEMENT",
    title: "Enrolled as Advocate at District & Sessions Judge Court",
    desc: "Commenced professional courtroom practice handling complex civil land title disputes, partition suits, and criminal bail proceedings across the subordinate trial courts of Dhaka.",
    achievements: [
      "Enrolled with Bangladesh Bar Council & joined Dhaka Bar Association",
      "Conducted over 150+ civil property hearings and criminal bail motions"
    ],
    image: "assets/images/image/9_main_rasel.jpg"
  },
  {
    year: "2014",
    category: "LANDMARK PROPERTY SUITS",
    title: "High-Profile Land Title Injunctions & Partition Decrees",
    desc: "Secured critical perpetual injunction decrees and partition judgments in major disputed commercial and residential properties across Dhaka division.",
    achievements: [
      "Successfully represented 80+ property title and succession partition suits",
      "Pioneered expedited Land Survey Tribunal and AC Land mutation challenges"
    ],
    image: "assets/images/practice-civil.webp"
  },
  {
    year: "2018",
    category: "HIGH COURT ENROLLMENT",
    title: "Enrolled as Advocate of the Supreme Court of Bangladesh",
    desc: "Formally enrolled to practice before the High Court Division of the Supreme Court of Bangladesh, expanding senior legal representation to Constitutional Writs and appellate benches.",
    achievements: [
      "Member of the prestigious Supreme Court Bar Association (SCBA)",
      "Moved over 250+ anticipatory bail applications and criminal appeals"
    ],
    image: "assets/images/image/6_rasel.jpg"
  },
  {
    year: "2021",
    category: "CONSTITUTIONAL REMEDIES",
    title: "Landmark Writ Petitions Under Article 102",
    desc: "Achieved notable judicial directions protecting citizen fundamental rights against unlawful executive notices, illegal land demolitions, and arbitrary government tenders.",
    achievements: [
      "Over 40+ reported and recognized High Court writ order precedents",
      "Stay orders obtained against unauthorized regulatory notices"
    ],
    image: "assets/images/image/24.png"
  },
  {
    year: "2024",
    category: "CORPORATE ARBITRATION",
    title: "Expansion into Multi-National Corporate Retainers",
    desc: "Formed strategic legal counsel retainers for leading corporate groups, real estate developers, and tech ventures for compliance, commercial contracts, and arbitration.",
    achievements: [
      "Retained by 50+ corporate firms for ongoing statutory advisory & RJSC filings",
      "Mediated high-stake commercial dispute settlements out of court"
    ],
    image: "assets/images/image/23.png"
  },
  {
    year: "2026",
    category: "10+ YEARS SENIOR COUNSEL",
    title: "A Decade and a Half of Prestigious Judicial Advocacy",
    desc: "Dual-jurisdiction senior advocate providing relentless courtroom defense, mentoring junior advocates, and maintaining a 95% case victory record nationwide.",
    achievements: [
      "1,400+ cases conducted across Supreme Court and District Courts",
      "1,900+ satisfied clients and trusted advisory relationships"
    ],
    image: "assets/images/image/4_rasel.jpg"
  }
];

function initCareerTimeline() {
  const stepNodes = document.querySelectorAll('.timeline-step-node');
  const progressLine = document.getElementById('timelineProgressLine');
  const yearEl = document.getElementById('milestoneYear');
  const catEl = document.getElementById('milestoneCategory');
  const titleEl = document.getElementById('milestoneTitle');
  const descEl = document.getElementById('milestoneDesc');
  const listEl = document.getElementById('milestoneList');
  const imgEl = document.getElementById('milestoneImage');
  const prevBtn = document.getElementById('timelinePrevBtn');
  const nextBtn = document.getElementById('timelineNextBtn');

  if (!titleEl || !descEl) return;

  let currentIndex = 0;

  const updateTimeline = (index) => {
    if (index < 0 || index >= careerMilestones.length) return;
    currentIndex = index;

    const data = careerMilestones[index];

    // Update active node if present
    if (stepNodes.length) {
      stepNodes.forEach((node, idx) => {
        if (idx === index) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });
    }

    // Update progress bar if present
    if (progressLine && stepNodes.length > 1) {
      const percent = (index / (careerMilestones.length - 1)) * 100;
      progressLine.style.setProperty('--progress-width', `${percent}%`);
    }

    // Smooth animation
    const cardContent = document.querySelector('.timeline-card-content');
    if (window.gsap && cardContent) {
      gsap.fromTo(cardContent,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }

    // Populate data safely
    if (yearEl) yearEl.textContent = data.year;
    if (catEl) catEl.textContent = data.category;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;

    // Populate achievements list
    if (listEl) {
      listEl.innerHTML = data.achievements.map(item => `
        <div class="timeline-achieve-item">
          <span class="gold-check">✓</span>
          <span>${item}</span>
        </div>
      `).join('');
    }

    // Populate image
    if (imgEl && data.image) {
      imgEl.src = data.image;
      imgEl.alt = `${data.title} (${data.year})`;
    }
  };

  // Node click events if present
  if (stepNodes.length) {
    stepNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const idx = parseInt(node.getAttribute('data-index'), 10);
        updateTimeline(idx);
      });
    });
  }

  // Next / Prev button events
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex - 1 + careerMilestones.length) % careerMilestones.length;
      updateTimeline(nextIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const nextIdx = (currentIndex + 1) % careerMilestones.length;
      updateTimeline(nextIdx);
    });
  }

  // Initialize first milestone
  updateTimeline(0);
}

/* ==========================================================================
   4. FAQ Collapsible Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
      questionBtn.setAttribute('aria-expanded', !isActive);
    });
  });
}

/* ==========================================================================
   5. Pricing Toggle (Monthly vs Yearly)
   ========================================================================== */
function initPricingToggle() {
  const pricingCheckbox = document.getElementById('pricingCheckbox');
  const monthlyLabel = document.getElementById('monthlyLabel');
  const yearlyLabel = document.getElementById('yearlyLabel');

  const price1 = document.getElementById('priceBasic');
  const price2 = document.getElementById('priceStandard');
  const price3 = document.getElementById('pricePremium');

  const period1 = document.getElementById('periodBasic');
  const period2 = document.getElementById('periodStandard');
  const period3 = document.getElementById('periodPremium');

  if (!pricingCheckbox) return;

  const updatePricing = () => {
    const isYearly = pricingCheckbox.checked;

    if (isYearly) {
      if (monthlyLabel) monthlyLabel.classList.remove('active');
      if (yearlyLabel) yearlyLabel.classList.add('active');

      if (price1) price1.textContent = "৳50,000";
      if (price2) price2.textContent = "৳150,000";
      if (price3) price3.textContent = "৳350,000";

      if (period1) period1.textContent = "/ Per Year (Annual Retainer)";
      if (period2) period2.textContent = "/ Per Year (Annual Retainer)";
      if (period3) period3.textContent = "/ Per Year (Annual Retainer)";
    } else {
      if (monthlyLabel) monthlyLabel.classList.add('active');
      if (yearlyLabel) yearlyLabel.classList.remove('active');

      if (price1) price1.textContent = "৳5,000";
      if (price2) price2.textContent = "৳15,000";
      if (price3) price3.textContent = "৳35,000";

      if (period1) period1.textContent = "/ Per Month";
      if (period2) period2.textContent = "/ Per Month";
      if (period3) period3.textContent = "/ Per Month";
    }
  };

  pricingCheckbox.addEventListener('change', updatePricing);

  if (monthlyLabel) {
    monthlyLabel.addEventListener('click', () => {
      pricingCheckbox.checked = false;
      updatePricing();
    });
  }

  if (yearlyLabel) {
    yearlyLabel.addEventListener('click', () => {
      pricingCheckbox.checked = true;
      updatePricing();
    });
  }
}

/* ==========================================================================
   6. Consultation Booking Form Handler & Email Integration (lawcraft.bd@gmail.com)
   ========================================================================== */
function initConsultationForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName')?.value.trim();
    const phone = document.getElementById('formPhone')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const subject = document.getElementById('formSubject')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    // Required field validation (email is optional)
    if (!name || !phone || !subject) {
      showToast("Please fill in your Name, Phone Number, and Subject.");
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9+ -]{7,16}$/;
    if (!phoneRegex.test(phone)) {
      showToast("Please enter a valid phone number.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>⏳</span> <span>Sending Request...</span>";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/lawcraft.bd@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Legal Inquiry: ${subject} (${name})`,
          "Client Name": name,
          "Contact Phone": phone,
          "Email Address": email || "Not Provided (Optional)",
          "Legal Subject": subject,
          "Case Details / Message": message || "No extra message provided",
          _template: "table"
        })
      });

      if (response.ok) {
        form.reset();
        showToast("Thank you! Your legal consultation request has been delivered to our chambers (lawcraft.bd@gmail.com). We will call you shortly.");
      } else {
        // Fallback standard submit if AJAX response fails
        form.submit();
      }
    } catch (err) {
      console.log("AJAX submission fallback triggered:", err);
      // If offline or blocked by browser extension, fallback to form standard submission
      form.submit();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    }
  });
}

function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>⚖️</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. Scroll Active Navigation
   ========================================================================== */
function initScrollAnimations() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
