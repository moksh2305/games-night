document.addEventListener('DOMContentLoaded', () => {
    
    // Sidebar Navigation Logic
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove active from all links
            navLinks.forEach(item => item.classList.remove('active'));
            // Add active to clicked link
            link.classList.add('active');

            // Get target page id
            const targetId = link.getAttribute('data-target');

            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
            }
        });
    });

    // Sub-Tabs Logic (Events Category Chips)
    const categoryChips = document.querySelectorAll('.category-chips .chip');
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            // Add filter logic here if data was dynamic
        });
    });

    // Sub-Tabs Logic (My Tickets Tabs)
    const ticketTabs = document.querySelectorAll('#mytickets .tab');
    ticketTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            ticketTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Sub-Tabs Logic (Bookings Tabs)
    const bookingTabs = document.querySelectorAll('#bookings .tab');
    bookingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            bookingTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Sub-Tabs Logic (Profile Tabs)
    const profileTabs = document.querySelectorAll('.profile-tabs .ptab');
    profileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            profileTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Add subtle hover effects for glass panels to follow mouse (optional micro-interaction)
    const cards = document.querySelectorAll('.stat-card, .event-card, .ticket-card, .event-mini-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // This creates a subtle glow effect that follows the cursor
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
