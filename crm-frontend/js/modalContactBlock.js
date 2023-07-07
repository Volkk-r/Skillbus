import createAddContactBlock from "./modalContact.js";

// функция создания блока контактов для модального окна

export default function createModalContactsContainer(contacts) {
  const blockContacts = document.createElement('div');
  const groupContacts = document.createElement('div');
  const buttonAddContacts = document.createElement('button');
  const buttonAddTextContacts = document.createElement('span');

  blockContacts.classList.add('modal-add-contact__block', 'flex');
  groupContacts.classList.add('modal-add-contact__group', 'flex');
  buttonAddContacts.classList.add('btn-reset', 'modal-add-contact__btn');
  buttonAddTextContacts.classList.add('modal-add-contact__text');

  buttonAddContacts.innerHTML = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99998 3.66659C6.63331 3.66659 6.33331 3.96659 6.33331 4.33325V6.33325H4.33331C3.96665 6.33325 3.66665 6.63325 3.66665 6.99992C3.66665 7.36659 3.96665 7.66659 4.33331 7.66659H6.33331V9.66659C6.33331 10.0333 6.63331 10.3333 6.99998 10.3333C7.36665 10.3333 7.66665 10.0333 7.66665 9.66659V7.66659H9.66665C10.0333 7.66659 10.3333 7.36659 10.3333 6.99992C10.3333 6.63325 10.0333 6.33325 9.66665 6.33325H7.66665V4.33325C7.66665 3.96659 7.36665 3.66659 6.99998 3.66659ZM6.99998 0.333252C3.31998 0.333252 0.333313 3.31992 0.333313 6.99992C0.333313 10.6799 3.31998 13.6666 6.99998 13.6666C10.68 13.6666 13.6666 10.6799 13.6666 6.99992C13.6666 3.31992 10.68 0.333252 6.99998 0.333252ZM6.99998 12.3333C4.05998 12.3333 1.66665 9.93992 1.66665 6.99992C1.66665 4.05992 4.05998 1.66659 6.99998 1.66659C9.93998 1.66659 12.3333 4.05992 12.3333 6.99992C12.3333 9.93992 9.93998 12.3333 6.99998 12.3333Z"fill="#9873FF" /></svg>';
  buttonAddContacts.setAttribute('data-btn', 'contacts-add');
  buttonAddTextContacts.textContent = 'Добавить контакт';

  if (contacts) {
    contacts.forEach(function (contact) {
      const contactBlock = createAddContactBlock(contact);
      groupContacts.append(contactBlock);
    });
    if (groupContacts.childNodes.length !== 0) {
      blockContacts.classList.add("form-add__btn-block-padding")
    }

  };

  buttonAddContacts.addEventListener('click', ((event) => {
    event.preventDefault();
    event.stopPropagation();
    blockContacts.classList.add("form-add__btn-block-padding")
    groupContacts.append(createAddContactBlock())
    if (groupContacts.childNodes.length === 10) {
      buttonAddContacts.classList.add("blocked")
    }
  }))

  buttonAddContacts.append(buttonAddTextContacts);
  blockContacts.append(groupContacts);
  blockContacts.append(buttonAddContacts);


  return {
    blockContacts,
    buttonAddContacts,
    groupContacts
  };
};
