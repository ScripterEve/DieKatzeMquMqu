const dropDownMenu = document.querySelector('.events-dropdown-menu');
const toggleLinkEvents = document.querySelector('.events-link');

toggleLinkEvents.onclick = function () {
    dropDownMenu.classList.toggle("open")
}