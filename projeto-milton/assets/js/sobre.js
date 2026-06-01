// =====================================================
// 👨‍⚕️ SOBRE PAGE JS
// =====================================================

// =====================================================
// ✨ ABOUT CARDS ANIMATION
// =====================================================

const aboutCards =
  document.querySelectorAll('.about-info-card');

aboutCards.forEach((card, index) => {

  card.style.transitionDelay =
    `${index * 0.1}s`;

});

// =====================================================
// 🚀 EXPERIENCE CARDS EFFECT
// =====================================================

const experienceCards =
  document.querySelectorAll('.experience-card');

experienceCards.forEach((card, index) => {

  card.style.transitionDelay =
    `${index * 0.12}s`;

  card.addEventListener('mouseenter', () => {

    card.style.transform =
      'translateY(-10px)';

  });

  card.addEventListener('mouseleave', () => {

    card.style.transform =
      'translateY(0px)';

  });

});

// =====================================================
// 💎 VALUE CARDS EFFECT
// =====================================================

const valueCards =
  document.querySelectorAll('.value-card');

valueCards.forEach((card, index) => {

  card.style.transitionDelay =
    `${index * 0.14}s`;

});

// =====================================================
// 🌟 IMAGE PARALLAX
// =====================================================

const aboutImage =
  document.querySelector('.about-page-image img');

window.addEventListener('scroll', () => {

  const scrollY = window.scrollY;

  if(aboutImage){

    aboutImage.style.transform =
      `translateY(${scrollY * 0.03}px)`;

  }

});

// =====================================================
// ✨ PAGE HERO REVEAL
// =====================================================

const pageHero =
  document.querySelector('.page-hero-container');

if(pageHero){

  pageHero.classList.add('reveal-active');

}

// =====================================================
// 🎯 SECTION OBSERVER
// =====================================================

const sections =
  document.querySelectorAll(`
    .about-page,
    .experience,
    .values
  `);

const sectionObserver =
  new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add('section-visible');

      }

    });

  },{
    threshold: 0.15
  });

sections.forEach((section) => {

  sectionObserver.observe(section);

});

// =====================================================
// 💫 NUMBER COUNTER EFFECT
// =====================================================

const counters =
  document.querySelectorAll('.about-info-card h3');

const speed = 200;

counters.forEach((counter) => {

  const updateCount = () => {

    const target =
      +counter.getAttribute('data-target');

    const count =
      +counter.innerText;

    const increment =
      target / speed;

    if(count < target){

      counter.innerText =
        Math.ceil(count + increment);

      setTimeout(updateCount, 15);

    }else{

      counter.innerText = target;

    }

  };

  if(counter.getAttribute('data-target')){

    updateCount();

  }

});

// =====================================================
// 🌌 SOFT MOUSE GLOW
// =====================================================

const aboutSection =
  document.querySelector('.about-page');

if(aboutSection){

  aboutSection.addEventListener('mousemove', (e) => {

    const x = e.clientX;
    const y = e.clientY;

    aboutSection.style.background =
      `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(15,61,94,0.03),
        transparent 40%
      )
      `;

  });

}

// =====================================================
// 🎉 PAGE READY
// =====================================================

console.log(`
👨‍⚕️ Sobre Page Loaded Successfully
✨ Projeto Milton Premium
`);