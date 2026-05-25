// =====================================================
// 🎬 PROJETO MILTON - ANIMATIONS JS
// =====================================================

// =====================================================
// ✨ SCROLL REVEAL ANIMATION
// =====================================================

const animatedElements = document.querySelectorAll(`
  .reveal,
  .specialty-card,
  .differential-card,
  .stat-card
`);

const animationObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add('show-element');

    }

  });

},{
  threshold: 0.12
});

animatedElements.forEach((element) => {

  animationObserver.observe(element);

});

// =====================================================
// 🌟 STAGGER EFFECT
// =====================================================

const specialtyCards = document.querySelectorAll('.specialty-card');

specialtyCards.forEach((card, index) => {

  card.style.transitionDelay = `${index * 0.1}s`;

});

// =====================================================
// 💎 DIFFERENTIALS STAGGER
// =====================================================

const differentialCards = document.querySelectorAll('.differential-card');

differentialCards.forEach((card, index) => {

  card.style.transitionDelay = `${index * 0.12}s`;

});

// =====================================================
// 🚀 HERO FLOAT EFFECT
// =====================================================

const heroImg = document.querySelector('.hero-image img');

if(heroImg){

  let floatDirection = 1;

  setInterval(() => {

    heroImg.style.transform =
      `translateY(${floatDirection * 8}px)`;

    floatDirection *= -1;

  }, 2500);

}

// =====================================================
// 🌊 MOUSE PARALLAX
// =====================================================

const heroSection = document.querySelector('.hero');

if(heroSection){

  heroSection.addEventListener('mousemove', (e) => {

    const x = (window.innerWidth / 2 - e.pageX) / 40;
    const y = (window.innerHeight / 2 - e.pageY) / 40;

    if(heroImg){

      heroImg.style.transform =
        `translate(${x}px, ${y}px)`;

    }

  });

}

// =====================================================
// 🔥 SMOOTH APPEAR EFFECT
// =====================================================

window.addEventListener('load', () => {

  document.body.classList.add('site-loaded');

});

// =====================================================
// 💫 BUTTON RIPPLE EFFECT
// =====================================================

const rippleButtons = document.querySelectorAll(`
  .btn-primary,
  .btn-secondary,
  .btn-header
`);

rippleButtons.forEach((button) => {

  button.addEventListener('click', function(e){

    const ripple = document.createElement('span');

    ripple.classList.add('ripple');

    const rect = button.getBoundingClientRect();

    ripple.style.left =
      `${e.clientX - rect.left}px`;

    ripple.style.top =
      `${e.clientY - rect.top}px`;

    this.appendChild(ripple);

    setTimeout(() => {

      ripple.remove();

    }, 600);

  });

});

// =====================================================
// ✨ IMAGE HOVER GLOW
// =====================================================

const images = document.querySelectorAll(`
  .hero-image img,
  .about-image img
`);

images.forEach((image) => {

  image.addEventListener('mouseenter', () => {

    image.style.filter =
      'brightness(1.03)';

  });

  image.addEventListener('mouseleave', () => {

    image.style.filter =
      'brightness(1)';

  });

});

// =====================================================
// 🎯 ACTIVE SECTION OBSERVER
// =====================================================

const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      const id = entry.target.getAttribute('id');

      navItems.forEach((link) => {

        link.classList.remove('active');

        if(link.getAttribute('href') === `#${id}`){

          link.classList.add('active');

        }

      });

    }

  });

},{
  threshold: 0.4
});

sections.forEach((section) => {

  sectionObserver.observe(section);

});

// =====================================================
// 🌌 BACKGROUND LIGHT EFFECT
// =====================================================

const heroContent = document.querySelector('.hero-content');

if(heroContent){

  heroContent.addEventListener('mousemove', (e) => {

    const x = e.offsetX;
    const y = e.offsetY;

    heroContent.style.background =
      `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(15,61,94,0.06),
        transparent 45%
      )
      `;

  });

}

// =====================================================
// 🎉 FINAL LOG
// =====================================================

console.log(`
✨ Animations Loaded Successfully
🚀 Projeto Milton Premium Experience
`);