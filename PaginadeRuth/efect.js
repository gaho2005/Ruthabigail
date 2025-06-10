const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
let currentIndex = 0;
let galleryImages = Array.from(document.querySelectorAll('.image-container'));
galleryImages.forEach((container, index) => {
  container.addEventListener('click', () => {
    const clickedImage = container.querySelector('img');
    lightboxImage.src = clickedImage.src;
    currentIndex = index;
    lightbox.classList.add('active');
    showBigHeart();
  });
});
document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightboxImage();
});

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
});

document.querySelector('.close-btn').addEventListener('click', () => {
  closeLightbox();
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
document.addEventListener('keydown', (e) => {
  if (lightbox.classList.contains('active')) {
    if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      updateLightboxImage();
    }
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      updateLightboxImage();
    }
    if (e.key === 'Escape') {
      closeLightbox();
    }
  }
});
function updateLightboxImage() {
  const newImage = galleryImages[currentIndex].querySelector('img');
  lightboxImage.src = newImage.src;
  showBigHeart();
}
function closeLightbox() {
  lightbox.classList.remove('active');
  const existingHeart = lightbox.querySelector('.big-heart');
  if (existingHeart) existingHeart.remove();
}
function showBigHeart() {
  const heart = document.createElement('div');
  heart.className = 'big-heart';
  heart.textContent = '❤️';
  lightbox.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 1200);
}
let lastHeartTime = 0;
document.addEventListener('mousemove', function (e) {
  const now = Date.now();
  if (now - lastHeartTime < 100) return;
  lastHeartTime = now;

  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.innerHTML = '❤️';
  heart.style.left = e.clientX + 'px';
  heart.style.top = e.clientY + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
});
