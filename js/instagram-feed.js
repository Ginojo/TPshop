// Instagram Feed Loader for The Printing Shop Antwerpen
// Displays 6 recent Instagram posts in a grid format
// TO UPDATE: Replace the post URLs below with your latest Instagram post links

(function() {
  'use strict';

  const INSTAGRAM_USERNAME = 'theprintingshopantwerpen';
  const INSTAGRAM_URL = 'https://www.instagram.com/' + INSTAGRAM_USERNAME + '/';

  // EASY UPDATE: Add your 6 most recent Instagram post URLs here
  // Just copy the URL from any Instagram post (e.g., https://www.instagram.com/p/ABC123/)
  const INSTAGRAM_POSTS = [
    'https://www.instagram.com/p/DDGr50tM9fN/',  // Post 1
    'https://www.instagram.com/p/DCCVQRBMe56/',  // Post 2
    'https://www.instagram.com/p/DBwWZlmMxIu/',  // Post 3
    'https://www.instagram.com/p/DBuEE18sPPD/',  // Post 4
    'https://www.instagram.com/p/DBjzEQTsH8L/',  // Post 5
    'https://www.instagram.com/p/DBVu2kfsWQu/'   // Post 6
  ];

  async function fetchInstagramPost(postUrl) {
    try {
      // Use Instagram's oembed API to get post data
      const oembedUrl = `https://graph.facebook.com/v18.0/instagram_oembed?url=${encodeURIComponent(postUrl)}&access_token=YOUR_ACCESS_TOKEN&fields=thumbnail_url,author_name,media_id`;

      // Fallback: Extract post ID and create thumbnail
      const postId = postUrl.match(/\/p\/([^\/]+)/)[1];
      const thumbnailUrl = `https://www.instagram.com/p/${postId}/media/?size=m`;

      return {
        postUrl: postUrl,
        thumbnailUrl: thumbnailUrl,
        postId: postId
      };
    } catch (error) {
      console.error('Error fetching Instagram post:', error);
      return null;
    }
  }

  async function createInstagramGrid() {
    const feedContainer = document.getElementById('instagram-feed');

    if (!feedContainer) {
      return;
    }

    // Show loading state
    feedContainer.innerHTML = '<div class="col-12 text-center"><p>Instagram feed wordt geladen...</p></div>';

    const posts = await Promise.all(INSTAGRAM_POSTS.map(url => fetchInstagramPost(url)));

    let gridHTML = '';

    posts.forEach((post, index) => {
      if (post) {
        gridHTML += `
          <div class="col-lg-4 col-md-6 mb-4">
            <a href="${post.postUrl}" target="_blank" class="instagram-grid-item" rel="noopener">
              <div class="instagram-post-wrapper">
                <img src="${post.thumbnailUrl}"
                     alt="Instagram post ${index + 1}"
                     class="instagram-post-image"
                     loading="lazy"
                     onerror="this.onerror=null; this.parentElement.innerHTML='<div class=\\'instagram-error\\'>Foto kan niet worden geladen</div>';">
                <div class="instagram-overlay">
                  <i class="fa fa-instagram"></i>
                  <p>Bekijk op Instagram</p>
                </div>
              </div>
            </a>
          </div>
        `;
      }
    });

    if (gridHTML === '') {
      gridHTML = `
        <div class="col-12 text-center">
          <p>Kon Instagram posts niet laden. <a href="${INSTAGRAM_URL}" target="_blank">Bekijk onze Instagram</a></p>
        </div>
      `;
    }

    feedContainer.innerHTML = gridHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstagramGrid);
  } else {
    createInstagramGrid();
  }
})();

