import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryLightBox = new SimpleLightbox('.gallery a');

let currentPage = 1;
let ELEM = false;
let query;

const elem = {
    form: document.querySelector(`#search-form`),
    gallery: document.querySelector(`.gallery`),
    guard: document.querySelector(`.js-guard`)
}
elem.form.addEventListener('submit', handlerSubmit);
function handlerSubmit(evt) {
    evt.preventDefault();
    elem.gallery.innerHTML = ``;
    currentPage = 1;
    query = elem.form[0].value.trim();
    let allImagesLoaded = false;
    if (ELEM) {
        return;
    }
    ELEM = true;
    fetchQuerry(query, currentPage)
        .then((resp) => {
            ELEM = false;
            if (resp.data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
            } else {
                elem.gallery.insertAdjacentHTML(`beforeend`, createMarkup(resp.data.hits))
                galleryLightBox.refresh()
                Notiflix.Notify.success(`Hooray! We found ${resp.data.totalHits} images`)
                const { height: cardHeight } = document
                    .querySelector(".gallery")
                    .firstElementChild.getBoundingClientRect();
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: "smooth",
                });
            }
            observer.observe(elem.guard);
        })
        .catch(err => {
            ELEM = false;
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
        })
    function createMarkup(arr) {
        return arr.map(({ likes, views, comments, downloads, tags, webformatURL, largeImageURL }) =>
            `<div class="photo-card">
            <a href="${largeImageURL}" class="lightbox-link">
            <img class="img-size" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b><br /> ${likes}</p>
                <p class="info-item"><b>Views</b><br /> ${views}</p>
                <p class="info-item"><b>Comments</b><br /> ${comments}</p>
                <p class="info-item"><b>Downloads</b><br /> ${downloads}</p>
            </div>
            </div>`).join('');
    }
    const options = {
        rootMargin: "300px",
    }
    const observer = new IntersectionObserver(handlerLoadMore, options);
    function handlerLoadMore(entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !allImagesLoaded) {
                currentPage += 1;
                if (ELEM) {
                    return;
                }
                ELEM = true;
                fetchQuerry(query, currentPage)
                    .then((resp) => {
                        ELEM = false;
                        elem.gallery.insertAdjacentHTML(`beforeend`, createMarkup(resp.data.hits))
                        galleryLightBox.refresh()
                        if (resp.data.hits.length === 0) {
                            allImagesLoaded = true;
                        }
                        const { height: cardHeight } = document
                            .querySelector(".gallery")
                            .firstElementChild.getBoundingClientRect();
                        window.scrollBy({
                            top: cardHeight * 2,
                            behavior: "smooth",
                        });
                    })
                    .catch(err => {
                        ELEM = false;
                        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                    })
            }
        });
    }
}
async function fetchQuerry(query, currentPage = `1`) {
    const params = new URLSearchParams({
        key: "39170790-720d13338eae2dc65ab148b0f",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
        page: currentPage
    })
    return await axios.get(`https://pixabay.com/api/?${params}`)
}


