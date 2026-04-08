<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rent Car - Blueprint Rwanda</title>
  <link rel="stylesheet" href="style.css">
  <style>
    html, body {
      height: 100%;
      min-height: 100vh;
      width: 100vw;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      margin: 0;
      font-family: 'Segoe UI', Arial, sans-serif;
      background: #f5e9da;
      color: #4e2e0e;
      width: 100vw;
      overflow-x: hidden;
    }
    .hero {
      background-image: url('imigongo.png');
    }

    /* Modal styles */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(78, 46, 14, 0.6);
      backdrop-filter: blur(5px);
    }
    .modal-content {
      background-color: #fff8e7;
      margin: 5% auto;
      padding: 25px;
      border: 1px solid #888;
      width: 80%;
      max-width: 900px;
      border-radius: 12px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
      animation-name: animatetop;
      animation-duration: 0.4s;
      color: #4e2e0e;
    }

    @keyframes animatetop {
      from {transform: translateY(-50px); opacity: 0}
      to {transform: translateY(0); opacity: 1}
    }

    .close-button {
      color: #aaa;
      float: right;
      font-size: 32px;
      font-weight: bold;
      line-height: 1;
      transition: color 0.2s;
    }
    .close-button:hover,
    .close-button:focus {
      color: #4e2e0e;
      text-decoration: none;
      cursor: pointer;
    }

    .modal-body {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 25px;
      margin-top: 1rem;
    }

    .slideshow-container {
      position: relative;
      width: 100%;
      margin: auto;
    }

    .slides-wrapper img {
      width: 100%;
      border-radius: 8px;
      height: 300px;
      object-fit: cover;
    }

    .prev, .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      padding: 16px;
      margin-top: -22px;
      color: white;
      font-weight: bold;
      font-size: 20px;
      transition: 0.3s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
      background-color: rgba(0,0,0,0.4);
    }

    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    .prev:hover, .next:hover {
      background-color: rgba(0,0,0,0.8);
    }
    
    .dot-container {
      text-align: center;
      padding-top: 10px;
    }

    .dot {
      cursor: pointer;
      height: 12px;
      width: 12px;
      margin: 0 4px;
      background-color: #d3c8b9;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.3s ease;
    }
    .active, .dot:hover {
      background-color: #a0522d;
    }

    .modal-details h2 {
      color: #a0522d;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }
    
    .modal-details h3 {
        color: #a0522d;
        border-bottom: 1px solid #d3c8b9;
        padding-bottom: 0.5rem;
        margin-top: 1.5rem;
        margin-bottom: 1rem;
    }

    .modal-specs {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .modal-specs li {
        background-color: #f5e9da;
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 0.95em;
        border: 1px solid #e9dccf;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .modal-specs li svg {
        width: 20px;
        height: 20px;
        stroke: #a0522d;
        flex-shrink: 0;
    }

    .book-now-btn {
        background: #a0522d;
        color: #fff8e7;
        border: none;
        border-radius: 20px;
        padding: 0.8rem 2.2rem;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.2s;
        margin-top: 1.5rem;
        width: 100%;
        text-align: center;
    }

    .book-now-btn:hover {
        background: #7c3f17;
    }

    @media (max-width: 800px) {
      .featured-card {
        flex-direction: column;
        align-items: flex-start;
        width: 98vw;
        max-width: 98vw;
      }
      .featured-card img {
        width: 100%;
        height: 180px;
        border-radius: 18px 18px 0 0;
      }
      .featured-info {
        padding: 1.2rem 1rem;
      }
      .listing-grid {
        width: 99vw;
        gap: 1.2rem;
      }
    }

    @media (max-width: 768px) {
      .modal-body {
        grid-template-columns: 1fr;
      }
      .modal-content {
        width: 95%;
        margin: 10% auto;
        padding: 20px;
      }
    }

    main {
      flex: 1 0 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100vw;
      margin: 0;
      padding: 0 0 2rem 0;
    }
    .footer-container {
        width: 100%;
        background: #4e2e0e;
        color: #fff8e7;
        padding: 3rem 5vw;
        margin-top: auto;
    }
    .footer-main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 2.5rem;
        margin-bottom: 2rem;
    }
    .footer-column {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
    }
    .footer-logo-area .nav-logo {
        font-size: 1.5rem;
        gap: 0.8rem;
        margin-bottom: 0.5rem;
    }
    .footer-desc {
        font-size: 0.95rem;
        color: #ffe4b5;
        line-height: 1.6;
        max-width: 300px;
    }
    .footer-social {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
    .footer-social a {
        color: #fff8e7;
        transition: color 0.2s, transform 0.2s;
    }
    .footer-social a:hover {
        color: #ffe4b5;
        transform: translateY(-2px);
    }
    .footer-links-title {
        font-size: 1.15rem;
        font-weight: 600;
        color: #ffe4b5;
        margin-bottom: 0.7rem;
        letter-spacing: 0.5px;
    }
    .footer-column a {
        color: #fff8e7;
        text-decoration: none;
        transition: color 0.2s;
        width: fit-content;
    }
    .footer-column a:hover {
        color: #ffe4b5;
    }
    .footer-contact-area p {
        margin: 0;
        line-height: 1.6;
    }
    .footer-copyright {
        text-align: center;
        color: #ffe4b5;
        font-size: 0.9rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 228, 181, 0.2);
    }
    @media (max-width: 768px) {
        .footer-main {
            grid-template-columns: 1fr 1fr;
        }
        .footer-logo-area, .footer-contact-area {
            grid-column: 1 / -1;
        }
    }
    @media (max-width: 480px) {
        .footer-main {
            grid-template-columns: 1fr;
            text-align: center;
        }
        .footer-column {
            align-items: center;
        }
        .footer-desc {
            text-align: center;
        }
    }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="nav-logo">
      <img src="Title Logo.png" alt="Logo" />
      <span>Blueprint Rwanda</span>
    </div>
    <ul class="nav-menu">
      <li><a href="#">Car Rent</a></li>
      <li><a href="visit.php">Place to Visit</a></li>
      <li><a href="accommodation.php">Accommodation</a></li>
      <li class="nav-ctar"><a href="verification.php">Account</a></li>
    </ul>
    <button class="hamburger" aria-label="Toggle menu">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>
  </nav>

  <section class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>Find the Perfect Car for Your Journey</h1>
      <p>Choose from a wide range of vehicles to explore Rwanda comfortably and safely.</p>
      <div class="search-bar-container">
        <input type="text" class="search-bar" placeholder="Search by car type, location, or feature...">
        <button class="search-btn" aria-label="Search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="7" stroke="#a0522d" stroke-width="2" fill="none"/>
            <line x1="16.3" y1="16.3" x2="21" y2="21" stroke="#a0522d" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  </section>

  <main>
    <div class="featured-card">
      <img src="Car.png" alt="Featured Car">
      <div class="featured-info">
        <h2>Top Pick: Toyota Land Cruiser</h2>
        <p>Experience Rwanda's diverse landscapes with the comfort and reliability of our most popular SUV. Ideal for safaris, family trips, and business travel.</p>
      </div>
    </div>

    <h2 class="section-title">Available Cars for Rent</h2>
    <div class="listing-grid">
      <div class="listing-card"
        data-title="Toyota RAV4"
        data-price="$60/day"
        data-images="Car.png,Visit.png,Accommodation.png"
        data-specs='{"Transmission": "Automatic", "Seats": "5", "Fuel": "Petrol", "Mileage": "Unlimited"}'
        data-description="A versatile and reliable SUV, the Toyota RAV4 is perfect for both city driving and off-road adventures in Rwanda. It offers a comfortable ride, spacious interior, and excellent fuel efficiency.">
        <img src="Car.png" alt="Toyota RAV4">
        <div class="listing-info">
          <div class="listing-title">Toyota RAV4</div>
          <div class="listing-meta">$60/day • Automatic • 5 seats</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Suzuki Swift"
        data-price="$40/day"
        data-images="Car.png,Visit.png,Accommodation.png"
        data-specs='{"Transmission": "Manual", "Seats": "4", "Fuel": "Petrol", "Mileage": "Unlimited"}'
        data-description="The Suzuki Swift is a compact and economical choice for navigating city streets. It's easy to park, fuel-efficient, and offers a surprisingly zippy performance. Ideal for solo travelers or couples.">
        <img src="Car.png" alt="Suzuki Swift">
        <div class="listing-info">
          <div class="listing-title">Suzuki Swift</div>
          <div class="listing-meta">$40/day • Manual • 4 seats</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Hyundai Tucson"
        data-price="$55/day"
        data-images="Car.png,Visit.png,Accommodation.png"
        data-specs='{"Transmission": "Automatic", "Seats": "5", "Fuel": "Diesel", "Mileage": "Unlimited"}'
        data-description="Stylish and comfortable, the Hyundai Tucson is a modern SUV packed with features. Enjoy a smooth ride, advanced safety systems, and a premium interior. Great for families and business travelers.">
        <img src="Car.png" alt="Hyundai Tucson">
        <div class="listing-info">
          <div class="listing-title">Hyundai Tucson</div>
          <div class="listing-meta">$55/day • Automatic • 5 seats</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Toyota Hiace Minibus"
        data-price="$90/day"
        data-images="Car.png,Visit.png,Accommodation.png"
        data-specs='{"Transmission": "Manual", "Seats": "15", "Fuel": "Diesel", "Mileage": "Unlimited"}'
        data-description="Traveling with a large group? The Toyota Hiace Minibus is the perfect solution. With seating for up to 15 people, it offers ample space, reliability, and comfort for group tours, airport transfers, or family outings.">
        <img src="Car.png" alt="Toyota Hiace Minibus">
        <div class="listing-info">
          <div class="listing-title">Toyota Hiace Minibus</div>
          <div class="listing-meta">$90/day • Manual • 15 seats</div>
        </div>
      </div>
    </div>
  </main>

  <div id="detailsModal" class="modal">
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <div class="modal-body">
        <div class="slideshow-container">
          <div class="slides-wrapper">
            <!-- Slides will be injected here by JS -->
          </div>
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>
          <div class="dot-container" style="text-align:center">
            <!-- Dots will be injected here by JS -->
          </div>
        </div>
        <div class="modal-details">
          <h2 id="modalTitle"></h2>
          <p id="modalPrice"></p>
          <p id="modalDescription"></p>
          <h3>Specifications</h3>
          <ul id="modalSpecs" class="modal-specs"></ul>
          <button class="book-now-btn">Book Now</button>
        </div>
      </div>
    </div>
  </div>

  <footer>
    <div class="footer-container">
        <div class="footer-main">
            <div class="footer-column footer-logo-area">
                <div class="nav-logo">
                    <img src="Title Logo.png" alt="Blueprint Rwanda Logo">
                    <span>Blueprint Rwanda</span>
                </div>
                <p class="footer-desc">Your trusted partner for discovering the best of Rwanda. Unforgettable journeys start here.</p>
                <div class="footer-social">
                    <a href="#" title="Instagram" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="17" cy="7" r="1.2" fill="currentColor"/></svg></a>
                    <a href="#" title="Twitter" aria-label="Twitter"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872.952-3.745.952-5.5 0 5.542 3.654 12.232 2.454 15-2-1.186 1.06-2.527 1.714-4 2 .027 4.103 2.986 6.845 7 6H22v-2c-.657.073-1.314.13-2 .16-2.09.1-4.056.12-6-1 .947-.504 1.838-1.18 2.5-2 .546-.66.974-1.412 1.25-2.25 .275-.837.498-1.724.5-2.653V4.01z" fill="currentColor"/></svg></a>
                    <a href="#" title="Facebook" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" fill="currentColor"/></svg></a>
                </div>
            </div>
            <div class="footer-column">
                <h3 class="footer-links-title">Services</h3>
                <a href="accommodation.php">Accommodation</a>
                <a href="rentcar.php">Car Rentals</a>
                <a href="visit.php">Tours & Experiences</a>
                <a href="#">Group Bookings</a>
            </div>
            <div class="footer-column">
                <h3 class="footer-links-title">About Us</h3>
                <a href="#">Our Story</a>
                <a href="#">Testimonials</a>
                <a href="#">Careers</a>
                <a href="#">Press</a>
            </div>
            <div class="footer-column footer-contact-area">
                <h3 class="footer-links-title">Contact Us</h3>
                <a href="mailto:info@blueprintrwanda.com">info@blueprintrwanda.com</a>
                <a href="tel:+250788123456">+250 788 123 456</a>
                <p>KG 123 St, Kigali, Rwanda</p>
            </div>
        </div>
        <div class="footer-copyright">
            &copy; 2025 Blueprint Rwanda. All Rights Reserved.
        </div>
    </div>
  </footer>
  <script>
    const modal = document.getElementById("detailsModal");
    const listingCards = document.querySelectorAll(".listing-card");
    const closeBtn = document.querySelector(".close-button");

    let slideIndex = 1;

    function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slides.length > 0) {
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
      }
    }

    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    const specIcons = {
        Seats: '<svg fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M4 18v-2.393a2 2 0 01.628-1.46l5.018-5.3a2 2 0 012.708 0l5.018 5.3A2 2 0 0118.001 15.6V18M4 18h16v-2a2 2 0 00-2-2h-3.333M4 18v-2a2 2 0 012-2h3.333m-2-4h.01M15 12h.01"/></svg>',
        Transmission: '<svg fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9l-3 3 3 3m12-6l3 3-3 3M10 4l-4 16M14 4l4 16"/></svg>',
        Fuel: '<svg fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M8 6h8v10a2 2 0 01-2 2H10a2 2 0 01-2-2V6zM6 6h12M9 3v3"/></svg>',
        Mileage: '<svg fill="none" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
    };

    listingCards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.dataset.title;
        const price = card.dataset.price;
        const images = card.dataset.images.split(',');
        const description = card.dataset.description;
        const specs = JSON.parse(card.dataset.specs);
        
        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalPrice").textContent = price;
        document.getElementById("modalDescription").textContent = description;
        
        const slidesWrapper = modal.querySelector('.slides-wrapper');
        const dotsContainer = modal.querySelector('.dot-container');
        slidesWrapper.innerHTML = '';
        dotsContainer.innerHTML = '';

        images.forEach((img, index) => {
          slidesWrapper.innerHTML += `<div class="mySlides"><img src="${img}" alt="${title}"></div>`;
          dotsContainer.innerHTML += `<span class="dot" onclick="currentSlide(${index + 1})"></span>`;
        });
        
        const specsList = document.getElementById("modalSpecs");
        specsList.innerHTML = '';
        for (const [key, value] of Object.entries(specs)) {
            const li = document.createElement('li');
            const icon = specIcons[key] || '';
            li.innerHTML = `${icon}<strong>${key}:</strong> ${value}`;
            specsList.appendChild(li);
        }

        modal.style.display = "block";
        slideIndex = 1;
        showSlides(slideIndex);
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });

    // Add keyboard accessibility
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
  </script>
</body>
</html> 