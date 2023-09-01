import axios from 'axios';
import Notiflix from 'notiflix';

const elem = {
    form: document.querySelector(`#search-form`),
    gallery: document.querySelector(`.gallery`)
}

elem.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
    evt.preventDefault();
    let query = elem.form[0].value.trim();

    async function fetchQuerry(query) {
        const params = new URLSearchParams({
            key: "39170790-720d13338eae2dc65ab148b0f",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 40
        })
        return await axios.get(`https://pixabay.com/api/?${params}`)

    }
    fetchQuerry(query)
        .then((resp) => {
            elem.gallery.innerHTML = createMarkup(resp.data.hits)
            Notiflix.Notify.success(`Hooray! We found ${resp.data.totalHits} images`)
        })
        .catch(err => Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'))

    function createMarkup(arr) {
        return arr.map(({ likes, views, comments, downloads, tags, webformatURL, largeImageURL }) => `<div class="photo-card">
            
                <img class="img-size" src="${webformatURL}" alt="${tags}" loading="lazy" />
            
            <div class="info">
                <p class="info-item"><b>Likes</b><br /> ${likes}</p>                
                <p class="info-item"><b>Views</b><br /> ${views}</p>
                <p class="info-item"><b>Comments</b><br /> ${comments}</p>
                <p class="info-item"><b>Downloads</b><br /> ${downloads}</p>
            </div>
            </div>`).join('');
    }
}





