// Enhanced navigation with smooth scrolling and active state tracking
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const bar = document.getElementById("barDiv");
  const item = document.getElementById("item");
  const navLinks = document.querySelectorAll('#item a');
  
  bar.addEventListener("click", () => {
    if(item.style.right == "-250px"){
      item.style.right = "0px";
    } else {
      item.style.right = "-250px";
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!bar.contains(event.target) && !item.contains(event.target) && window.innerWidth < 991) {
      item.style.right = "-250px";
    }
  });
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Close mobile menu when a link is clicked
      if (window.innerWidth < 991) {
        item.style.right = "-250px";
      }
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Active section highlighting
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
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
  
  // Animate counters for totalUsers
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const count = +counter.innerText;
      const increment = target / 100;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => animateCounters(), 10);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  // Add parallax effect to the hero section
  const heroSection = document.querySelector('.back');
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    if (heroSection) {
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
  });
  
  // Form validation with feedback
  const contactForm = document.getElementById('form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      let isValid = true;
      
      // Simple validation
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
      } else {
        removeError(nameInput);
      }
      
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(emailInput);
      }
      
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
      } else {
        removeError(messageInput);
      }
      
      // Display success message if valid
      if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Message sent successfully!';
        
        // Don't actually prevent submission since it's using web3forms
        // But we can add a success message that disappears after submission
        contactForm.appendChild(successMessage);
        setTimeout(() => {
          successMessage.style.opacity = '0';
          setTimeout(() => successMessage.remove(), 500);
        }, 3000);
      }
    });
  }
  
  function showError(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message') || document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    if (!formControl.querySelector('.error-message')) {
      formControl.appendChild(errorMessage);
    }
    input.classList.add('error-input');
  }
  
  function removeError(input) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    if (errorMessage) {
      formControl.removeChild(errorMessage);
    }
    input.classList.remove('error-input');
  }
  
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  // Add hover effects to product/service cards
  const cards = document.querySelectorAll('.team, .team1');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
    });
  });
  
  // Back to top button functionality with smooth scrolling
  const backToTopButton = document.getElementById('backTotop');
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Initialize AOS with more dynamic options
  AOS.init({
    offset: 120,
    delay: 0,
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    anchorPlacement: 'top-bottom'
  });
});

// Add these features to your script.js file after the existing code

// Product filtering functionality
function setupProductFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.classMenu .team');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter products
      productItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// Testimonial carousel
function setupTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentIndex = 0;
  
  // Auto-advance testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateTestimonial();
  }, 5000);
  
  // Click on dots to change testimonial
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      currentIndex = parseInt(this.getAttribute('data-index'));
      updateTestimonial();
    });
  });
  
  function updateTestimonial() {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }
}

// Counter animation trigger on scroll
function setupCounterAnimation() {
  const counterSection = document.querySelector('.counter-section');
  
  if (counterSection) {
    let animated = false;
    
    document.addEventListener('scroll', function() {
      const position = counterSection.getBoundingClientRect();
      
      // Check if counter section is visible
      if (position.top < window.innerHeight && position.bottom >= 0 && !animated) {
        animated = true;
        
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = +counter.dataset.target;
          let count = 0;
          const duration = 2000; // 2 seconds
          const interval = Math.floor(duration / target);
          
          const timer = setInterval(() => {
            count += 1;
            counter.textContent = count;
            
            if (count >= target) {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, interval);
        });
      }
    });
  }
}

// Interactive image gallery for products
function setupImageGallery() {
  const productImages = document.querySelectorAll('.team .img img, .team1 .img img');
  
  productImages.forEach(image => {
    image.addEventListener('click', function() {
      const overlay = document.createElement('div');
      overlay.className = 'gallery-overlay';
      
      const enlargedImg = document.createElement('img');
      enlargedImg.src = this.src;
      enlargedImg.className = 'enlarged-image';
      
      const closeBtn = document.createElement('span');
      closeBtn.innerHTML = '&times;';
      closeBtn.className = 'gallery-close';
      
      overlay.appendChild(enlargedImg);
      overlay.appendChild(closeBtn);
      document.body.appendChild(overlay);
      
      // Prevent scrolling when overlay is open
      document.body.style.overflow = 'hidden';
      
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(overlay);
        document.body.style.overflow = 'auto';
      });
      
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
          document.body.removeChild(overlay);
          document.body.style.overflow = 'auto';
        }
      });
    });
  });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
  setupProductFilters();
  setupTestimonials();
  setupCounterAnimation();
  setupImageGallery();
  
  // Form submission spinner
  const form = document.getElementById('form');
  const spinner = document.querySelector('.spinner');
  
  if (form && spinner) {
    form.addEventListener('submit', function() {
      spinner.style.display = 'block';
      
      // Hide spinner after submission is complete (handled by web3forms)
      setTimeout(() => {
        spinner.style.display = 'none';
      }, 3000);
    });
  }
});

