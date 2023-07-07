// функция создания формы и ее элементов в модальном окне

export default function createModalFormElement(surname, name, lastName) {

  const formModal = document.createElement('form');
  const contactSurname = document.createElement('div');
  const inputSurname = document.createElement('input');
  const labelSurname = document.createElement('label');
  const textSurname = document.createElement('span');
  const starSurname = document.createElement('span');
  const contactName = document.createElement('div');
  const inputName = document.createElement('input');
  const labelName = document.createElement('label');
  const starName = document.createElement('span');
  const textName = document.createElement('span');
  const contactLastname = document.createElement('div');
  const inputLastname = document.createElement('input');
  const labelLastname = document.createElement('label');
  const textLastname = document.createElement('span');

  formModal.classList.add('modal__form');

  contactSurname.classList.add('form__group');
  inputSurname.classList.add('form__input');
  labelSurname.classList.add('form__placeholder');
  textSurname.classList.add('placeholder-text');
  starSurname.classList.add('placeholder-star');
  contactName.classList.add('form__group');
  inputName.classList.add('form__input');
  labelName.classList.add('form__placeholder');
  textName.classList.add('placeholder-text');
  starName.classList.add('placeholder-star');
  contactLastname.classList.add('form__group');
  inputLastname.classList.add('form__input');
  labelLastname.classList.add('form__placeholder');
  textLastname.classList.add('placeholder-text');

  formModal.setAttribute('action', '#');
  formModal.setAttribute('id', 'form-modal');
  inputSurname.setAttribute('id', 'surname');
  inputSurname.setAttribute('data-input', 'surname');
  inputSurname.setAttribute('type', 'text');
  inputSurname.setAttribute('name', 'surname');
  inputSurname.setAttribute('placeholder', '  ');
  labelSurname.setAttribute('for', 'surname');
  inputName.setAttribute('id', 'name');
  inputName.setAttribute('data-input', 'name');
  inputName.setAttribute('type', 'text');
  inputName.setAttribute('name', 'name');
  inputName.setAttribute('placeholder', '  ');
  labelName.setAttribute('for', 'name');
  inputLastname.setAttribute('id', 'lastname');
  inputLastname.setAttribute('data-input', 'lastname');
  inputLastname.setAttribute('type', 'text');
  inputLastname.setAttribute('name', 'lastname');
  inputLastname.setAttribute('placeholder', '  ');
  labelLastname.setAttribute('for', 'lastname');

  textSurname.textContent = 'Фамилия';
  starSurname.textContent = '*';
  textName.textContent = 'Имя';
  starName.textContent = '*';
  textLastname.textContent = 'Отчество';

  if (surname) {
    inputSurname.value = surname;
  };

  if (name) {
    inputName.value = name;
  };

  if (lastName) {
    inputLastname.value = lastName;
  };

  labelSurname.append(textSurname, starSurname);
  labelName.append(textName, starName);
  labelLastname.append(textLastname);

  contactSurname.append(inputSurname);
  contactSurname.append(labelSurname);
  contactName.append(inputName);
  contactName.append(labelName);
  contactLastname.append(inputLastname);
  contactLastname.append(labelLastname);
  formModal.append(contactSurname)
  formModal.append(contactName)
  formModal.append(contactLastname)

  return formModal;
}
