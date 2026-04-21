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
        const partnerPages = ['partner-dashboard', 'partner-portfolio', 'partner-pending', 'manage-listings', 'edit-listing', 'add-place', 'add-accommodation', 'add-car', 'user-add-item'];
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
                <li><a href="portfolio.html" class="${this.isActive('team')}">our vision</a></li>
                <li><a href="partners.html" class="${this.isActive('partners')}">Our partner</a></li>
            `;
        } else if (role === 'admin') {
            links = `
                <li><a href="admin-dashboard.html" class="${this.isActive('admin-dashboard')}"><i class="fas fa-chart-pie"></i> Console</a></li>
                <li><a href="admin-stakeholders.html" class="${this.isActive('admin-stakeholders')}"><i class="fas fa-users-cog"></i> Delegates</a></li>
                <li><a href="admin-inventory.html" class="${this.isActive('admin-inventory') || this.isActive('admin-accommodations') || this.isActive('admin-cars') || this.isActive('admin-places')}"><i class="fas fa-boxes"></i> Global Assets</a></li>
            `;
        } else if (role === 'partner') {
            links = `
                <li><a href="partner-dashboard.html" class="${this.isActive('partner-dashboard')}">Console</a></li>
                <li><a href="partner-portfolio.html" class="${this.isActive('partner-portfolio')}">My Portfolio</a></li>
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
                        <button id="global-search-trigger" class="btn-icon-nav" aria-label="Open Search">
                            <i class="fas fa-search"></i>
                        </button>
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
            <div id="blueprint-search-overlay" class="glass" style="display:none; position:fixed; inset:0; z-index:30000; padding:4rem 2rem; backdrop-filter:blur(30px); background:rgba(0,0,0,0.8);">
                <div class="container" style="max-width:800px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                        <h2 class="gradient-text" style="font-size:2rem;">Ecosystem Search</h2>
                        <button class="close-search btn-icon-nav" style="color:white; transition: all 0.3s ease;"><i class="fas fa-times"></i></button>
                    </div>
                    <div class="form-group" style="position:relative;">
                        <input type="text" id="global-search-input" class="form-control" placeholder="Search accounts, assets, or protocols..." style="background:rgba(255,255,255,0.05); color:white; border-color:rgba(255,255,255,0.1); padding:1.5rem 3rem; font-size:1.2rem;">
                        <i class="fas fa-search" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); opacity:0.5; color:white;"></i>
                    </div>
                    <div id="search-results" style="margin-top:2rem; display:grid; gap:1rem;">
                        <p style="text-align:center; opacity:0.5; color:white;">Begin typing to query the Blueprint ledger...</p>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', navbar);
        this.initNavbarLogic();
        this.initThemeToggle();
        this.initSearchLogic();
        if (role !== 'admin') this.initRoleSwitcher();
    },

    /**
     * Search Modal Logic.
     */
    initSearchLogic() {
        const trigger = document.getElementById('global-search-trigger');
        const overlay = document.getElementById('blueprint-search-overlay');
        const close = overlay.querySelector('.close-search');
        const input = document.getElementById('global-search-input');

        if (!trigger || !overlay) return;

        trigger.addEventListener('click', () => {
            overlay.style.display = 'block';
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.opacity = '1';
                overlay.style.transition = 'opacity 0.4s ease';
                input.focus();
            }, 10);
            document.body.style.overflow = 'hidden';
        });

        close.addEventListener('click', () => {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 400);
        });

        input.addEventListener('input', (e) => {
            const results = document.getElementById('search-results');
            if(e.target.value.length > 2) {
                results.innerHTML = `
                    <div class="card" style="padding:1rem; display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.1);">
                        <div>
                            <h4 style="color:var(--secondary); margin:0;">${e.target.value}</h4>
                            <p style="font-size:0.8rem; opacity:0.6; color:white; margin:0;">No verified records found in this context.</p>
                        </div>
                        <i class="fas fa-chevron-right" style="opacity:0.3; color:white;"></i>
                    </div>
                `;
            } else {
                results.innerHTML = '<p style="text-align:center; opacity:0.5; color:white;">Begin typing to query the Blueprint ledger...</p>';
            }
        });
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
                    <a href="admin-stakeholders.html">User Directory</a>
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
                    <a href="partner-portfolio.html">My Portfolio</a>
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
            toggleBtns.forEach(btn => { if (btn && btn.querySelector('i')) btn.querySelector('i').className = 'fas fa-sun'; });
        }

        toggleBtns.forEach(btn => {
            if (!btn) return;
            btn.onclick = () => {
                const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);

                const iconClass = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                toggleBtns.forEach(b => { if (b && b.querySelector('i')) b.querySelector('i').className = iconClass; });

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
            cursorX += (mouseX - cursorX) * 0.25;
            cursorY += (mouseY - cursorY) * 0.25;
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
     * Logic for administrative table filtering with Expanding UI support.
     * Searches through rows of a target table based on input and handles container expansion.
     */
    initAdminSearch(inputId, tableSelector) {
        const input = document.getElementById(inputId);
        if (!input) return;

        const container = input.closest('.search-container');
        const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
        if (rows.length === 0) return;

        // Expansion Toggle Logic
        if (container) {
            container.addEventListener('click', (e) => {
                container.classList.add('active');
                input.focus();
            });

            input.addEventListener('blur', () => {
                if (input.value.trim() === '') {
                    container.classList.remove('active');
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    input.value = '';
                    // Trigger input event to clear filters
                    input.dispatchEvent(new Event('input'));
                    input.blur();
                    container.classList.remove('active');
                }
            });
        }

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
     * Unified Administrative & Partner Creation Hub.
     */
    renderCreationHub(parentSelector) {
        const parent = document.querySelector(parentSelector);
        if (!parent) return;

        const role = this.getRole();
        const isAdmin = role === 'admin';
        
        const hub = `
            <div class="creation-dropdown" id="master-creation-hub">
                <button class="btn btn-primary btn-sm creation-trigger premium-btn">
                    <i class="fas fa-plus-circle"></i> ${isAdmin ? 'Master Integration' : 'Expand Portfolio'}
                </button>
                <div class="creation-menu">
                    <h4>${isAdmin ? 'Ecosystem Integration' : 'New Asset Registration'}</h4>
                    <a href="add-accommodation.html" class="creation-link">
                        <i class="fas fa-hotel"></i>
                        <span>${isAdmin ? 'Register Stay' : 'Add Accommodation'}</span>
                    </a>
                    <a href="add-car.html" class="creation-link">
                        <i class="fas fa-car"></i>
                        <span>${isAdmin ? 'Integrate Fleet' : 'Add Vehicle'}</span>
                    </a>
                    <a href="add-place.html" class="creation-link">
                        <i class="fas fa-mountain"></i>
                        <span>${isAdmin ? 'Authorize Experience' : 'Add Experience'}</span>
                    </a>
                    ${isAdmin ? `
                    <div style="margin-top: 1rem; padding-top: 0.5rem; border-top: 1px solid var(--border);">
                        <a href="add-user.html" class="creation-link">
                            <i class="fas fa-user-plus"></i>
                            <span>Manual Registration</span>
                        </a>
                    </div>` : ''}
                </div>
            </div>
        `;
        parent.innerHTML = hub;

        // Toggle logic
        const trigger = parent.querySelector('.creation-trigger');
        const dropdown = parent.querySelector('.creation-dropdown');
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });

        dropdown.querySelector('.creation-menu').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    },

    /**
     * Renders a sophisticated KPI Card with status and optional sparkline.
     */
    renderKPIBox(stat) {
        const { id, icon, label, value, trend, color = 'var(--primary)' } = stat;
        return `
            <div class="card kpi-card" data-animate id="kpi-${id}">
                <div class="kpi-content">
                    <div class="icon flex-center" style="background: ${color}20; color: ${color};"><i class="fas ${icon}"></i></div>
                    <div class="label">${label}</div>
                    <div class="value">${value}</div>
                    ${trend ? `<div class="trend ${trend.includes('Up') ? 'up' : 'down'}">${trend}</div>` : ''}
                </div>
                <canvas id="spark-${id}" class="sparkline-canvas"></canvas>
            </div>
        `;
    },

    /**
     * Visual Telemetry Overlay for Map Context.
     */
    renderTelemetryOverlay(parent, items = []) {
        const overlay = document.createElement('div');
        overlay.className = 'map-telemetry command-panel';
        overlay.style.cssText = `position: absolute; top: 1.5rem; left: 1.5rem; z-index: 1000; width: 260px; pointer-events: none;`;
        
        const content = items.map(item => `
            <div class="telemetry-item" style="margin-bottom: 1rem;">
                <div class="telemetry-label" style="font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; opacity: 0.6; margin-bottom: 0.3rem;">${item.label}</div>
                <div class="telemetry-val" style="font-size: 1.1rem; font-weight: 700; color: var(--white); display: flex; align-items: center; gap: 0.5rem;">
                    ${item.pulse ? '<div class="t-pulse" style="width:8px; height:8px; border-radius:50%; background:#10b981; box-shadow:0 0 10px #10b981;"></div>' : ''}
                    ${item.value}
                </div>
            </div>
        `).join('');

        overlay.innerHTML = content;
        parent.style.position = 'relative';
        parent.appendChild(overlay);
    },

    /**
     * Premium Lightbox Engine for interactive image viewing.
     */
    initLightbox() {
        const triggers = document.querySelectorAll('[data-lightbox]');
        if (triggers.length === 0) return;

        // Create overlay if it doesn't exist
        if (!document.getElementById('blueprint-lightbox')) {
            const overlay = document.createElement('div');
            overlay.id = 'blueprint-lightbox';
            overlay.className = 'glass';
            overlay.style.cssText = `
                position: fixed; inset: 0; z-index: 20000;
                display: none; align-items: center; justify-content: center;
                padding: 2rem; cursor: zoom-out; backdrop-filter: blur(20px);
                background: rgba(0,0,0,0.85);
            `;
            overlay.innerHTML = `
                <img id="lightbox-img" style="max-width: 90%; max-height: 90%; border-radius: var(--radius-md); box-shadow: var(--shadow-lg); transition: transform 0.4s ease; transform: scale(0.9);">
                <button class="close-lightbox" style="position: absolute; top: 2rem; right: 2rem; background: none; border: none; color: white; font-size: 2rem; cursor: pointer; transition: all 0.3s ease;"><i class="fas fa-times"></i></button>
            `;
            document.body.appendChild(overlay);

            overlay.addEventListener('click', (e) => {
                if (e.target.id === 'blueprint-lightbox' || e.target.closest('.close-lightbox')) {
                    this.hideLightbox();
                }
            });
        }

            triggers.forEach(trigger => {
                trigger.style.cursor = 'zoom-in';
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const src = trigger.tagName === 'IMG' ? trigger.src : trigger.href;
                    this.showLightbox(src);
                });
            });

            // Added hover effects for close buttons
            const style = document.createElement('style');
            style.textContent = `
                .close-search:hover, .close-lightbox:hover {
                    transform: scale(1.2) rotate(90deg);
                    text-shadow: 0 0 10px rgba(255,255,255,0.8);
                    opacity: 1 !important;
                }
            `;
            document.head.appendChild(style);
        },

    showLightbox(src) {
        const overlay = document.getElementById('blueprint-lightbox');
        const img = document.getElementById('lightbox-img');
        if (!overlay || !img) return;

        img.src = src;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            img.style.transform = 'scale(1)';
            overlay.style.opacity = '1';
        }, 10);
    },

    hideLightbox() {
        const overlay = document.getElementById('blueprint-lightbox');
        const img = document.getElementById('lightbox-img');
        if (!overlay || !img) return;

        img.style.transform = 'scale(0.9)';
        setTimeout(() => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    },

    /**
     * Auto-init everything.
     */
    init() {
        // Apply saved theme FIRST — before any rendering — to prevent flash
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        this.injectNavbar();
        this.injectFooter();
        this.initAnimations();
        this.initCustomCursor();
        this.initLightbox();

        // If navbar is suppressed (form pages), still apply theme toggle logic
        if (document.body.hasAttribute('data-no-navbar')) {
            this.initThemeToggle();
        }

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
