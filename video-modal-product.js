// Optional: Function to handle clicks on an element with ID "product-video" and take its href
function handleProductVideoClick() {
    var productVideo = document.getElementById('product-video');
    if (productVideo) {
      productVideo.addEventListener('click', function(event) {
        var href = productVideo.getAttribute('href');
        console.log('Clicked on element with ID "product-video" and href:', href);
        if (href.includes('youtube') || href.includes('youth')) {
          videoId = getYouTubeVideoId(href);
          if (videoId) {
            console.log('Video ID extracted:', videoId);
            createYouTubePlayer(videoId);
            event.preventDefault(); // Prevent the default link behavior
            emulateClickOnModalTrigger(); // Emulate click on modal trigger
          }
        }
      });
    }
  }
  
  // Optional: Call the function to handle clicks on the "product-video" element
  handleProductVideoClick();