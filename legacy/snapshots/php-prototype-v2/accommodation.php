<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accommodation - Blueprint Rwanda</title>
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
      position: relative;
      background: url('imigongo.png') center/cover no-repeat;
      min-height: 80vh;
      height: 100vh;
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: rgba(160, 82, 45, 0.35);
      backdrop-filter: blur(2px);
    }
    .hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      color: #fff8e7;
    }
    .hero-content h1 {
      font-size: 2.3rem;
      margin-bottom: 0.5rem;
      letter-spacing: 1px;
    }
    .hero-content p {
      font-size: 1.1rem;
      margin-bottom: 1.2rem;
    }
    .search-bar-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      max-width: 420px;
      background: rgba(255,255,255,0.7);
      border-radius: 24px;
      box-shadow: 0 2px 8px rgba(160,82,45,0.10);
      padding: 0.3rem 0.5rem;
    }
    .search-bar {
      flex: 1;
      border: none;
      outline: none;
      padding: 0.7rem 1rem;
      border-radius: 20px 0 0 20px;
      font-size: 1rem;
      background: transparent;
    }
    .search-btn {
      border: none;
      background: none;
      color: #a0522d;
      font-size: 1.3rem;
      cursor: pointer;
      padding: 0 1rem;
    }
    .featured-card {
      display: flex;
      align-items: center;
      background: #fff8e7;
      border-radius: 18px;
      box-shadow: 0 4px 30px 0 rgba(31,38,135,0.12);
      width: 90vw;
      max-width: 1200px;
      margin: -60px auto 2.5rem auto;
      overflow: hidden;
      position: relative;
      min-height: 200px;
    }
    .featured-card img {
      width: 220px;
      height: 180px;
      object-fit: cover;
      border-radius: 18px 0 0 18px;
    }
    .featured-info {
      padding: 1.5rem 2rem;
    }
    .featured-info h2 {
      color: #a0522d;
      margin-bottom: 0.5rem;
    }
    .featured-info p {
      color: #4e2e0e;
      margin-bottom: 1rem;
    }
    .cta-btn {
      background: #a0522d;
      color: #fff8e7;
      border: none;
      border-radius: 20px;
      padding: 0.7rem 2rem;
      font-size: 1.1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.2s;
    }
    .cta-btn:hover {
      background: #7c3f17;
    }
    .section-title {
      text-align: center;
      color: #a0522d;
      margin: 2.5rem 0 1.5rem 0;
      font-size: 1.5rem;
      letter-spacing: 1px;
    }
    .listing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2.5rem;
      width: 95vw;
      max-width: 1300px;
      margin: 0 auto 2rem auto;
    }
    .listing-card {
      background: #fff8e7;
      border-radius: 14px;
      box-shadow: 0 2px 12px rgba(160,82,45,0.08);
      overflow: hidden;
      transition: transform 0.15s, box-shadow 0.15s;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 260px;
    }
    .listing-card:hover {
      transform: translateY(-6px) scale(1.03);
      box-shadow: 0 8px 32px rgba(160,82,45,0.13);
    }
    .listing-card img {
      width: 100%;
      height: 140px;
      object-fit: cover;
    }
    .listing-info {
      padding: 1rem;
      width: 100%;
      text-align: center;
    }
    .listing-title {
      font-weight: bold;
      color: #4e2e0e;
      margin-bottom: 0.3rem;
    }
    .listing-meta {
      color: #a0522d;
      font-size: 0.98rem;
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

    .modal-amenities {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }

    .modal-amenities li {
        background-color: #f5e9da;
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.9em;
        border: 1px solid #e9dccf;
    }

    #modalMap iframe {
        border-radius: 8px;
        width: 100%;
        height: 200px;
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
      <li><a href="#">Accommodation</a></li>
      <li><a href="visit.html">Place to Visit</a></li>
      <li><a href="rentcar.html">Car Rent</a></li>
      <li class="nav-ctar"><a href="account.html">Account</a></li>
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
      <h1>Find Your Perfect Stay in Rwanda</h1>
      <p>Discover unique places to stay, from cozy guesthouses to luxury hotels.</p>
      <div class="search-bar-container">
        <input type="text" class="search-bar" placeholder="Search by city, landmark, or property...">
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
      <img src="Accommodation.png" alt="Featured Accommodation">
      <div class="featured-info">
        <h2>Guest Favorite: Kigali City View Apartment</h2>
        <p>Enjoy breathtaking views of Kigali, modern amenities, and top-rated hospitality. Perfect for families and business travelers.</p>
      </div>
    </div>

    <h2 class="section-title">Available Accommodation</h2>
    <div class="listing-grid">
      <div class="listing-card"
        data-title="Room in Kigali"
        data-price="$50/night"
        data-rating="★4.92"
        data-images="Accommodation.png,imigongo.png,Blueprint Rwanda.png"
        data-description="A beautiful and cozy room in the heart of Kigali with a stunning view of the city. Perfect for solo travelers or couples seeking comfort and convenience. Enjoy easy access to local markets and restaurants."
        data-amenities="Wi-Fi,TV,Kitchen,Free parking,Air conditioning"
        data-map-embed='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127600.62713339089!2d30.00039474335937!3d-1.959265699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca441fca886c9%3A0x4f3dec99d721d743!2sKigali!5e0!3m2!1sen!2srw!4v1678886475902!5m2!1sen!2srw" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'>
        <img src="Accommodation.png" alt="Room in Kigali">
        <div class="listing-info">
          <div class="listing-title">Room in Kigali</div>
          <div class="listing-meta">$50/night • ★4.92</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Apartment in Musanze"
        data-price="$80/night"
        data-rating="★4.95"
        data-images="Visit.png,imigongo.png,Blueprint Rwanda.png"
        data-description="Spacious apartment near Volcanoes National Park. An ideal base for gorilla trekking adventures. Features a fully equipped kitchen and a balcony with mountain views."
        data-amenities="Wi-Fi,Kitchen,Free parking,Heating,Workspace"
        data-map-embed='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31915.22690494493!2d29.58980864335937!3d-1.501905800000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dc6e88a5b15b31%3A0x6b4f7b258a4747b3!2sMusanze!5e0!3m2!1sen!2srw!4v1678886591345!5m2!1sen!2srw" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'>
        <img src="Visit.png" alt="Apartment in Musanze">
        <div class="listing-info">
          <div class="listing-title">Apartment in Musanze</div>
          <div class="listing-meta">$80/night • ★4.95</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Suite in Gisenyi"
        data-price="$120/night"
        data-rating="★5.0"
        data-images="Car.png,imigongo.png,Blueprint Rwanda.png"
        data-description="Luxurious suite with stunning views of Lake Kivu. Relax on the private beach, enjoy water sports, or simply unwind in style. The suite includes a king-sized bed and a spa-like bathroom."
        data-amenities="Wi-Fi,Pool,Beach access,Hot tub,Breakfast included"
        data-map-embed='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15949.496515869446!2d29.251307643359373!3d-1.6989467000000018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dd0159f65e2313%3A0x82f05a303428989a!2sGisenyi!5e0!3m2!1sen!2srw!4v1678886629731!5m2!1sen!2srw" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'>
        <img src="Car.png" alt="Suite in Gisenyi">
        <div class="listing-info">
          <div class="listing-title">Suite in Gisenyi</div>
          <div class="listing-meta">$120/night • ★5.0</div>
        </div>
      </div>
      <div class="listing-card"
        data-title="Guesthouse in Huye"
        data-price="$60/night"
        data-rating="★4.88"
        data-images="imigongo.png,Blueprint_Logo-removebg-preview.png,Blueprint Rwanda.png"
        data-description="Charming guesthouse in the cultural heart of Rwanda. Close to the National Museum and University of Rwanda. Experience local hospitality and enjoy our beautiful garden."
        data-amenities="Wi-Fi,Garden,Free parking,Restaurant,Pet-friendly"
        data-map-embed='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31846.54923185361!2d29.72895284335937!3d-2.600959000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c20de785536e2f%3A0x446873934339832a!2sHuye!5e0!3m2!1sen!2srw!4v1678886663294!5m2!1sen!2srw" width="100%" height="250" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'>
        <img src="imigongo.png" alt="Guesthouse in Huye">
        <div class="listing-info">
          <div class="listing-title">Guesthouse in Huye</div>
          <div class="listing-meta">$60/night • ★4.88</div>
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
          <h3>Amenities</h3>
          <ul id="modalAmenities" class="modal-amenities"></ul>
          <h3>Location</h3>
          <div id="modalMap"></div>
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

    listingCards.forEach(card => {
      card.addEventListener("click", () => {
        const title = card.dataset.title;
        const price = card.dataset.price;
        const rating = card.dataset.rating;
        const images = card.dataset.images.split(',');
        const description = card.dataset.description;
        const amenities = card.dataset.amenities.split(',');
        const mapEmbed = card.dataset.mapEmbed;

        document.getElementById("modalTitle").textContent = title;
        document.getElementById("modalPrice").textContent = `${price} • ${rating}`;
        document.getElementById("modalDescription").textContent = description;
        
        const slidesWrapper = modal.querySelector('.slides-wrapper');
        const dotsContainer = modal.querySelector('.dot-container');
        slidesWrapper.innerHTML = '';
        dotsContainer.innerHTML = '';

        images.forEach((img, index) => {
          slidesWrapper.innerHTML += `<div class="mySlides"><img src="${img}" alt="${title}"></div>`;
          dotsContainer.innerHTML += `<span class="dot" onclick="currentSlide(${index + 1})"></span>`;
        });
        
        const amenitiesList = document.getElementById("modalAmenities");
        amenitiesList.innerHTML = '';
        amenities.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item;
          amenitiesList.appendChild(li);
        });

        document.getElementById("modalMap").innerHTML = mapEmbed;

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