// функция получения данных из формы модального окна с простой валидацией
export default function AddDataFromModal(modal) {
  let error = '';
  const surnameElement = modal.querySelector('#surname'),
    surname = surnameElement.value.trim();
  const nameElement = modal.querySelector('#name'),
    name = nameElement.value.trim();
  const lastNameElement = modal.querySelector('#lastname'),
    lastName = lastNameElement.value.trim();

  if (surname === "") {
    surnameElement.classList.add('border-bottom-error');
    if (error) {
      error = error + '<br>';
    }
    error = error + 'Вы не ввели фамилию клиента';
  };

  if (name === "") {
    nameElement.classList.add('border-bottom-error');
    if (error) {
      error = error + '<br>';
    }
    error = error + 'Вы не ввели имя клиента';
  };

  const contacts = [];
  const contactsItems = modal.querySelectorAll('.container-add');

  contactsItems.forEach(function (contactsItem) {
    const typeElement = contactsItem.querySelector('.dropdown__btn');
    const type = typeElement.innerText;
    if (type === 'Тип контакта') {
      typeElement.classList.add('border-error');
      if (error) {
        error = error + '<br>';
      }
      error = error + 'Вы не установили тип контакта';

    }

    const valueElement = contactsItem.querySelector('.contact__input');
    const value = valueElement.value.trim();
    if (value === "") {
      value.classList.add('input-border-error');
      if (error) {
        error = error + '<br>';
      }
      error = error + 'Вы не ввели контактные данные';
    }

    const objContact = {
      type,
      value,
    };
    contacts.push(objContact);
  });
  return {
    name,
    surname,
    lastName,
    contacts,
    error
  };
};
