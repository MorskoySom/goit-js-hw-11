import axios from 'axios';
import Notiflix from 'notiflix';
const axios = require('axios');

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
            console.log(`tags arr`, resp.data.hits);
            console.log(`likes`, resp.data.hits[0].likes);
            console.log(`tags`, resp.data.hits[0].tags);
            console.log(`previewURL`, resp.data.hits[0].previewURL);
        })
}






// З объекту интересны только следующие свойства:
// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения.Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.