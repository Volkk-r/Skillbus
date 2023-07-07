import closeModal from "./closeModal.js";
import { modalWindow } from "./modalObj.js";

//функция с добавлением ошибок с сервера
export default async function serverError(response, modal) {
  let info;
  const blockError = modal.querySelector('.modal-error');
  const spanError = blockError.querySelector('.modal-error__text');

  if (response.status === 200 || response.status === 201) {
    closeModal(modal)
  } else {
    if (modalWindow.type !== 'delete') {
      if (response.status === 500) {
        info = `Ошибка работы сервера. ${response.status}.`;
      } else {
        if (response.status === 404) {
          info = 'Данные не сохранены. Ответ сервера - 404. Не удалось найти запрашиваемую страницую.';
          return;
        } else if (response.status === 422) {
          const errors = await response.json();
          errors.errors.forEach(function (error) {
            if (info) {
              info = info + ' <br> ' + error.message;
            } else {
              info = error.message;
            }
          });
          return;
        } else {
          info = '"Что-то пошло не так..."';
          return;
        }
      };
    };

    blockError.classList.remove('blocked');
    spanError.innerHTML = info;
  }
};
