/*Yorum script start*/

const slides = document.querySelectorAll('.testimonial-slide');

  const dots = document.querySelectorAll('.nav-dot');

  const prevBtn = document.querySelector('.slider-arrow.prev');

  const nextBtn = document.querySelector('.slider-arrow.next');

  let currentIndex = 0;

  let autoPlayInterval;

 

  function showSlide(index) {

    slides.forEach((slide, i) => {

      slide.classList.toggle('active', i === index);

      dots[i].classList.toggle('active', i === index);

    });

    currentIndex = index;

  }

 

  function nextSlide() {

    let nextIndex = (currentIndex + 1) % slides.length;

    showSlide(nextIndex);

  }

 

  function prevSlide() {

    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    showSlide(prevIndex);

  }

 

  dots.forEach((dot, i) => {

    dot.addEventListener('click', () => {

      showSlide(i);

      resetAutoPlay();

    });

  });

 

  prevBtn.addEventListener('click', () => {

    prevSlide();

    resetAutoPlay();

  });

 

  nextBtn.addEventListener('click', () => {

    nextSlide();

    resetAutoPlay();

  });

 

  function startAutoPlay() {

    autoPlayInterval = setInterval(nextSlide, 5000);

  }

 

  function resetAutoPlay() {

    clearInterval(autoPlayInterval);

    startAutoPlay();

  }

 


  startAutoPlay();

/*Yorum script end*/


    // Marquee animasyonunun durup devam etmesi
const marquee = document.querySelector('.marquee');  // .marquee class'ını kullandım, id değil
const cards = document.querySelectorAll('.carousel-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });

  card.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });
});

/*Navbar hamburger menu */ 
const toggleButton = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

/*Artan sayılar bölümü*/ 
  document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Daha küçük = daha hızlı artar

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = target / speed;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target.toLocaleString(); // 2,200,000,000 gibi göster
        }
      };

      updateCount();
    });
  });