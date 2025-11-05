// Instagram Feed Loader for The Printing Shop Antwerpen
// Displays Instagram post iframes in a grid
// TO UPDATE: Update the INSTAGRAM_POSTS array below with new post URLs

(function() {
  'use strict';

  // EASY UPDATE: Add your Instagram post URLs here
  const INSTAGRAM_POSTS = [
    'https://www.instagram.com/theprintingshopantwerpen/p/C7-NbpNoF-z/',
    'https://www.instagram.com/theprintingshopantwerpen/p/C7EMzDqN2jy/',
    'https://www.instagram.com/theprintingshopantwerpen/p/C5k1R5kNAu7/',
    'https://www.instagram.com/theprintingshopantwerpen/p/C6wniYOt9ls/',
    'https://www.instagram.com/theprintingshopantwerpen/p/C6rIaMENwOY/',
    'https://www.instagram.com/theprintingshopantwerpen/p/C3tTM72sDUh/'
  ];

  function createInstagramGrid() {
    const feedContainer = document.getElementById('instagram-feed');

    if (!feedContainer) {
      return;
    }

    let gridHTML = '';

    INSTAGRAM_POSTS.forEach((postUrl, index) => {
      // Create iframe embed for each Instagram post
      const embedUrl = postUrl + 'embed/';

      gridHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
          <iframe
            src="${embedUrl}"
            width="100%"
            height="580"
            frameborder="0"
            scrolling="no"
            allowtransparency="true"
            style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background: white; max-width: 540px;"
            loading="lazy">
          </iframe>
        </div>
      `;
    });

    feedContainer.innerHTML = gridHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstagramGrid);
  } else {
    createInstagramGrid();
  }
})();

