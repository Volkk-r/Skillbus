import dropdown from "./dropdown.js";

const typeOfContacts = ['Телефон', 'Facebook', 'VK', 'Email', 'Другое'];

//функция создания блока контактов
export default function createAddContactBlock(contact) {
  const contactsContainer = document.createElement('div'),
    dropdownContainer = document.createElement('div'),
    buttonContactDropdown = document.createElement('button'),
    listContactDropdown = document.createElement('ul'),
    inputContact = document.createElement('input'),
    buttonContactDelete = document.createElement('button'),
    buttonContactDeleteIcon = document.createElement('span');

  contactsContainer.classList.add('container-add');
  dropdownContainer.classList.add('dropdown');
  buttonContactDropdown.classList.add('btn', 'dropdown__btn', 'btn-reset');
  listContactDropdown.classList.add('dropdown__list');
  inputContact.classList.add('contact__input');
  buttonContactDelete.classList.add('contact-delete__btn');
  buttonContactDeleteIcon.classList.add('contact-delete__svg');
  inputContact.setAttribute('type', 'text');
  inputContact.setAttribute('placeholder', 'Введите данные контакта');

  buttonContactDeleteIcon.innerHTML = '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>'
  buttonContactDropdown.textContent = 'Тип контакта';
  typeOfContacts.forEach(function (contactsType) {
    const itemContactDropdown = document.createElement('li');
    itemContactDropdown.classList.add('dropdown__item');
    itemContactDropdown.textContent = contactsType;
    itemContactDropdown.append()
    listContactDropdown.append(itemContactDropdown);
  })

  if (contact) {
    buttonContactDropdown.textContent = contact.type;
    inputContact.value = contact.value;
  };

  buttonContactDelete.append(buttonContactDeleteIcon);

  dropdownContainer.append(buttonContactDropdown);
  dropdownContainer.append(listContactDropdown);

  contactsContainer.append(dropdownContainer);
  contactsContainer.append(inputContact);
  contactsContainer.append(buttonContactDelete);

  buttonContactDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    contactsContainer.remove();
    const contactsBlock = document.querySelector('.modal-add-contact__block');
    const contactsButton = document.querySelector('.modal-add-contact__btn');

    if (contactsBlock) {
      const contactsElements = contactsBlock.querySelectorAll('.container-add');
      if (contactsElements.length === 0) {
        contactsBlock.classList.remove("form-add__btn-block-padding")
      }
      if (contactsElements.length < 10) {
        contactsButton.classList.remove("blocked")
      }
    };
  });

  dropdown(contactsContainer)

  return contactsContainer;
}