// Enhanced script.js with more dynamic animations and features
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const bar = document.getElementById("barDiv");
  const item = document.getElementById("item");
  const navLinks = document.querySelectorAll('#item a');
  
  bar.addEventListener("click", () => {
    if(item.style.right == "-250px"){
      item.style.right = "0px";
      bar.classList.add('active');
    } else {
      item.style.right = "-250px";
      bar.classList.remove('active');
    }
  });
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!bar.contains(event.target) && !item.contains(event.target) && window.innerWidth < 991) {
      item.style.right = "-250px";
      bar.classList.remove('active');
    }
  });
  
  // Smooth scroll for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Close mobile menu when a link is clicked
      if (window.innerWidth < 991) {
        item.style.right = "-250px";
        bar.classList.remove('active');
      }
      
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Active section highlighting with enhanced effects
  window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
        // Add a subtle pulse animation to active link
        link.style.animation = 'pulse 1s';
        setTimeout(() => {
          link.style.animation = '';
        }, 1000);
      }
    });
  });
  
  // Enhanced parallax effect for the hero section
  const heroSection = document.querySelector('.back');
  const midContent = document.querySelector('.mid');
  
  window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    if (heroSection) {
      heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
      
      // Add parallax effect to hero content
      if (midContent) {
        midContent.style.opacity = 1 - (scrollPosition * 0.003);
        if (scrollPosition < 10) {
          midContent.style.opacity = 1;
        }
      }
    }
  });
  
  // Improved counter animation with easing
  function setupCounterAnimation() {
    const counterSection = document.querySelector('.counter-section');
    
    if (counterSection) {
      let animated = false;
      
      const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
          rect.bottom >= 0
        );
      };
      
      const animateCounter = () => {
        if (isInViewport(counterSection) && !animated) {
          animated = true;
          
          const counters = document.querySelectorAll('.counter');
          counters.forEach((counter, index) => {
            const target = +counter.dataset.target;
            let count = 0;
            
            // Staggered start for each counter
            setTimeout(() => {
              const duration = 2000;
              const startTime = Date.now();
              
              const updateCounter = () => {
                const currentTime = Date.now();
                const progress = Math.min((currentTime - startTime) / duration, 1);
                
                // Apply easing for smoother animation
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                count = Math.floor(target * easedProgress);
                
                counter.textContent = count;
                
                if (progress < 1) {
                  requestAnimationFrame(updateCounter);
                } else {
                  counter.textContent = target;
                }
              };
              
              requestAnimationFrame(updateCounter);
            }, index * 150);
          });
        }
      };
      
      // Check on scroll and initial page load
      document.addEventListener('scroll', animateCounter);
      animateCounter(); // Check on initial load
    }
  }
  
  // Product/service cards with enhanced hover effects
  const cards = document.querySelectorAll('.team, .team1');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.classList.add('card-hover');
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.5s ease-in-out';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('card-hover');
      const img = this.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  });
  
  // Improved filter buttons with smoother transitions
  const setupProductFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.classMenu .team');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Add pulse effect to button when clicked
        this.style.animation = 'pulse 0.5s';
        setTimeout(() => {
          this.style.animation = '';
        }, 500);
        
        const filterValue = this.getAttribute('data-filter');
        
        // Enhanced transition effect for filtering
        productItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          const shouldShow = filterValue === 'all' || itemCategory === filterValue;
          
          // Apply staggered transition delay based on item index
          const index = Array.from(productItems).indexOf(item);
          item.style.transition = `all 0.4s ease ${index * 0.05}s`;
          
          if (shouldShow) {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.display = 'block';
            
            // Force reflow before applying transitions
            void item.offsetWidth;
            
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  };
  
  // Enhanced testimonial carousel with smooth transitions
  const setupTestimonials = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentIndex = 0;
    let autoplayInterval;
    
    const updateTestimonial = (newIndex) => {
      // Add exit animation to current testimonial
      testimonials[currentIndex].classList.add('exit');
      dots[currentIndex].classList.remove('active');
      
      // After exit animation completes, update active class
      setTimeout(() => {
        testimonials[currentIndex].classList.remove('active', 'exit');
        currentIndex = newIndex;
        
        // Add entrance animation to new testimonial
        testimonials[currentIndex].classList.add('active', 'entrance');
        dots[currentIndex].classList.add('active');
        
        // Remove entrance class after animation completes
        setTimeout(() => {
          testimonials[currentIndex].classList.remove('entrance');
        }, 600);
      }, 600);
    };
    
    // Start autoplay
    const startAutoplay = () => {
      autoplayInterval = setInterval(() => {
        const newIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(newIndex);
      }, 6000);
    };
    
    // Add event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Only change if not already on this testimonial
        if (index !== currentIndex) {
          // Clear autoplay interval
          clearInterval(autoplayInterval);
          updateTestimonial(index);
          // Restart autoplay
          startAutoplay();
        }
      });
    });
    
    // Add swipe support for mobile
    const testimonialContainer = document.querySelector('.testimonial-container');
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    testimonialContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, false);
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        // Swipe left - next testimonial
        clearInterval(autoplayInterval);
        updateTestimonial((currentIndex + 1) % testimonials.length);
        startAutoplay();
      }
      if (touchEndX > touchStartX + 50) {
        // Swipe right - previous testimonial
        clearInterval(autoplayInterval);
        updateTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
        startAutoplay();
      }
    };
    
    // Start autoplay on load
    startAutoplay();
  };
  
  // Add floating animation to elements
  const addFloatingAnimation = () => {
    const elementsToFloat = document.querySelectorAll('.team img, .team1 img');
    
    elementsToFloat.forEach((element, index) => {
      // Add staggered floating animation to elements
      element.style.animation = `float 4s ease-in-out ${index * 0.3}s infinite`;
    });
  };
  
  // Animated scroll down indicator for hero section
  const addScrollIndicator = () => {
    const heroSection = document.querySelector('.back');
    
    if (heroSection) {
      const scrollIndicator = document.createElement('div');
      scrollIndicator.className = 'scroll-indicator';
      scrollIndicator.innerHTML = '<div class="scroll-arrow"></div>';
      
      heroSection.appendChild(scrollIndicator);
      
      scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
          window.scrollTo({
            top: aboutSection.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
      
      // Hide scroll indicator when scrolled down
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '1';
        }
      });
    }
  };
  
  // Enhanced form interaction with animated feedback
  const enhanceContactForm = () => {
    const form = document.getElementById('form');
    const inputs = form ? form.querySelectorAll('input, textarea') : [];
    
    inputs.forEach(input => {
      // Add focus effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          this.parentElement.classList.remove('input-focused');
        }
      });
      
      // Add "filled" class when input has value
      input.addEventListener('input', function() {
        if (this.value !== '') {
          this.classList.add('filled');
        } else {
          this.classList.remove('filled');
        }
      });
    });
    
    // Enhanced form submission with success animation
    if (form) {
      form.addEventListener('submit', function(e) {
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Add success animation
        submitButton.classList.add('success');
        submitButton.innerHTML = '<span class="check-icon">✓</span> Sent!';
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitButton.classList.remove('success');
          submitButton.innerHTML = 'Send Message';
        }, 3000);
      });
    }
  };
  
  // Initialize 3D tilt effect for product cards
  const initTiltEffect = () => {
    const cards = document.querySelectorAll('.team, .team1');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const cardRect = this.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate tilt values (limited to 10 degrees)
        const tiltX = (mouseY / (cardRect.height / 2)) * 5;
        const tiltY = -(mouseX / (cardRect.width / 2)) * 5;
        
        // Apply transformation
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        
        // Add shine effect
        const shine = this.querySelector('.shine') || document.createElement('div');
        if (!this.querySelector('.shine')) {
          shine.className = 'shine';
          this.appendChild(shine);
        }
        
        // Calculate position of shine effect
        const shineX = (e.clientX - cardRect.left) / cardRect.width * 100;
        const shineY = (e.clientY - cardRect.top) / cardRect.height * 100;
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)`;
      });
      
      card.addEventListener('mouseleave', function() {
        // Reset transformation
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        
        // Remove shine effect
        const shine = this.querySelector('.shine');
        if (shine) {
          shine.remove();
        }
      });
    });
  };
  
  // Animate sections on scroll
  const animateSectionsOnScroll = () => {
    const sections = document.querySelectorAll('section, .details, .footer');
    
    const animateSection = () => {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85 && !section.classList.contains('animated')) {
          section.classList.add('animated');
          
          // Animate children with staggered delay
          const elements = section.querySelectorAll('.team, .team1, h2, p, .counter-item');
          elements.forEach((el, index) => {
            el.style.transitionDelay = `${0.1 + (index * 0.1)}s`;
            el.classList.add('fade-in');
          });
        }
      });
    };
    
    window.addEventListener('scroll', animateSection);
    animateSection(); // Check on initial load
  };
  
  // Initialize all features
  setupCounterAnimation();
  setupProductFilters();
  setupTestimonials();
  addFloatingAnimation();
  addScrollIndicator();
  enhanceContactForm();
  initTiltEffect();
  animateSectionsOnScroll();
  
  // Form submission spinner with animation
  const form = document.getElementById('form');
  const spinner = document.querySelector('.spinner');
  
  if (form && spinner) {
    form.addEventListener('submit', function() {
      spinner.style.display = 'block';
      spinner.classList.add('spin-animation');
      
      // Hide spinner after submission is complete
      setTimeout(() => {
        spinner.style.display = 'none';
        spinner.classList.remove('spin-animation');
      }, 3000);
    });
  }
  
  // Add particle background to hero section
  const addParticleEffect = () => {
    const heroSection = document.querySelector('.back');
    
    if (heroSection) {
      const particleContainer = document.createElement('div');
      particleContainer.className = 'particles-container';
      
      // Create particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 6 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 10 + 10;
        particle.style.animation = `float ${duration}s linear infinite`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 10}s`;
        
        particleContainer.appendChild(particle);
      }
      
      // Insert before overlay to not interfere with clicks
      const overlay = heroSection.querySelector('.overlay');
      heroSection.insertBefore(particleContainer, overlay);
    }
  };
  
  // Call particle effect
  addParticleEffect();
});