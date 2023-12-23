const btn = document.querySelector('.j-btn-test');
const btnIcon = document.querySelector('.btn_icon');

btn.addEventListener('click', () => {
    btnIcon.classList.toggle('btn_icon-light');
})