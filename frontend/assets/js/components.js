/**
 * Blueprint Rwanda - Modular Component Engine
 * Handles injection of shared elements like Navbar and Footer.
 */

const Components = {
    /**
     * Determines the active role based on URL context and persistence.
     */
    getRole() {
        const path = window.location.pathname.toLowerCase();
        if (path.includes('admin-')) return 'admin';
        
        // Contextual override: if on a dedicated partner tool/page, render the partner navbar
        const partnerPages = ['partner-dashboard', 'portfolio', 'partner-pending', 'manage-listings', 'edit-listing', 'add-place', 'add-accommodation', 'add-car', 'user-add-item'];
        if (partnerPages.some(page => path.includes(page))) {
            return 'partner';
        }

        return localStorage.getItem('userMode') || 'guest';
    },

    /**
     * Injects the modern Navbar into the top of the body.
     */
    injectNavbar() {
        if (document.body.hasAttribute('data-no-navbar')) return;
        
        const role = this.getRole();
        const modeLabel = role === 'partner' ? 'Switch to Guest' : 'Switch to Partner';
        const dashboardLink = role === 'partner' ? 'partner-dashboard.html' : 'guest-dashboard.html';
        
        const isPublic = document.body.getAttribute('data-perspective') === 'public';
        
        // Define Link Templates
        let links = '';
        if (isPublic) {
            links = `
                <li><a href="index.html" class="${this.isActive('index')}">Home</a></li>
                <li><a href="team.html" class="${this.isActive('team')}">Our Vision</a></li>
                <li><a href="partners.html" class="${this.isActive('partners')}">Our Partners</a></li>
            `;
        } else if (role === 'admin') {
            links = `
                <li><a href="admin-dashboard.html" class="${this.isActive('admin-dashboard')}"><i class="fas fa-chart-pie"></i> Console</a></li>
                <li><a href="admin-users.html" class="${this.isActive('admin-users')}"><i class="fas fa-users-cog"></i> Delegates</a></li>
                <li><a href="admin-inventory.html" class="${this.isActive('admin-inventory') || this.isActive('admin-accommodations') || this.isActive('admin-cars') || this.isActive('admin-places')}"><i class="fas fa-boxes"></i> Global Assets</a></li>
            `;
        } else if (role === 'partner') {
            links = `
                <li><a href="partner-dashboard.html" class="${this.isActive('partner-dashboard')}">Console</a></li>
                <li><a href="portfolio.html" class="${this.isActive('portfolio')}">My Portfolio</a></li>
                <li><a href="manage-listings.html" class="${this.isActive('manage-listings')}">Manage Listings</a></li>
            `;
        } else {
            links = `
                <li><a href="accommodation.html" class="${this.isActive('accommodation')}">Accommodation</a></li>
                <li><a href="visit.html" class="${this.isActive('visit')}">Place to Visit</a></li>
                <li><a href="rentcar.html" class="${this.isActive('rentcar')}">Car Rent</a></li>
                <li><a href="partners.html" class="${this.isActive('partners')}">Partners</a></li>
            `;
        }
        
        const navbar = `
            <nav class="navbar fixed-top">
                <div class="container nav-content">
                    <a href="index.html" class="nav-logo">
                        <img src="../assets/Images/Branding/title-logo.png" alt="Blueprint Rwanda Logo" style="height: 54px; width: auto; object-fit: preserve; filter: drop-shadow(0 4px 10px rgba(160, 82, 45, 0.15));">
                        <span style="font-size: 1.35rem; tracking: -0.5px;">Blueprint Rwanda ${role === 'admin' ? '<small style="font-size: 0.6rem; opacity: 0.6; margin-left: 5px;">GOV</small>' : ''}</span>
                    </a>
                    <ul class="nav-links">
                        ${links}
                    </ul>
                    <div class="nav-actions">
                        ${(!isPublic && role !== 'admin') ? `
                        <button id="mode-switcher" class="btn btn-secondary btn-sm mode-toggle-btn">
                            <i class="fas ${role === 'partner' ? 'fa-suitcase' : 'fa-handshake'}"></i>
                            <span class="btn-label">${modeLabel}</span>
                        </button>` : ''}
                        <button id="theme-toggle" class="btn-icon-nav" aria-label="Toggle Theme">
                            <i class="fas fa-moon"></i>
                        </button>
                        ${isPublic ? `
                            <a href="login.html" class="btn btn-primary btn-sm"><i class="fas fa-sign-in-alt"></i><span class="btn-label"> Join</span></a>
                        ` : (role !== 'admin' ? `<a href="${dashboardLink}" class="btn btn-primary btn-sm"><i class="fas fa-user-circle"></i><span class="btn-label"> Dashboard</span></a>` : '')}
                        <button class="menu-toggle" aria-label="Toggle Menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </button>
                    </div>
                </div>
                <div class="mobile-menu glass">
                    <ul class="mobile-links">
                        ${links}
                        <li><button id="theme-toggle-mobile" class="btn btn-secondary w-100 mb-2">Toggle Dark Mode</button></li>
                        ${isPublic ? `
                            <li><a href="login.html" class="btn btn-primary w-100">Join the Ecosystem</a></li>
                        ` : (role !== 'admin' ? `
                            <li><button id="mode-switcher-mobile" class="btn btn-primary w-100 mb-2">${modeLabel}</button></li>
                            <li><a href="${dashboardLink}" class="btn btn-primary w-100">Go to Dashboard</a></li>
                        ` : '')}
                    </ul>
                </div>
            </nav>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbar);
        this.initNavbarLogic();
        this.initThemeToggle();
        if (role !== 'admin') this.initRoleSwitcher();
    },

    /**
     * Role Switching Logic.
     */
    initRoleSwitcher() {
        const switchBtns = [document.getElementById('mode-switcher'), document.getElementById('mode-switcher-mobile')];
        switchBtns.forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', () => {
                const currentMode = this.getRole();
                const newMode = currentMode === 'partner' ? 'guest' : 'partner';
                
                // Enforce Partner Application Process
                if (currentMode === 'guest' && newMode === 'partner') {
                    const status = localStorage.getItem('partnerStatus');
                    if (!status) {
                        this.showToast('Verification Required', 'error');
                        setTimeout(() => location.href = 'partner-signup.html', 1000);
                        return;
                    } else if (status === 'pending') {
                        this.showToast('Application Under Review', 'error');
                        setTimeout(() => location.href = 'partner-pending.html', 1000);
                        return;
                    }
                    // If status === 'approved', it proceeds below
                }

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
        const isPublic = document.body.getAttribute('data-perspective') === 'public';
        const role = this.getRole();

        let footerContent = '';
        if (isPublic) {
            footerContent = `
                <div class="footer-links">
                    <h4>Blueprint Ecosystem</h4>
                    <a href="team.html">Our Vision</a>
                    <a href="partners.html">Partners</a>
                    <a href="login.html">Join Us</a>
                </div>
                <div class="footer-links">
                    <h4>Resources</h4>
                    <a href="faq.html">FAQ</a>
                    <a href="contact.html">Contact Us</a>
                </div>
                <div class="footer-contact">
                    <h4>Blueprint HQ</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Kigali, Rwanda</p>
                    <p><i class="fas fa-envelope"></i> info@blueprint.rw</p>
                </div>
            `;
        } else if (role === 'admin') {
            footerContent = `
                <div class="footer-links">
                    <h4>Governance</h4>
                    <a href="admin-dashboard.html">System Health</a>
                    <a href="admin-users.html">User Directory</a>
                    <a href="#">Audit Logs</a>
                </div>
                <div class="footer-links">
                    <h4>Operations</h4>
                    <a href="admin-accommodations.html">Stay Management</a>
                    <a href="admin-cars.html">Fleet Management</a>
                </div>
                <div class="footer-contact">
                    <h4>Admin Support</h4>
                    <p><i class="fas fa-shield-alt"></i> Secure Console</p>
                    <p><i class="fas fa-terminal"></i> Build v2.4.0</p>
                </div>
            `;
        } else if (role === 'partner') {
            footerContent = `
                <div class="footer-links">
                    <h4>Business</h4>
                    <a href="partner-dashboard.html">Earnings</a>
                    <a href="portfolio.html">My Portfolio</a>
                    <a href="user-add-item.html">List New Service</a>
                </div>
                <div class="footer-links">
                    <h4>Resources</h4>
                    <a href="#">Host Guidelines</a>
                    <a href="faq.html">Partner FAQ</a>
                    <a href="contact.html">Owner Support</a>
                </div>
                <div class="footer-contact">
                    <h4>Partner Desk</h4>
                    <p><i class="fas fa-envelope"></i> partners@blueprintrwanda.com</p>
                </div>
            `;
        } else {
            footerContent = `
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
            `;
        }

        const footer = `
            <footer class="footer">
                <div class="container footer-grid">
                    <div class="footer-brand">
                        <a href="index.html" class="footer-logo">
                            <img src="../assets/Images/Branding/title-logo.png" alt="Blueprint Rwanda Logo" style="height: 60px; width: auto; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                            <span style="font-size: 1.8rem; margin-top: 5px;">Blueprint Rwanda</span>
                        </a>
                        <p>${role === 'admin' ? 'Monitoring the pulse of Rwanda’s premium marketplace.' : 'Your trusted partner for discovering the best of Rwanda.'}</p>
                        <div class="social-links">
                            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                        </div>
                    </div>
                    ${footerContent}
                </div>
                <div class="footer-bottom">
                    <div class="container footer-bottom-content">
                        <p>&copy; 2026 Blueprint Rwanda. ${role === 'admin' ? 'Administrative Access Only.' : 'All Rights Reserved.'}</p>
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
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Debug visibility
        container.style.backgroundColor = 'rgba(255,255,255,0.05)';
        container.style.display = 'block';

        // Check if map is already initialized to prevent errors
        if (container._leaflet_id) return;
        
        // Ensure Leaflet is loaded (with a small retry logic for injected scripts)
        if (typeof L === 'undefined') {
            let retries = 0;
            const maxRetries = 10;
            const retryInterval = setInterval(() => {
                if (typeof L !== 'undefined') {
                    clearInterval(retryInterval);
                    this.initMap(containerId, markers);
                } else if (retries >= maxRetries) {
                    clearInterval(retryInterval);
                    console.error('Leaflet is required for maps, but the script failed to load.');
                    container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--error);">Failed to load map engine (Leaflet).</div>';
                }
                retries++;
            }, 100);
            return;
        }

        const map = L.map(containerId).setView([-1.9441, 30.0619], 12); 

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
        }).addTo(map);

        const customIcon = L.divIcon({
            className: 'premium-marker',
            html: `<div class="marker-pulse"></div><div class="marker-core"></div>`,
            iconSize: [40, 40],
            iconAnchor: [20, 20]
        });

        const bounds = [];
        markers.forEach(m => {
            const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(map);
            marker.bindPopup(`<div class="map-popup"><strong>${m.title}</strong><p style="margin: 5px 0; font-size: 0.8rem; opacity: 0.8;">${m.desc}</p>${m.url ? `<a href="${m.url}" class="btn btn-primary btn-sm">View</a>` : ''}</div>`);
            bounds.push([m.lat, m.lng]);
        });

        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        } else {
            map.setView([-1.9441, 30.0619], 13);
        }
        
        // Robust resize handling for animated/hidden containers
        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });
        resizeObserver.observe(container);
        
        setTimeout(() => map.invalidateSize(), 500);

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

        // Add Leaflet JS if not present
        if (!document.querySelector('script[src*="leaflet"]')) {
            const ljs = document.createElement('script');
            ljs.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            document.head.appendChild(ljs);
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
window.Components = Components;
