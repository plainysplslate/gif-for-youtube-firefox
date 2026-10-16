function injectGifSystem() {
  // Find YouTube's comment text boxes
  const actionButtons = document.querySelectorAll('#footer #buttons, ytd-commentbox #buttons');

  actionButtons.forEach(container => {
    if (container.querySelector('.yt-gif-toggle-btn')) return;

    // 1. Create the Main Toggle Button
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'yt-gif-toggle-btn';
    toggleBtn.innerText = 'GIF';

    // 2. Create the GIPHY Picker Window Dropdown
    const picker = document.createElement('div');
    picker.className = 'yt-gif-picker-panel hidden';
    picker.innerHTML = `
      <input type="text" class="gif-search-input" placeholder="Search GIPHY...">
      <div class="gif-results-grid"></div>
    `;

    // Toggle picker panel visibility on click
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      picker.classList.toggle('hidden');
    });

    // 3. Simple Search Logic (Using Trending/Public Fallbacks)
    const searchInput = picker.querySelector('.gif-search-input');
    const resultsGrid = picker.querySelector('.gif-results-grid');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      if(query.length > 2) {
        // Mocking a response array. For a live setup, replace this with a real fetch('GIPHY_API_URL')
        const dummyGifs = [
          'https://giphy.com',
          'https://giphy.com'
        ];
        
        resultsGrid.innerHTML = '';
        dummyGifs.forEach(gifUrl => {
          const img = document.createElement('img');
          img.src = gifUrl;
          img.className = 'selectable-gif-thumb';
          img.addEventListener('click', () => {
            const textarea = container.closest('ytd-commentbox').querySelector('#contenteditable-root');
            if (textarea) {
              // Appends the raw shortcode url that YouTube reads as a native GIF embed
              textarea.textContent += ` ${gifUrl} `;
              textarea.dispatchEvent(new Event('input', { bubbles: true }));
              picker.classList.add('hidden'); // Close panel
            }
          });
          resultsGrid.appendChild(img);
        });
      }
    });

    // Place layout item into YouTube UI
    container.insertBefore(toggleBtn, container.firstChild);
    container.appendChild(picker);
  });
}

// Automatically monitor dynamic element switches on standard SPA loads
setInterval(injectGifSystem, 2500);
