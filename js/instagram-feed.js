// Instagram Feed Loader for The Printing Shop Antwerpen
// Simple grid with Instagram profile link - works immediately

(function() {
  'use strict';

  const INSTAGRAM_USERNAME = 'theprintingshopantwerpen';
  const INSTAGRAM_URL = 'https://www.instagram.com/' + INSTAGRAM_USERNAME + '/';

  function createInstagramGrid() {
    const feedContainer = document.getElementById('instagram-feed');

    if (!feedContainer) {
      return;
    }

    // Create a beautiful grid showcasing Instagram
    // Each box links to the Instagram profile
    const gridHTML = `
      <div class="col-lg-4 col-md-6 mb-4">
        <a href="${INSTAGRAM_URL}" target="_blank" class="instagram-grid-item">
          <div class="instagram-placeholder">
            <i class="fa fa-instagram" style="font-size: 48px; color: #E4405F;"></i>
            <h5 class="mt-3">Bekijk onze Instagram</h5>
            <p>@${INSTAGRAM_USERNAME}</p>
          </div>
        </a>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <a href="${INSTAGRAM_URL}" target="_blank" class="instagram-grid-item">
          <div class="instagram-placeholder">
            <i class="fa fa-image" style="font-size: 48px; color: #E4405F;"></i>
            <h5 class="mt-3">Recente Projecten</h5>
            <p>Flyers, Thesissen & meer</p>
          </div>
        </a>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <a href="${INSTAGRAM_URL}" target="_blank" class="instagram-grid-item">
          <div class="instagram-placeholder">
            <i class="fa fa-camera" style="font-size: 48px; color: #E4405F;"></i>
            <h5 class="mt-3">Volg Ons</h5>
            <p>Voor dagelijkse updates</p>
          </div>
        </a>
      </div>
    `;

    feedContainer.innerHTML = gridHTML;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createInstagramGrid);
  } else {
    createInstagramGrid();
  }
})();

