// Instagram Feed Loader for The Printing Shop Antwerpen
// Uses Behold.so free widget - no API key required

(function() {
  'use strict';

  // Behold Widget Configuration
  // To get your Behold feed ID:
  // 1. Go to https://behold.so/
  // 2. Connect your Instagram account (free)
  // 3. Copy your feed ID and replace 'BEHOLD_FEED_ID' below

  const BEHOLD_FEED_ID = 'YOUR_BEHOLD_FEED_ID_HERE';

  function loadBeholdWidget() {
    const feedContainer = document.getElementById('instagram-feed');

    if (!feedContainer) {
      return;
    }

    // Check if Behold ID is configured
    if (BEHOLD_FEED_ID === 'YOUR_BEHOLD_FEED_ID_HERE') {
      // Show temporary placeholder with instructions
      feedContainer.innerHTML = `
        <div class="col-12 text-center p-5">
          <h4>Instagram Feed komt binnenkort!</h4>
          <p>Volg ons op <a href="https://www.instagram.com/theprintingshopantwerpen/" target="_blank" style="color: #eb252eff;">@theprintingshopantwerpen</a></p>
          <p class="small text-muted">Configureer Behold.so in js/instagram-feed.js</p>
        </div>
      `;
      return;
    }

    // Load Behold widget
    feedContainer.innerHTML = '<figure data-behold-id="' + BEHOLD_FEED_ID + '"></figure>';

    // Load Behold script
    const script = document.createElement('script');
    script.src = 'https://w.behold.so/widget.js';
    script.type = 'module';
    document.body.appendChild(script);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBeholdWidget);
  } else {
    loadBeholdWidget();
  }
})();

