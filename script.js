document.addEventListener('DOMContentLoaded', function() {
  // Initialize the map
  var map = L.map('map', {
    center: [42.1354, 24.7453],
    zoom: 5,
    zoomControl: false
  });

  L.control.zoom({
    position: 'topright'
  }).addTo(map);

  setTimeout(function() {
    map.invalidateSize();
    map.setView([42.1354, 24.7453], 5, {
      animate: true,
      duration: 1
    });
  }, 400);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  var pulsingIcon = L.divIcon({
    className: 'leaflet-pulsing-marker',
    iconSize: [10, 10]
  });

  var marker = L.marker([42.1354, 24.7453], {icon: pulsingIcon}).addTo(map)
    .bindPopup('Plovdiv, Bulgaria')
    .openPopup();
  // Initialize particles.js
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 180,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#4CAF50"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.6,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#4CAF50",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 3,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });

  // Dark/Light theme toggle
  const themeSwitch = document.getElementById('checkbox');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      themeSwitch.checked = true;
    }
  }

  themeSwitch.addEventListener('change', function() {
    if (this.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });

  // Typing animation
  const typedTextSpan = document.querySelector('.typed-text');
  const cursorSpan = document.querySelector('.cursor');

  const textArray = ['Web Developer', 'Drupal Lover', 'Football Lover'];
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 2000;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove('typing');
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }

  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // Sticky header
  const header = document.querySelector('header');
  const scrollToTop = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
      scrollToTop.classList.add('active');
    } else {
      header.classList.remove('sticky');
      scrollToTop.classList.remove('active');
    }
  });

  // Scroll to top
  scrollToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Filter projects
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.querySelector('.projects-grid');
  const projectCards = document.querySelectorAll('.project-card');
  let expandedCard = null;
  let currentFilter = 'all';
  
  // Pagination variables
  const projectsPerPage = 6;
  let currentPage = 1;
  
  // Create pagination container
  const paginationContainer = document.createElement('div');
  paginationContainer.className = 'pagination-container';
  projectsGrid.parentNode.insertBefore(paginationContainer, projectsGrid.nextSibling);

  // Initialize pagination
  function initPagination() {
    updatePagination();
    displayProjects();
  }
  
  // Update pagination based on current filter
  function updatePagination() {
    const filteredCards = Array.from(projectCards).filter(card => {
      return currentFilter === 'all' || card.dataset.category === currentFilter;
    });
    
    const totalPages = Math.ceil(filteredCards.length / projectsPerPage);
    paginationContainer.innerHTML = '';
    
    if (totalPages <= 1) {
      return;
    }
    
    // Create previous button
    if (currentPage > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'pagination-btn';
      prevBtn.textContent = 'Prev';
      prevBtn.addEventListener('click', () => {
        currentPage--;
        displayProjects();
        updatePagination();
      });
      paginationContainer.appendChild(prevBtn);
    }
    
    // Create page number buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = 'pagination-btn' + (i === currentPage ? ' active' : '');
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        displayProjects();
        updatePagination();
      });
      paginationContainer.appendChild(pageBtn);
    }
    
    // Create next button
    if (currentPage < totalPages) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'pagination-btn';
      nextBtn.textContent = 'Next';
      nextBtn.addEventListener('click', () => {
        currentPage++;
        displayProjects();
        updatePagination();
      });
      paginationContainer.appendChild(nextBtn);
    }
  }
  
  // Display projects based on current filter and page
  function displayProjects() {
    // If there's an expanded card, collapse it
    if (expandedCard) {
      expandedCard.classList.remove('expanded');
      expandedCard = null;
    }
    
    const filteredCards = Array.from(projectCards).filter(card => {
      return currentFilter === 'all' || card.dataset.category === currentFilter;
    });
    
    const startIndex = (currentPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    
    projectCards.forEach(card => {
      card.style.display = 'none';
    });
    
    filteredCards.forEach((card, index) => {
      if (index >= startIndex && index < endIndex) {
        card.style.display = '';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      currentFilter = this.getAttribute('data-filter');
      currentPage = 1;
      
      // Update pagination and display projects
      updatePagination();
      displayProjects();
    });
  });

  // Initial setup
  initPagination();
  
  // Initial setup of all project cards
  projectCards.forEach(card => {
    // Add close button to each card
    const closeBtn = document.createElement('div');
    closeBtn.className = 'close-project';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    card.appendChild(closeBtn);

    // Add expanded content section
    const expandedContent = document.createElement('div');
    expandedContent.className = 'project-expanded-content';

    // Create unique content for each project based on its title
    const projectName = card.querySelector('.project-details h3').textContent;
    let projectDescription = '';
    let techStack = '';

    // Create unique descriptions for each project
    switch (projectName) {
      case 'Fishing Website':
        projectDescription = 'A web-based platform for fishing enthusiasts to discover fishing spots, explore gear options, and share experiences with the community. The website provides spot information, comments while also featuring a gear catalog.';
        techStack = `
          <span class="project-tech">React</span>
          <span class="project-tech">SCSS with BEM methodology</span>
          <span class="project-tech">React Context API</span>
          <span class="project-tech">React Router v6</span>
          <span class="project-tech">Axios</span>
          <span class="project-tech">TypeScript</span>
        `;
        break;
      case 'Online Wallet App':
        projectDescription = 'A web-based e-wallet application designed for seamless online shopping. It integrates user authentication, product management, a shopping cart, and admin functionalities to enhance the user experience.';
        techStack = `
          <span class="project-tech">React.js</span>
          <span class="project-tech">React Router</span>
          <span class="project-tech">Vite</span>
          <span class="project-tech">Node.js</span>
          <span class="project-tech">Chart.js</span>
          <span class="project-tech">CSS</span>
        `;
        break;
      case 'PM Dashboard':
        projectDescription = 'Project Management Dashboard is a web-based application designed for efficient project, task, and team management. Built with Vue.js 3 and Tailwind CSS, it provides an intuitive interface for organizing work and tracking progress. This project focuses on usability, task organization, and real-time insights, offering a streamlined project management experience.';
        techStack = `
          <span class="project-tech">Vue.js 3</span>
          <span class="project-tech">Tailwind CSS</span>
          <span class="project-tech">Pinia</span>
          <span class="project-tech">Vue Router</span>
          <span class="project-tech">Vue Draggable</span>
        `;
        break;
      case 'Vue.js planner':
        projectDescription = 'UniProject Planner is a Vue.js 3 application designed for university students to manage and track their academic projects. It helps users organize assignments, mark progress, and filter tasks based on completion status.';
        techStack = `
          <span class="project-tech">Vue.js 3</span>
          <span class="project-tech">Vue Router</span>
          <span class="project-tech">JSON Server</span>
          <span class="project-tech">CSS</span>
        `;
        break;
      case 'Custom Drupal Module':
        projectDescription = 'Norris Import Module is a Drupal 10 module that imports Chuck Norris jokes from the Chuck Norris API into Drupal nodes. It allows users to configure API settings and map imported content to specific fields.';
        techStack = `
          <span class="project-tech">Drupal 10</span>
          <span class="project-tech">PHP 8.x</span>
          <span class="project-tech">REST API</span>
          <span class="project-tech">Node Module</span>
        `;
        break;
      case 'Android Adressbook':
        projectDescription = 'Addressbook developed with Android Studio (and Java). You can login and sign up, add new contact, edit existing ones, and delete. For database i have used SQlite3.';
        techStack = `
          <span class="project-tech">Java</span>
          <span class="project-tech">SQLite</span>
        `;
        break;
      case 'Course Academy':
        projectDescription = 'Course Academy is an university project developed using Node.JS as a backend and AngularJS as a frontend. There are couses and users, login and register system.';
        techStack = `
          <span class="project-tech">AngularJS</span>
          <span class="project-tech">TypeScript</span>
          <span class="project-tech">HTML</span>
          <span class="project-tech">CSS</span>
        `;
        break;
      case 'Paint Application':
        projectDescription = 'Paint application developed with C# WinForms. Its provides a lot of functionalities, such as open file, save, delete, place picture, select and cut, paint, choose color, choose figure, showing coordinates, choose sharpness of line.';
        techStack = `
          <span class="project-tech">C#</span>
          <span class="project-tech">WinForms</span>
        `;
        break;
      case 'Movie Catalog':
        projectDescription = 'A movie catalog is a project made with ASP.Net MVC (NOTE!Entity Framework) and MySQL for a database, connected to Visual Studio. The system provides oppurtunities to search movie, filter by author, see details, add, edit, remove movie.';
        techStack = `
          <span class="project-tech">ASP.NET</span>
          <span class="project-tech">Entity Framework</span>
          <span class="project-tech">C#</span>
          <span class="project-tech">MYSQL</span>
          <span class="project-tech">JavaScript</span>
          <span class="project-tech">HTML</span>

        `;
        break;
      case 'GUI Java Store':
        projectDescription = 'Store system for University Course. You can select, buy, choose quantity, disselect, look your order. Its made with Java Spring, GUI, local database, OOP principles.';
        techStack = `
          <span class="project-tech">Java</span>
        `;
        break;
      case 'Photo Studio':
        projectDescription = 'A fun, subscription service for photo things lovers with a sign-up modal. Built using HTML, CSS & Bootstrap.';
        techStack = `
          <span class="project-tech">HTML</span>
          <span class="project-tech">CSS</span>
          <span class="project-tech">Bootstrap</span>
        `;
        break;
      default:
        projectDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras porttitor metus non viverra volutpat. Integer dignissim sapien in eros tempus pulvinar.';
        techStack = `
          <span class="project-tech">HTML</span>
          <span class="project-tech">CSS</span>
          <span class="project-tech">JavaScript</span>
        `;
    }

    expandedContent.innerHTML = `
      <h3>About this Project</h3>
      <p>${projectDescription}</p>
      <h3>Technologies Used</h3>
      <div class="project-tech-stack">
        ${techStack}
      </div>
    `;
    card.appendChild(expandedContent);

    // Add click event to expand card
    card.addEventListener('click', function(e) {
      // Don't expand if clicking the close button
      if (e.target.closest('.close-project')) {
        e.stopPropagation();
        this.classList.remove('expanded');
        expandedCard = null;
        return;
      }

      // If this card is already expanded, do nothing
      if (this.classList.contains('expanded')) {
        return;
      }

      // If another card is expanded, collapse it first
      if (expandedCard) {
        expandedCard.classList.remove('expanded');
      }

      // Expand this card
      this.classList.add('expanded');
      expandedCard = this;

      // Scroll to the expanded card
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    });

    // Prevent event propagation when clicking links inside project cards
    const projectLinks = card.querySelectorAll('.project-links a');
    projectLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });

  // Form validation
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      let isValid = true;

      // Simple validation
      if (name.value.trim() === '') {
        document.querySelector('#name + .form-error').textContent = 'Name is required';
        isValid = false;
      } else {
        document.querySelector('#name + .form-error').textContent = '';
      }

      if (email.value.trim() === '') {
        document.querySelector('#email + .form-error').textContent = 'Email is required';
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        document.querySelector('#email + .form-error').textContent = 'Please enter a valid email';
        isValid = false;
      } else {
        document.querySelector('#email + .form-error').textContent = '';
      }

      if (subject.value.trim() === '') {
        document.querySelector('#subject + .form-error').textContent = 'Subject is required';
        isValid = false;
      } else {
        document.querySelector('#subject + .form-error').textContent = '';
      }

      if (message.value.trim() === '') {
        document.querySelector('#message + .form-error').textContent = 'Message is required';
        isValid = false;
      } else {
        document.querySelector('#message + .form-error').textContent = '';
      }

      if (isValid) {
        // Here you would typically send the form data to a server
        alert('Message sent successfully!');
        contactForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Animate skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  const circleFills = document.querySelectorAll('.circle-fill');

  function animateSkillBars() {
    skillBars.forEach(bar => {
      const progress = bar.getAttribute('data-progress');
      setTimeout(() => {
        bar.style.width = progress + '%';
      }, 300);
    });

    circleFills.forEach(circle => {
      const progress = circle.closest('.circle-progress').getAttribute('data-progress');
      const circumference = 408; // 2 * π * r, where r = 65
      const offset = circumference - (progress / 100) * circumference;
      setTimeout(() => {
        circle.style.strokeDashoffset = offset;
      }, 300);
    });
  }

  // Animate elements when scrolled into view
  const animateElements = document.querySelectorAll('[data-aos]');

  // Specifically observe the skills section
  const skillsSection = document.getElementById('skills');

  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Create an intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');

        // Animate skill bars when Skills section is in view
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);

  // Observe all animate elements
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Make sure to observe the skills section even if it doesn't have data-aos
  if (skillsSection && !skillsSection.hasAttribute('data-aos')) {
    observer.observe(skillsSection);
  }

  // Call animateSkillBars on page load after a short delay to ensure DOM is ready
  setTimeout(animateSkillBars, 1000);
});