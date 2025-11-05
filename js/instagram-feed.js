// Instagram Feed Loader for The Printing Shop Antwerpen
// Displays 6 recent Instagram-style posts in a grid format
// TO UPDATE: Add images to images/instagram/ folder and update INSTAGRAM_POSTS array below

(function() {
  'use strict';

  const INSTAGRAM_USERNAME = 'theprintingshopantwerpen';
  const INSTAGRAM_URL = 'https://www.instagram.com/' + INSTAGRAM_USERNAME + '/';

  // EASY UPDATE: Add your 6 most recent Instagram posts here
  // image: path to image file (place images in images/instagram/ folder)
  // link: Instagram post URL (so users can click through to see the full post)
  const INSTAGRAM_POSTS = [
    {
      image: 'images/p18.jpg',
      link: 'https://www.instagram.com/p/DDGr50tM9fN/',
      alt: 'Recent drukwerk project 1'
    },
    {
      image: 'images/p1.png',
      link: 'https://www.instagram.com/p/DCCVQRBMe56/',
      alt: 'Recent drukwerk project 2'
    },
    {
      image: 'images/p2.png',
      link: 'https://www.instagram.com/p/DBwWZlmMxIu/',
      alt: 'Recent drukwerk project 3'
    },
    {
      image: 'images/p3.png',
      link: 'https://www.instagram.com/p/DBuEE18sPPD/',
      alt: 'Recent drukwerk project 4'
    },
    {
      image: 'images/p8.png',
      link: 'https://www.instagram.com/p/DBjzEQTsH8L/',
      alt: 'Recent drukwerk project 5'
    },
    {
      image: 'images/p5.jpg',
      link: 'https://www.instagram.com/p/DBVu2kfsWQu/',
      alt: 'Recent drukwerk project 6'
    }
  ];

  function createInstagramGrid() {
    const feedContainer = document.getElementById('instagram-feed');

    if (!feedContainer) {
      return;
    }

    let gridHTML = '';

    INSTAGRAM_POSTS.forEach((post, index) => {
      gridHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
          <a href="${post.link}" target="_blank" class="instagram-grid-item" rel="noopener">
            <div class="instagram-post-wrapper">
              <img src="${post.image}"
                   alt="${post.alt}"
                   class="instagram-post-image"
                   loading="lazy">
              <div class="instagram-overlay">
                <i class="fa fa-instagram"></i>
                <p>Bekijk op Instagram</p>
              </div>
            </div>
          </a>
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

