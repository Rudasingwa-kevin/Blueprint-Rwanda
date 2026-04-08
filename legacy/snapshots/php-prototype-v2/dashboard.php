<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Blueprint Rwanda</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar">
        <a href="dashboard.html" class="nav-logo">
            <img src="Title Logo.png" alt="Logo" />
            <span>Blueprint Rwanda</span>
        </a>
        <ul class="nav-menu">
            <li><a href="accommodation.html">Accommodation</a></li>
            <li><a href="visit.html">Place to Visit</a></li>
            <li><a href="rentcar.html">Car Rent</a></li>
            <li class="nav-cta"><a href="admin.html">Admin</a></li>
        </ul>
        <button class="hamburger" aria-label="Toggle menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    </nav>

    <main class="dashboard-container">
        <header class="dashboard-header">
            <h1>Welcome to Your Dashboard</h1>
            <p>Manage your bookings and explore what Rwanda has to offer.</p>
        </header>

        <section class="services-row">
            <a href="accommodation.html" class="service-card">
                <img src="Accommodation.png" alt="Accommodation">
                <h3>Accommodation</h3>
                <p>Find and book your perfect stay, from cozy guesthouses to luxury hotels.</p>
            </a>
            <a href="visit.html" class="service-card">
                <img src="Visit.png" alt="Places to Visit">
                <h3>Place to Visit</h3>
                <p>Discover breathtaking landscapes, cultural sites, and unforgettable experiences.</p>
            </a>
            <a href="rentcar.html" class="service-card">
                <img src="Car.png" alt="Car Rental">
                <h3>Car Rental</h3>
                <p>Explore Rwanda at your own pace with a wide range of reliable rental cars.</p>
            </a>
        </section>
    </main>

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
                    <a href="accommodation.html">Accommodation</a>
                    <a href="rentcar.html">Car Rentals</a>
                    <a href="visit.html">Tours & Experiences</a>
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
        const hamburger = document.querySelector(".hamburger");
        const navMenu = document.querySelector(".nav-menu");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    </script>
</body>
</html> 