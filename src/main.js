import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const apiKey = '41588863-34d6c5c01e7f0c7c667666520';

const searchInput = document.getElementById('search-input');
const imageContainer = document.getElementById('image-container');
const loader = document.querySelector('.loader');

document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
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
  });

function renderImages(images) {
  clearImages();

  images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.classList.add('image-card');

    const imageLink = document.createElement('a');
    imageLink.href = image.largeImageURL;

    const imageElement = document.createElement('img');
    imageElement.src = image.webformatURL;
    imageElement.alt = image.tags;

    const imageInfo = document.createElement('div');
    imageInfo.classList.add('image-info');

    const likes = document.createElement('p');
    likes.innerHTML = `<strong>Likes:</strong> ${image.likes}`;

    const views = document.createElement('p');
    views.innerHTML = `<strong>Views:</strong> ${image.views}`;

    const comments = document.createElement('p');
    comments.innerHTML = `<strong>Comments:</strong> ${image.comments}`;

    const downloads = document.createElement('p');
    downloads.innerHTML = `<strong>Downloads:</strong> ${image.downloads}`;

    imageInfo.appendChild(likes);
    imageInfo.appendChild(likes);
    imageInfo.appendChild(views);
    imageInfo.appendChild(comments);
    imageInfo.appendChild(downloads);

    imageLink.appendChild(imageElement);
    imageLink.appendChild(imageInfo);
    imageCard.appendChild(imageLink);
    imageContainer.appendChild(imageCard);
  });
  const lightbox = new SimpleLightbox('#image-container a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

function clearImages() {
  imageContainer.innerHTML = '';
}
