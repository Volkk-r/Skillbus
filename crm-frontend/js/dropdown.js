//функция с событиями дропдауна
export default function dropdown(modal) {
  const dropdowns = modal.querySelectorAll('.dropdown');

  dropdowns.forEach(function (dropdown) {
    const buttonDropdown = dropdown.querySelector('.dropdown__btn');
    const listDropdown = dropdown.querySelector('.dropdown__list');
    const itemsDropdown = listDropdown.querySelectorAll('.dropdown__item');

    buttonDropdown.addEventListener('click', function (event) {
      event.preventDefault();
      listDropdown.classList.toggle('menu-active');
      buttonDropdown.classList.toggle('active');
    })

    itemsDropdown.forEach(function (item) {
      item.addEventListener('click', function (event) {
        event.stopPropagation();
        buttonDropdown.textContent = this.innerText;
        buttonDropdown.focus();
        listDropdown.classList.remove('menu-active');
        buttonDropdown.classList.remove('active');
      });
    });
    document.addEventListener('click', function (event) {
      if (event.target !== buttonDropdown) {
        listDropdown.classList.remove('menu-active');
        buttonDropdown.classList.remove('active');
      };
    });
  });
}
