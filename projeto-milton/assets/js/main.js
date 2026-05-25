// =====================================================
// 🚀 PROJETO MILTON - MAIN JS
// =====================================================

// =====================================================
// 📌 HEADER SCROLL EFFECT
// =====================================================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {

  if(header){

    if(window.scrollY > 80){

      header.classList.add('header-scroll');

    }else{

      header.classList.remove('header-scroll');

    }

  }

});

// =====================================================
// ✨ REVEAL ANIMATION
// =====================================================

const revealElements = document.querySelectorAll(`
  .hero-content,
  .hero-image,
  .about-image,
  .about-content,
  .specialty-card,
  .differential-card,
  .section-header,
  .stat-card
`);

const revealObserver = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){

      entry.target.classList.add('reveal-active');

    }

  });

},{
  threshold: 0.15
});

// ======================================
// ADD REVEAL CLASS
// ======================================

revealElements.forEach((element) => {

  element.classList.add('reveal');

  revealObserver.observe(element);

});

// =====================================================
// 🎯 ACTIVE MENU LINK
// =====================================================

const currentPage =
  window.location.pathname.split("/").pop();

const navLinks =
  document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {

  const linkPage =
    link.getAttribute('href');

  if(
  linkPage === currentPage ||
  (currentPage === '' && linkPage === 'index.html')
){

    link.classList.add('active');

  }

});

// =====================================================
// 🔥 BUTTON HOVER EFFECT
// =====================================================

const buttons = document.querySelectorAll(`
  .btn-primary,
  .btn-secondary,
  .btn-header
`);

buttons.forEach((button) => {

  button.addEventListener('mouseenter', () => {

    button.style.transform =
      'translateY(-3px)';

  });

  button.addEventListener('mouseleave', () => {

    button.style.transform =
      'translateY(0px)';

  });

});

// =====================================================
// 📱 MOBILE MENU
// =====================================================

const menuToggle =
  document.getElementById('menuToggle');

const navMenu =
  document.getElementById('navMenu');

// ======================================
// OPEN / CLOSE MENU
// ======================================

if(menuToggle && navMenu){

  menuToggle.addEventListener('click', () => {

    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');

  });

}

// =====================================================
// ❌ CLOSE MENU ON LINK CLICK
// =====================================================

const navLinksMobile =
  document.querySelectorAll('.nav-link');

navLinksMobile.forEach((link) => {

  link.addEventListener('click', () => {

    if(navMenu){

      navMenu.classList.remove('active');

    }

    if(menuToggle){

      menuToggle.classList.remove('active');

    }

  });

});

// =====================================================
// 🖼️ IMAGE LOADING EFFECT
// =====================================================

const images =
  document.querySelectorAll('img');

images.forEach((img) => {

  img.addEventListener('load', () => {

    img.classList.add('img-loaded');

  });

});

// =====================================================
// 🌟 PARALLAX HERO EFFECT
// =====================================================

const heroImage =
  document.querySelector('.hero-image');

window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;

  if(heroImage){

    heroImage.style.transform =
      `translateY(${scrollY * 0.05}px)`;

  }

});

// =====================================================
// 💫 SMOOTH SCROLL FOR ANCHORS
// =====================================================

const internalLinks =
  document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {

  link.addEventListener('click', (e) => {

    const targetId =
      link.getAttribute('href');

    const target =
      document.querySelector(targetId);

    if(target){

      e.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth'
      });

    }

  });

});

// =====================================================
// 🌌 HERO MOUSE EFFECT
// =====================================================

const heroSection =
  document.querySelector('.hero');

if(heroSection && heroImage){

  heroSection.addEventListener('mousemove', (e) => {

    const x =
      (window.innerWidth / 2 - e.pageX) / 40;

    const y =
      (window.innerHeight / 2 - e.pageY) / 40;

    heroImage.style.transform =
      `translate(${x}px, ${y}px)`;

  });

}

// =====================================================
// 💎 CONSOLE BRANDING
// =====================================================

console.log(`

=========================================
🚀 PROJETO MILTON
💻 Desenvolvido por Arlisson Ferreira
=========================================

`);

// =====================================================
// ✅ SITE READY
// =====================================================

window.addEventListener('load', () => {

  document.body.classList.add('loaded');

});

// =====================================================
// ⬆️ SCROLL TO TOP ON PAGE LOAD
// =====================================================

window.onbeforeunload = () => {

  window.scrollTo(0, 0);

};

// =====================================================
// ✨ FOOTER REVEAL
// =====================================================

const footer =
  document.querySelector('.footer');

if(footer){

  const footerObserver =
    new IntersectionObserver((entries) => {

      entries.forEach((entry) => {

        if(entry.isIntersecting){

          footer.classList.add('reveal-active');

        }

      });

    }, {
      threshold: 0.1
    });

  footer.classList.add('reveal');

  footerObserver.observe(footer);

}