// scholar.js: Auto-populate publications from Google Scholar

const scholarProfileUrl = 'https://scholar.google.com/citations?hl=en&user=woIOwo4AAAAJ';
const publicationsList = document.getElementById('publications-list');

async function fetchPublications() {
    try {
        const response = await fetch(scholarProfileUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const html = await response.text();
        // Parse the HTML to extract publication titles and links
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const rows = doc.querySelectorAll('.gsc_a_tr');
        let publications = [];
        rows.forEach(row => {
            const titleElem = row.querySelector('.gsc_a_at');
            if (titleElem) {
                publications.push({
                    title: titleElem.textContent,
                    link: 'https://scholar.google.com' + titleElem.getAttribute('href')
                });
            }
        });
        if (publications.length === 0) throw new Error('No publications found or CORS blocked');
        publicationsList.innerHTML = '<ul>' + publications.map(pub => `<li><a href="${pub.link}" target="_blank">${pub.title}</a></li>`).join('') + '</ul>';
    } catch (error) {
        publicationsList.innerHTML = '<p>Unable to load publications automatically. <a href="https://scholar.google.com/citations?hl=en&user=woIOwo4AAAAJ" target="_blank">View my Google Scholar profile</a>.</p>';
    }
}

if (publicationsList) fetchPublications(); 