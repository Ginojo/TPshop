// Instagram Feed Loader for The Printing Shop Antwerpen
// Uses Instagram's official oEmbed to display posts
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

    // Create blockquote elements for each Instagram post
    // Instagram's embed.js will transform these into embedded posts
    INSTAGRAM_POSTS.forEach((postUrl, index) => {
      gridHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
          <blockquote class="instagram-media"
                      data-instgrm-captioned
                      data-instgrm-permalink="${postUrl}"
                      data-instgrm-version="14"
                      style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:100%; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
          </blockquote>
        </div>
      `;
    });

    feedContainer.innerHTML = gridHTML;

    // Load Instagram's embed script to render the posts
    loadInstagramEmbedScript();
  }

  function loadInstagramEmbedScript() {
    // Check if script is already loaded
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    // Load Instagram embed script
    const script = document.createElement('script');
    script.async = true;
    script.src = '//www.instagram.com/embed.js';
    document.body.appendChild(script);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstagramGrid);
  } else {
    createInstagramGrid();
  }
})();

