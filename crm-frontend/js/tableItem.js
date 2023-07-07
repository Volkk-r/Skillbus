import { modalWindow } from "./modalObj.js";
import createModalWindow from "./modal.js";

// функция  создания одной табличной строки из данных массива
export default function getStudentItem(clientObj) {

  // создаем элементы таблицы

  const tableTR = document.createElement('tr'),
    tableTdID = document.createElement('td'),
    tableTdFIO = document.createElement('td'),
    tableTdCreate = document.createElement('td'),
    tableTdLastChange = document.createElement('td'),
    tableTdContacts = document.createElement('td'),
    ulContacts = getAvatarList(clientObj.contacts),
    tableTdTransform = document.createElement('td'),
    tableTdDelete = document.createElement('td'),
    spanCreateDate = document.createElement('span'),
    spanCreateTime = document.createElement('span'),
    spanUpdateDate = document.createElement('span'),
    spanUpdateTime = document.createElement('span');

  // добавляем классы для стилизации

  tableTR.classList.add('table-row');
  tableTdID.classList.add('table-body-id');
  tableTdFIO.classList.add('table-body-fio');
  tableTdCreate.classList.add('table-body-create');
  tableTdLastChange.classList.add('table-body-update');
  tableTdContacts.classList.add('table-body-contact');
  tableTdTransform.classList.add('table-body-correct');
  tableTdDelete.classList.add('table-body-delete');
  spanCreateDate.classList.add('table-date');
  spanCreateTime.classList.add('table-time');
  spanUpdateDate.classList.add('table-date');
  spanUpdateTime.classList.add('table-time');

  function getDate(DateString) { // функция получения даты из обьекта Date
    let newDate = new Date(DateString);
    let month = newDate.getMonth() + 1;
    let fullDate = newDate.getDate().toString().padStart(2, '0') + '.' + month.toString().padStart(2, '0') + '.' + newDate.getFullYear();
    return fullDate;
  }

  function getTime(TimeDateString) { // функция получения времени из обьекта Date
    let newTime = new Date(TimeDateString);
    let hours = newTime.getHours().toString().padStart(2, '0');
    let minutes = newTime.getMinutes().toString().padStart(2, '0');
    let fullTime = hours + ':' + minutes;
    return fullTime;
  }

  function getAvatarList(contacts) { //создаем список с аватарками контактов
    const ul = document.createElement('ul');
    //создаем комбинированную кнопку
    const li = document.createElement('li');
    const span = document.createElement('span');
    li.classList.add('contact-item');
    span.classList.add('contact-ring');
    li.setAttribute('id', 'comb');
    span.setAttribute('data-value', 'Показать все контакты');
    span.setAttribute('data-type', ' ');
    ul.classList.add('list-reset', 'flex', 'contact-list');

    const amount = contacts.length;
    let visible = true;

    contacts.forEach(function (contact, index) {
      if (index === 4 && amount > 5) {
        //добавляем комбинированную кнопку
        span.innerText = '+' + (amount - index);
        li.append(span);
        ul.append(li);
        visible = false;
      }

      ul.append(getAvatarContacts(contact, visible));
    });

    // добавляем по нажатию на комби кнопку открытие списка контактов
    li.addEventListener('click', function () {
      const contactItem = li.parentNode.querySelectorAll('.contact-item');
      contactItem.forEach(function (contact) {
        if (contact.id) {
          contact.classList.add('blocked');
        } else {
          contact.classList.remove('blocked');
        };
      });
    });

    return ul;
  };

  function getAvatarContacts(contacts, visible) { // функция создания  массива svg контактов клиента
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.classList.add('list-reset', 'contact-item');

    if (!visible) {
      li.classList.add('blocked');
    };

    if (contacts.type === 'Email') {
      img.setAttribute('src', './img/email.svg')
    }
    else if (contacts.type === 'Телефон') {
      img.setAttribute('src', './img/phone.svg')
    }
    else if (contacts.type === 'Facebook') {
      img.setAttribute('src', './img/facebook.svg')
    }
    else if (contacts.type === 'VK') {
      img.setAttribute('src', './img/vk.svg')
    }
    else {
      img.setAttribute('src', './img/another.svg')
    }
    img.setAttribute('data-type', contacts.type + ':');
    img.setAttribute('data-value', contacts.value);

    li.append(img)

    return li;
  }

  // переносим клиента в таблицу из массива
  const transformSvg = '<svg class="table-edit__svg" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 10.5002V13.0002H2.5L9.87333 5.62687L7.37333 3.12687L0 10.5002ZM11.8067 3.69354C12.0667 3.43354 12.0667 3.01354 11.8067 2.75354L10.2467 1.19354C9.98667 0.933535 9.56667 0.933535 9.30667 1.19354L8.08667 2.41354L10.5867 4.91354L11.8067 3.69354Z" fill="#9873FF"/></svg>';
  const deleteSvg = '<svg class="table-edit__svg" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/></svg>'
  tableTdID.textContent = clientObj.id.slice(-6);
  clientObj.fio = clientObj.surname.trim() + ' ' + clientObj.name.trim() + ' ' + clientObj.lastName.trim();
  tableTdFIO.textContent = clientObj.fio;
  spanCreateDate.textContent = getDate(clientObj.createdAt);
  spanCreateTime.textContent = getTime(clientObj.createdAt);
  spanUpdateDate.textContent = getDate(clientObj.updatedAt);
  spanUpdateTime.textContent = getTime(clientObj.updatedAt);
  tableTdTransform.innerHTML = transformSvg + "Изменить"
  tableTdDelete.innerHTML = deleteSvg + "Удалить"

  // помещаем все данные в таблицу

  tableTR.append(tableTdID);
  tableTR.append(tableTdFIO);
  tableTdCreate.append(spanCreateDate, spanCreateTime);
  tableTdLastChange.append(spanUpdateDate, spanUpdateTime);
  tableTdContacts.append(ulContacts);
  tableTR.append(tableTdCreate);
  tableTR.append(tableTdLastChange);
  tableTR.append(tableTdContacts);
  tableTR.append(tableTdTransform);
  tableTR.append(tableTdDelete);

  //кнопка изменить  клиента
  tableTdTransform.addEventListener('click', async function () {
    const clientId = clientObj.id;
    modalWindow.type = 'change';
    //добавляем анимацию загрузки
    const loadIcon = '<svg class="table-edit__svg load__icon" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.00008 6.04008C1.00008 8.82356 3.2566 11.0801 6.04008 11.0801C8.82356 11.0801 11.0801 8.82356 11.0801 6.04008C11.0801 3.2566 8.82356 1.00008 6.04008 1.00008C5.38922 1.00008 4.7672 1.12342 4.196 1.34812" stroke="#9873FF" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/></svg>';
    tableTdTransform.innerHTML = loadIcon + "Изменить"
    tableTdTransform.classList.add("active-color")
    //отправляем запрос  на сервер
    await delay(300)
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const client = await response.json();
    //удаляем анимацию загрузки
    tableTdTransform.innerHTML = transformSvg + "Изменить"
    tableTdTransform.classList.remove("active-color")
    //создаем модальное окно
    createModalWindow(client, modalWindow);
    document.location.hash = 'id' + clientId;

  });
  //кнопка удалить клиента
  tableTdDelete.addEventListener('click', async function () {
    const clientId = clientObj.id;
    modalWindow.type = 'delete';
    //добавляем цвет во время загрузки
    tableTdDelete.classList.add("active-color-delete")
    //отправляем запрос на сервер
    await delay(300)
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const client = await response.json();
    //удаляем цвет
    tableTdDelete.classList.remove("active-color-delete")
    //создаем модальное окно
    createModalWindow(client, modalWindow);
  });

  return tableTR;
}

//задержка для наглядности работы с сервером
const delay = ms => {
  return new Promise(fun => setTimeout(() => fun(), ms));
};
