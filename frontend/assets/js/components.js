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
        
        const currentMode = localStorage.getItem('userMode') || 'guest';
        const dashboardLink = currentMode === 'partner' ? 'partner-dashboard.html' : 'guest-dashboard.html';
        const modeLabel = currentMode === 'partner' ? 'Switch to Guest' : 'Switch to Partner';
        
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
                        <button id="mode-switcher" class="btn btn-secondary btn-sm mode-toggle-btn">
                            <i class="fas ${currentMode === 'partner' ? 'fa-suitcase' : 'fa-handshake'}"></i>
                            <span>${modeLabel}</span>
                        </button>
                        <button id="theme-toggle" class="btn-icon-nav" aria-label="Toggle Theme">
                            <i class="fas fa-moon"></i>
                        </button>
                        <a href="${dashboardLink}" class="btn btn-primary btn-sm"><i class="fas fa-user-circle"></i> Dashboard</a>
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
                        <li><button id="theme-toggle-mobile" class="btn btn-secondary w-100 mb-2">Toggle Dark Mode</button></li>
                        <li><button id="mode-switcher-mobile" class="btn btn-primary w-100 mb-2">${modeLabel}</button></li>
                        <li><a href="${dashboardLink}" class="btn btn-primary w-100">Go to Dashboard</a></li>
                    </ul>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbar);
        this.initNavbarLogic();
        this.initThemeToggle();
        this.initRoleSwitcher();
    },

    /**
     * Role Switching Logic.
     */
    initRoleSwitcher() {
        const switchBtns = [document.getElementById('mode-switcher'), document.getElementById('mode-switcher-mobile')];
        switchBtns.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', () => {
                const currentMode = localStorage.getItem('userMode') || 'guest';
                const newMode = currentMode === 'partner' ? 'guest' : 'partner';
                localStorage.setItem('userMode', newMode);
                
                const targetPage = newMode === 'partner' ? 'partner-dashboard.html' : 'guest-dashboard.html';
                this.showToast(`Switching to ${newMode.charAt(0).toUpperCase() + newMode.slice(1)} Perspective...`, 'success');
                setTimeout(() => location.href = targetPage, 1000);
            });
        });
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
     * Dark Mode Logic.
     */
    initThemeToggle() {
        const toggleBtns = [document.getElementById('theme-toggle'), document.getElementById('theme-toggle-mobile')];
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleBtns.forEach(btn => { if(btn && btn.querySelector('i')) btn.querySelector('i').className = 'fas fa-sun'; });
        }

        toggleBtns.forEach(btn => {
            if (!btn) return;
            btn.onclick = () => {
                const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                
                const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                toggleBtns.forEach(b => { if(b && b.querySelector('i')) b.querySelector('i').className = iconClass; });
                
                this.showToast(`${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode Activated`, 'success');
            };
        });
    },

    /**
     * Custom Follower Cursor Logic.
     */
    initCustomCursor() {
        if (window.innerWidth < 1024) return;
        
        const cursor = document.createElement('div');
        cursor.id = 'blueprint-cursor';
        document.body.appendChild(cursor);
        document.body.classList.add('custom-cursor-active');
        cursor.style.display = 'block';

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow logic (lerp)
        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = `${cursorX - (cursor.offsetWidth / 2)}px`;
            cursor.style.top = `${cursorY - (cursor.offsetHeight / 2)}px`;
            requestAnimationFrame(animate);
        };
        animate();

        // Interaction reactive logic
        const targets = 'a, button, .card, .menu-toggle, input, textarea';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(targets)) {
                cursor.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(targets)) {
                cursor.classList.remove('hover');
            }
        });
    },

    /**
     * Logic for sticky behavior and mobile menu.
     */
    initNavbarLogic() {
        const nav = document.querySelector('.navbar');
        const toggle = document.querySelector('.menu-toggle');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!nav || !toggle) return;

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
     * Enhanced Map Initialization (Leaflet).
     */
    initMap(containerId, markers = []) {
        if (!document.getElementById(containerId)) return;
        
        // Ensure Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('Leaflet is required for maps');
            return;
        }

        const map = L.map(containerId).setView([-1.9441, 30.0619], 13); // Default Kigali

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap moderators'
        }).addTo(map);

        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width: 30px; height: 30px; background: var(--primary); border: 3px solid var(--white); border-radius: 50%; box-shadow: var(--shadow-md);"></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
        });

        const bounds = [];
        markers.forEach(m => {
            L.marker([m.lat, m.lng], { icon: customIcon })
                .addTo(map)
                .bindPopup(`<strong>${m.title}</strong><br>${m.desc}`);
            bounds.push([m.lat, m.lng]);
        });

        if (bounds.length > 0) map.fitBounds(bounds, { padding: [50, 50] });
        
        return map;
    },

    /**
     * Universal Modal Logic.
     */
    initModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const closeBtn = modal.querySelector('.close-modal');
        const openBtns = document.querySelectorAll(`[data-open-modal="${modalId}"]`);

        openBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    },

    /**
     * Logic for administrative table filtering.
     * Searches through rows of a target table based on input.
     */
    initAdminSearch(inputId, tableSelector) {
        const input = document.getElementById(inputId);
        const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
        if (!input || rows.length === 0) return;

        input.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            let matches = 0;

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                if (text.includes(term)) {
                    row.style.display = '';
                    matches++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Handle empty state if needed
            const table = document.querySelector(tableSelector);
            let emptyMsg = table.parentNode.querySelector('.empty-state');
            
            if (matches === 0) {
                if (!emptyMsg) {
                    emptyMsg = document.createElement('div');
                    emptyMsg.className = 'empty-state';
                    emptyMsg.innerHTML = `<i class="fas fa-search"></i><p>No operational data matches "${e.target.value}"</p>`;
                    table.style.display = 'none';
                    table.parentNode.appendChild(emptyMsg);
                }
            } else if (emptyMsg) {
                emptyMsg.remove();
                table.style.display = '';
            }
        });
    },

    /**
     * Intelligent Meta Engine.
     * Dynamically updates page titles, descriptions, and OpenGraph tags.
     */
    setPageMeta(config = {}) {
        const { 
            title = "Blueprint Rwanda - The Gold Standard", 
            description = "Discover luxury stays, premium mobility, and curated experiences in the heart of Africa.",
            keywords = "Rwanda, Kigali, Luxury Stays, Car Rental, African Tourism",
            image = "../assets/images/branding/blueprint-logo.png"
        } = config;

        // Update Title
        document.title = title;

        // Update Meta Tags
        const setMeta = (name, value, attr = 'name') => {
            let meta = document.querySelector(`meta[${attr}="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute(attr, name);
                document.head.appendChild(meta);
            }
            meta.content = value;
        };

        setMeta('description', description);
        setMeta('keywords', keywords);

        // OpenGraph / Social
        setMeta('og:title', title, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:image', image, 'property');
        setMeta('og:type', 'website', 'property');
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', title);
        setMeta('twitter:description', description);
    },

    /**
     * Premium Toast Notifications.
     */
    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} glass`;
        toast.style.cssText = `
            position: fixed; bottom: 2rem; right: 2rem;
            padding: 1rem 2rem; border-radius: var(--radius-md);
            z-index: 11000; transform: translateY(100px);
            opacity: 0; transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            color: var(--text); font-weight: 600;
            border-left: 5px solid ${type === 'success' ? 'var(--success)' : 'var(--error)'};
        `;
        toast.innerText = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
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
        this.initCustomCursor();
        
        // Add font-awesome via CDN if not present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        // Add Leaflet CSS if not present
        if (!document.querySelector('link[href*="leaflet"]')) {
            const lcss = document.createElement('link');
            lcss.rel = 'stylesheet';
            lcss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(lcss);
        }
    }
};

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => Components.init());
