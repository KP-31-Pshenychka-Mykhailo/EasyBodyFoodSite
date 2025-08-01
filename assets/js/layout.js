document.addEventListener('DOMContentLoaded', function() {

  const headerElement = document.getElementById('header');
  if (headerElement && headerElement.innerHTML.trim() === '') {
  
    // Пробуем разные пути для header
    fetch('partials/header.html')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then(html => {
        document.getElementById('header').innerHTML = html;
        // Подключаем header.js после вставки header
        const script = document.createElement('script');
        script.src = 'assets/js/header.js';
        document.body.appendChild(script);
        setTimeout(() => {
          setActiveNav();
          setupBurgerMenu();
          // Принудительно применяем стили
          const headerElement = document.querySelector('.main-header');
          if (headerElement) {
            headerElement.style.display = 'flex';
            headerElement.style.alignItems = 'center';
            headerElement.style.justifyContent = 'space-between';
            headerElement.style.padding = '0 16px';
            headerElement.style.height = '64px';
          }
        }, 100);
      })
      .catch(error => {
        // Если не получилось, пробуем с ../partials/
        fetch('../partials/header.html')
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.text();
          })
          .then(html => {
            document.getElementById('header').innerHTML = html;
            // Подключаем header.js после вставки header
            const script = document.createElement('script');
            script.src = '../assets/js/header.js';
            document.body.appendChild(script);
            setTimeout(() => {
              setActiveNav();
              setupBurgerMenu();
              // Принудительно применяем стили
              const headerElement = document.querySelector('.main-header');
              if (headerElement) {
                headerElement.style.display = 'flex';
                headerElement.style.alignItems = 'center';
                headerElement.style.justifyContent = 'space-between';
                headerElement.style.padding = '0 16px';
                headerElement.style.height = '64px';
              }
            }, 100);
          })
          .catch(error => {
            insertHeaderDirectly();
          });
      });
  } else {
    setActiveNav();
  }
    
  // Пробуем разные пути для footer
  fetch('partials/footer.html')
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.text();
    })
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(error => {
      // Если не получилось, пробуем с ../partials/
      fetch('../partials/footer.html')
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.text();
        })
        .then(html => {
          document.getElementById('footer').innerHTML = html;
        })
        .catch(error => {
          console.error('Не удалось загрузить footer');
        });
    });

  function insertHeaderDirectly() {
    const headerHTML = `
      <header class="main-header">
          <a href="index.html" class="logo-link">
              <img src="assets/img/logo.png" alt="Logo" class="logo">
          </a>
          <nav class="main-nav" id="mainNav">
              <a href="index.html">Головна</a>
              <a href="constructor.html">Конструктор меню</a>
              <a href="calculator.html">Калькулятор раціону</a>
              <a href="standart.html">Стандартне меню</a>
          </nav>
          <div class="header-actions">
              <a href="cart.html" class="icon-button basket-big">
                  <svg class="icon-img basket-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 6H21L20 14H7L6 6Z" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="9" cy="20" r="1" stroke="#4CAF50" stroke-width="2"/>
                      <circle cx="18" cy="20" r="1" stroke="#4CAF50" stroke-width="2"/>
                      <path d="M9 6V4C9 2.89543 9.89543 2 11 2H16C17.1046 2 18 2.89543 18 4V6" stroke="#4CAF50" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  0 <span class="currency">₴</span>
              </a>
              <a href="#" class="icon-button icon-button--wide" id="loginBtn">
                  <svg class="icon-img user-svg" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="4" stroke="#fff" stroke-width="2"/>
                      <path d="M4 20C4 16.6863 7.13401 14 12 14C16.866 14 20 16.6863 20 20" stroke="#fff" stroke-width="2"/>
                  </svg>
                  Вхід
              </a>
          </div>
          <button class="burger" id="burgerBtn" aria-label="Открыть меню">
            <span></span><span></span><span></span>
          </button>
      </header>
    `;
    document.getElementById('header').innerHTML = headerHTML;
    setTimeout(() => {
      setActiveNav();
      setupBurgerMenu();
    }, 100);
  }

  function setActiveNav() {
    const path = window.location.pathname.split('/').pop();
    
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
     
      const hrefFileName = href.split('/').pop();
      
     
      let isActive = false;
      
    
      if (hrefFileName === 'index.html' && (path === '' || path === '/' || path === 'index.html')) {
        isActive = true;
      }
     
      else if (hrefFileName === path) {
        isActive = true;
      }
      
      if (isActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  function setupBurgerMenu() {
    console.log('Setting up burger menu...');
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');
    console.log('Burger element:', burger);
    console.log('Nav element:', nav);
    if (!burger || !nav) {
      console.log('Burger or nav not found!');
      return;
    }
    burger.addEventListener('click', function(e) {
      console.log('Burger clicked!');
      burger.classList.toggle('active');
      nav.classList.toggle('open');
    });

    document.addEventListener('click', function(e) {
      if (window.innerWidth > 900) return;
      if (!nav.classList.contains('open')) return;
      if (!nav.contains(e.target) && e.target !== burger) {
        burger.classList.remove('active');
        nav.classList.remove('open');
      }
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        burger.classList.remove('active');
        nav.classList.remove('open');
      }
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1000) {
        burger.classList.remove('active');
        nav.classList.remove('open');
      }
    });
    console.log('Burger menu setup complete!');
  }

  // --- Footer toggle contact ---
  document.addEventListener('click', function(e) {
    const toggleBtn = document.getElementById('footerToggleBtn');
    const popup = document.getElementById('footerPopupSocials');
    if (!toggleBtn || !popup) return;
    if (toggleBtn.contains(e.target)) {
      popup.classList.toggle('open');
      toggleBtn.classList.toggle('active');
    } else if (!popup.contains(e.target)) {
      popup.classList.remove('open');
      toggleBtn.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const popup = document.getElementById('footerPopupSocials');
      const toggleBtn = document.getElementById('footerToggleBtn');
      if (popup && toggleBtn) {
        popup.classList.remove('open');
        toggleBtn.classList.remove('active');
      }
    }
  });
}); 