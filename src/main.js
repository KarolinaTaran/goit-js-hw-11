import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '41588863-34d6c5c01e7f0c7c667666520';

const searchInput = document.querySelector('#search-input');
const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('.loader');
const form = document.querySelector('#search-form');
const lightbox = new SimpleLightbox('#image-container a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const query = searchInput.value.trim();

  if (!query) {
    clearImages();
    return;
  }

  loader.style.display = 'block';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      loader.style.display = 'none';
      if (Array.isArray(data.hits) && data.hits.length > 0) {
        renderImages(data.hits);
        lightbox.refresh();
        searchInput.value = '';
      } else {
        clearImages();
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: 'white',
          backgroundColor: 'red',
          position: 'topRight',
        });
        searchInput.value = '';
      }
    })
    .catch(() => {
      loader.style.display = 'none';
      console.error('Error!');
    });
}

function renderImages(images) {
  clearImages();
  images.map(image => {
    const imageCard = `
      <div class="image-card">
        <a href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}">
          <div class="image-info">
            <p><strong>Likes:</strong> ${image.likes}</p>
            <p><strong>Views:</strong> ${image.views}</p>
            <p><strong>Comments:</strong> ${image.comments}</p>
            <p><strong>Downloads:</strong> ${image.downloads}</p>
          </div>
        </a>
      </div>
    `;
    imageContainer.innerHTML += imageCard;
  });
}

function clearImages() {
  imageContainer.innerHTML = '';
}
