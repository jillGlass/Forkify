export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results')

}

export const renderLoader = parent => {
    const loader = `
    <div class = 'loader'>
    <svg>
    <use href="img/icons.svg#icon-cw"></use>
    </svg>
    `;
    parent.insertAdjacentHTML('afterbegin', loader)
}