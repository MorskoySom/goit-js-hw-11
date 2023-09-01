import axios from 'axios';
import Notiflix from 'notiflix';

// axios.defaults.headers.common["x-api-key"] = "39170790-720d13338eae2dc65ab148b0f";

const elem = {
    form: document.querySelector(`#search-form`),
    gallery: document.querySelector(`.gallery`)
}
console.log(elem.form);

elem.form.addEventListener('submit', handlerSubmit);

function handlerSubmit(evt) {
    evt.preventDefault();
    console.log(elem.form[0].value.trim());
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
        .then(resp => {
            // elem.gallery.insertAdjacentHTML('beforeend', createMarkup(response.data));
            // console.log(`data`, data);
            console.log(`tags`, resp.data);
            // console.log(`tags arr`, resp.data.hits);
            // console.log(`likes`, resp.data.hits[0].likes);
            // console.log(`tags`, resp.data.hits[0].tags);
            // console.log(`previewURL`, resp.data.hits[0].previewURL);
        })

    function createMarkup(arr) {
        return arr.map(({ likes, views, comments, downloads, tags, webformatURL, largeImageURL }) => `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes: ${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views ${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments ${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads ${downloads}</b>
                </p>
            </div>
            </div>`).join('');
    }
}






