/**
 * Blueprint Rwanda - Modular Component Engine
 * Handles injection of shared elements like Navbar and Footer.
 */

const Components = {
    /**
     * Injects the modern Navbar into the top of the body.
     */
    injectNavbar() {
        if (document.body.hasAttribute('data-no-navbar')) return;
        
        const navbar = `
            <nav class="navbar fixed-top">
                <div class="container nav-content">
                    <a href="index.html" class="nav-logo">
                        <div class="logo-icon"><i class="fas fa-landmark"></i></div>
                        <span>Blueprint Rwanda</span>
                    </a>
                    <ul class="nav-links">
                        <li><a href="accommodation.html" class="${this.isActive('accommodation')}">Accommodation</a></li>
                        <li><a href="visit.html" class="${this.isActive('visit')}">Place to Visit</a></li>
                        <li><a href="rentcar.html" class="${this.isActive('rentcar')}">Car Rent</a></li>
                        <li><a href="partners.html" class="${this.isActive('partners')}">Partners</a></li>
                    </ul>
                    <div class="nav-actions">
                        <a href="verification.html" class="btn btn-primary btn-sm">Get Started</a>
                        <button class="menu-toggle" aria-label="Toggle Menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </button>
                    </div>
                </div>
                <div class="mobile-menu glass">
                    <ul class="mobile-links">
                        <li><a href="accommodation.html">Accommodation</a></li>
                        <li><a href="visit.html">Place to Visit</a></li>
                        <li><a href="rentcar.html">Car Rent</a></li>
                        <li><a href="partners.html">Partners</a></li>
                        <li><a href="verification.html" class="btn btn-primary w-100">Get Started</a></li>
                    </ul>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbar);
        this.initNavbarLogic();
    },

    /**
     * Injects the modern Footer into the bottom of the body.
     */
    injectFooter() {
        if (document.body.hasAttribute('data-no-footer')) return;

        const footer = `
            <footer class="footer">
                <div class="container footer-grid">
                    <div class="footer-brand">
                        <a href="index.html" class="footer-logo">
                            <i class="fas fa-landmark"></i>
                            <span>Blueprint Rwanda</span>
                        </a>
                        <p>Your trusted partner for discovering the best of Rwanda. Unforgettable journeys start here.</p>
                        <div class="social-links">
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                            <a href="#"><i class="fab fa-facebook"></i></a>
                        </div>
                    </div>
                    <div class="footer-links">
                        <h4>Services</h4>
                        <a href="accommodation.html">Accommodation</a>
                        <a href="rentcar.html">Car Rentals</a>
                        <a href="visit.html">Tours & Experiences</a>
                    </div>
                    <div class="footer-links">
                        <h4>Explore</h4>
                        <a href="faq.html">FAQ</a>
                        <a href="contact.html">Contact Us</a>
                        <a href="team.html">Our Story</a>
                    </div>
                    <div class="footer-contact">
                        <h4>Contact</h4>
                        <p><i class="fas fa-envelope"></i> info@blueprintrwanda.com</p>
                        <p><i class="fas fa-phone"></i> +250 788 123 456</p>
                        <p><i class="fas fa-map-marker-alt"></i> KG 123 St, Kigali, Rwanda</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="container footer-bottom-content">
                        <p>&copy; 2026 Blueprint Rwanda. All Rights Reserved.</p>
                        <div class="legal-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>
        `;
        document.body.insertAdjacentHTML('beforeend', footer);
    },

    /**
     * Checks if a link is active based on current URL.
     */
    isActive(name) {
        return window.location.pathname.includes(name) ? 'active' : '';
    },

    /**
     * Logic for sticky behavior and mobile menu.
     */
    initNavbarLogic() {
        const nav = document.querySelector('.navbar');
        const toggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    },

    /**
     * Basic intersection observer for animations.
     */
    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    },

    /**
     * Auto-init everything.
     */
    init() {
        this.injectNavbar();
        this.injectFooter();
        this.initAnimations();
        
        // Add font-awesome via CDN if not present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(fa);
        }
    }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => Components.init());
