import createModalHead from "./modalHead.js";
import createModalFormElement from "./modalFormElement.js";
import createModalContactsContainer from "./modalContactBlock.js";
import createButtonsForModal from "./modalBtn.js";
import createModalError from "./modalError.js";
import AddDataFromModal from "./modalData.js";
import serverError from "./serverError.js";
import closeModal from "./closeModal.js";
import renderClientsTable from "./renderTable.js";

// функция создания модального окна

export default function createModalWindow(client, modalWindow) {
  const { id, surname, name, lastName, contacts } = client;
  const { type: ModalType, bigButton: bigButtonText, smallButton: smallButtonText } = modalWindow;

  const modal = document.createElement('div');
  const container = document.createElement('div');
  const modalCloseBtn = document.createElement('button');

  modal.classList.add('modal');
  container.classList.add('modal__container');
  modalCloseBtn.classList.add('modal__close-btn');
  modalCloseBtn.setAttribute('data-btn', 'close');

  modalCloseBtn.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.2332 1.73333L15.2665 0.766664L8.49985 7.53336L1.73318 0.766696L0.766515 1.73336L7.53318 8.50003L0.766542 15.2667L1.73321 16.2333L8.49985 9.46669L15.2665 16.2334L16.2332 15.2667L9.46651 8.50003L16.2332 1.73333Z"fill="#B0B0B0" /></svg>'

  container.append(modalCloseBtn);

  let clientId = null;
  if (ModalType === 'change') {
    clientId = id;
  };

  // добавляем шапку модального окна

  const modalHead = createModalHead(modalWindow.title(), clientId);
  container.append(modalHead.header);

  const blockError = createModalError();

  if (ModalType !== 'delete') {
    // добавляем элементы формы и саму форму в модальное окно
    const clietntFormElement = createModalFormElement(surname, name, lastName);
    container.append(clietntFormElement)

    // добавляем блок с контактами
    const contactContainer = createModalContactsContainer(contacts);
    container.append(contactContainer.blockContacts);

    // добавляем блок с ошибками
    container.append(blockError.errorBlock);

  } else {
    container.append(blockError.errorBlock)
    blockError.errorBlock.classList.remove('blocked');
    blockError.errorSpan.textContent = 'Вы действительно хотите удалить данного клиента?';
    blockError.errorSpan.classList.add('modal-text-delete');
    modalHead.header.classList.add('modal__head-delete');
    modalHead.headerTitle.classList.add('modal__title-delete');
  };

  // добавляем блока с кнопками

  const buttonsElement = createButtonsForModal(modalWindow.bigButton(), modalWindow.smallButton());
  container.append(buttonsElement.containerButtons);

  modal.append(container);
  document.body.append(modal);

  //нажатие на большую кнопку
  buttonsElement.bigButton.addEventListener('click', async function (e) {
    e.preventDefault();
    if (ModalType == 'delete') {
      await delay(500);
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
      });
      serverError(response, modal);
      renderClientsTable();
    } else {
      const Value = AddDataFromModal(modal)
      //при успешной валидации добавляем или изменяем клиента
      if (!Value.error) {
        createTransparentBlock(container);
        const bigButtonIcon = buttonsElement.bigButton.querySelector('.modal__btn-big-icon');
        bigButtonIcon.classList.add('display-inline-block');
        if (ModalType == 'new') {
          await delay(500);
          const response = await fetch('http://localhost:3000/api/clients', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Value),
          });
          serverError(response, modal);
          renderClientsTable();
          const client = await response.json();
          closeModal(modal)
        } else if (ModalType == 'change') {
          await delay(500);
          const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Value),
          });
          serverError(response, modal)
          renderClientsTable();
          closeModal(modal)
        };

        bigButtonIcon.classList.remove('display-inline-block');

      } else { //  при не успешной валидации показываем ошибки
        blockError.errorBlock.classList.remove('blocked');
        blockError.errorSpan.innerHTML = Value.error;
      }
    }
  })


  //закрытие модального окна на Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      closeModal(modal)
    }
  });
  //закрытие  модального окна на кнопку "отмена"
  buttonsElement.smallButton.addEventListener("click", async function () {
    if (ModalType !== 'change') {
      closeModal(modal)
    } else {
      await delay(500);
      const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
        method: "DELETE",
      });
      closeModal(modal);
      renderClientsTable();
    }
  })
  //закрытие модального окна на крестик
  modalCloseBtn.addEventListener("click", function () {
    closeModal(modal)
  })

  //закрытие модального окна при клике вне его
  modal.addEventListener('click', function (event) {
    if (!event.target.classList.contains('modal')) {
      return;
    }
    closeModal(modal);
  });

  //для плавности открытия модалки
  const timeoutId = setTimeout(function () {
    modal.classList.add("open");
  }, 100);


  return modal;
}

//функция создания прозрачного слоя во время отправки  данных на сервер
function createTransparentBlock(modal) {
  const div = document.createElement('div')

  div.classList.add("block-input")

  modal.append(div)
}

//задержка для наглядности работы с сервером
const delay = ms => {
  return new Promise(fun => setTimeout(() => fun(), ms));
};
