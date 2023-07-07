// функция создания кнопок в модальном окне

export default function createButtonsForModal(bigButtonText, smallButtonText) {
  const containerButtons = document.createElement('div');
  const bigButton = document.createElement('button');
  const bigButtonIcon = document.createElement('span');
  const smallButton = document.createElement('button');

  containerButtons.classList.add('modal__btns', 'flex');
  bigButton.classList.add('modal__btn-big', 'btn-reset');
  smallButton.classList.add('modal__btn-small', 'btn-reset');

  bigButton.setAttribute('data-btn', 'big');
  smallButton.setAttribute('data-btn', 'small');



  bigButtonIcon.innerHTML = '<svg class="modal__btn-big-icon load__icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.03996C1.00008 8.82344 3.2566 11.08 6.04008 11.08C8.82356 11.08 11.0801 8.82344 11.0801 6.03996C11.0801 3.25648 8.82356 0.999956 6.04008 0.999956C5.38922 0.999956 4.7672 1.1233 4.196 1.348" stroke="#B89EFF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg>' + bigButtonText
  smallButton.textContent = smallButtonText;

  bigButton.append(bigButtonIcon);
  containerButtons.append(bigButton);
  containerButtons.append(smallButton);

  return {
    containerButtons,
    bigButton,
    smallButton,
  };
};
