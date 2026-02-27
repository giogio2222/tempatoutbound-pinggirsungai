document.addEventListener('DOMContentLoaded', function () {
    // Back to Top Button Logic
    const topBtn = document.querySelector('.floating-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topBtn.style.display = 'flex';
        } else {
            topBtn.style.display = 'none';
        }
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Auto TOC Generator for Article Pages
    const article = document.querySelector('article');
    const tocList = document.getElementById('toc-list');
    const tocContainer = document.querySelector('.toc-box');

    if (article && tocList) {
        const headings = article.querySelectorAll('h2, h3');
        if (headings.length > 0) {
            headings.forEach((heading, index) => {
                const id = 'heading-' + index;
                heading.id = id;
                const li = document.createElement('li');
                li.className = heading.tagName.toLowerCase() === 'h3' ? 'ms-3' : '';
                const a = document.createElement('a');
                a.href = '#' + id;
                a.textContent = heading.textContent;
                a.className = 'text-decoration-none text-dark d-block py-1';
                li.appendChild(a);
                tocList.appendChild(li);
            });
        } else {
            tocContainer.style.display = 'none';
        }
    }

    // TOC Toggle
    const tocTitle = document.querySelector('.toc-title');
    const tocListInitial = document.getElementById('toc-list');
    if (tocTitle && tocListInitial) {
        // Force closed on mobile, open on desktop by default
        if (window.innerWidth < 768) {
            tocListInitial.style.display = 'none';
            tocTitle.querySelector('i').className = 'fas fa-chevron-down';
        }

        tocTitle.addEventListener('click', () => {
            const icon = tocTitle.querySelector('i');
            if (tocListInitial.style.display === 'none') {
                tocListInitial.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
            } else {
                tocListInitial.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
            }
        });
    }

    // Share Social Media Logic
    const shareBtns = document.querySelectorAll('.share-buttons a');
    if (shareBtns.length > 0) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);

        shareBtns.forEach(btn => {
            if (btn.classList.contains('share-wa')) {
                btn.href = `https://wa.me/?text=${title}%20${url}`;
            } else if (btn.classList.contains('share-fb')) {
                btn.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            } else if (btn.classList.contains('share-tw')) {
                btn.href = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            }
        });
    }

    // Mobile Navbar Auto-close
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });
});
