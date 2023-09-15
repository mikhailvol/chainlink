// Declare global variables to store the YouTube player and videoId
var player;
var videoId;

// Function to extract the video ID from a YouTube URL
function getYouTubeVideoId(url) {
  var videoId = '';
  var match = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i.exec(url);
  if (match && match[1]) {
    videoId = match[1];
  }
  return videoId;
}

// Function to create a new YouTube player
function createYouTubePlayer(videoId) {
  console.log('Creating YouTube player with video ID:', videoId);
  if (player) {
    // Destroy the existing player if it exists
    player.destroy();
  }
  player = new YT.Player('ytb-player', {
    height: '390',
    width: '640',
    videoId: videoId, // Set the video ID
    playerVars: {
      'autoplay': 1, // Enable autoplay
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Function to handle when the YouTube player is ready
function onPlayerReady(event) {
  console.log('YouTube player is ready.');
  // Set the videoId variable to the current video's ID
  videoId = event.target.getVideoData().video_id;
  // You can perform any actions you want here when the player is ready.
}

// Function to handle when the YouTube player's state changes
function onPlayerStateChange(event) {
  console.log('YouTube player state has changed.');
  // Handle player state changes here.
}

// Function to initialize the YouTube API
function loadYouTubeAPI() {
  console.log('Loading YouTube API.');
  // This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api?origin=https://testflow-q32023-656b76d57aa7a113f66ed98.webflow.io/";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Function to emulate a click on the element with class "video-modal-trigger"
function emulateClickOnModalTrigger() {
  console.log('Emulating click on element with class "video-modal-trigger".');
  var modalTrigger = document.querySelector('.video-modal-trigger');
  modalTrigger.click();
}

// Function to handle card clicks
function handleCardClick(event) {
  var card = event.target.closest('.card-base'); // Find the closest card-base element
  if (!card) return; // If not a card, do nothing
  var href = card.getAttribute('href');
  console.log('Clicked on card with href:', href);
  if (href.includes('youtube') || href.includes('youth')) {
    videoId = getYouTubeVideoId(href);
    if (videoId) {
      console.log('Video ID extracted:', videoId);
      createYouTubePlayer(videoId);
      event.preventDefault(); // Prevent the default link behavior
      emulateClickOnModalTrigger(); // Emulate click on modal trigger
    }
  }
}

// Function to start playing the video when a specific element is clicked
function startVideoOnModalTrigger() {
  console.log('Adding click listener to element with class "video-modal-trigger" to start the video.');
  var modalTrigger = document.querySelector('.video-modal-trigger');
  modalTrigger.addEventListener('click', function() {
    if (player) {
      console.log('Starting the video.');
      player.playVideo();
    }
  });
}

// Function to stop the video and destroy the player
function stopVideoAndDestroyPlayer() {
  console.log('Stopping the video and destroying the player.');
  if (player) {
    player.stopVideo();
    player.destroy();
  }
}

// Function to add click event listeners to elements with class "card-base"
function addClickListenersToCards() {
  console.log('Adding click listeners to elements with class "card-base".');
  var cards = document.querySelectorAll('.card-base');
  cards.forEach(function(card) {
    card.addEventListener('click', handleCardClick);
  });
}

// Function to add click event listeners to close elements
function addCloseListeners() {
  console.log('Adding click listeners to elements with class "video-modal-overlay" and "video-modal-close".');
  var modalOverlay = document.querySelector('.video-modal-overlay');
  var modalClose = document.querySelector('.video-modal-close');
  modalOverlay.addEventListener('click', function() {
    console.log('Modal overlay clicked.');
    stopVideoAndDestroyPlayer();
  });
  modalClose.addEventListener('click', function() {
    console.log('Close button clicked.');
    stopVideoAndDestroyPlayer();
  });
}

// Wait for the DOM to fully load before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
  loadYouTubeAPI(); // Load the YouTube API
  addClickListenersToCards(); // Listen for card clicks
  addCloseListeners(); // Listen for modal close events
  startVideoOnModalTrigger(); // Start video on modal trigger click
});