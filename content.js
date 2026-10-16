function injectYoutubeGifButton() {
  // Targets YouTube's comment action buttons container
  const actionButtons = document.querySelectorAll('#footer #buttons, ytd-commentbox #buttons');

  actionButtons.forEach(container => {
    if (container.querySelector('.yt-gif-btn')) return;

    const gifBtn = document.createElement('button');
    gifBtn.type = 'button';
    gifBtn.className = 'yt-gif-btn';
    gifBtn.innerText = '🖼️ Add GIF';

    gifBtn.addEventListener('click', () => {
      const textarea = container.closest('ytd-commentbox').querySelector('#contenteditable-root');
      if (textarea) {
        // Inserts a sample GIF link into the YouTube comment box
        textarea.textContent += " https://giphy.com ";
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    container.insertBefore(gifBtn, container.firstChild);
  });
}

// Keep checking the page as YouTube loads comments dynamically
setInterval(injectYoutubeGifButton, 2000);
