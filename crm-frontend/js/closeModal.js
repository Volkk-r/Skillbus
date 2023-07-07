// функция закрытия модального окна

export default function closeModal(modal) {
  modal.classList.remove("open");
  const timeoutId = setTimeout(function () {
    modal.remove();
  }, 300);
  document.location.hash = '';
}
