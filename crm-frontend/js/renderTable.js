import getStudentItem from "./tableItem.js";

// находим тело таблицы и форму фильтрации
const tableBody = document.getElementById('table-body'),
  filterTable = document.getElementById('filter-table');

  //устанавливаем направление и флаги(по умолчанию сортировка по id) для сортировки данных
let direction = true;
let flag = 'id';

// функция рендеринга таблицы

export default async function renderClientsTable() {

  const response = await fetch(`http://localhost:3000/api/clients`);
  const clientList = await response.json();

  tableBody.innerHTML = '';
  let clientsArrayCopy = [...clientList];

  //  обьединяем фио

  for (const client of clientsArrayCopy) {
    client.fio = client.surname + ' ' + client.name + ' ' + client.lastName;
  }

  // активный цвет сортировки

  const sortTh = document.querySelectorAll('.table-sort');
  sortTh.forEach(function (sort) {
    if (sort.id === flag) {
      sort.classList.add('active-color');
    } else {
      sort.classList.remove('active-color')
    };
  })

  //  сортировка
  clientsArrayCopy = clientsArrayCopy.sort(function (a, b) {
    let sort = a[flag] < b[flag];
    if (direction == false) sort = a[flag] > b[flag];
    return sort ? -1 : 1;
  })

  //  фильтрация
  if (filterTable.value.trim() !== '') {
    clientsArrayCopy = clientsArrayCopy.filter(function (item) {
      if (item.fio.includes(filterTable.value.trim())) return true;
    })
  }
  // создание табличной строки с данными
  for (const client of clientsArrayCopy) {
    const newTR = getStudentItem(client);
    tableBody.append(newTR)
  }
}

//находим заголовки столбцов для сортировка
const IdTH = document.getElementById('id'),
  fullNameTH = document.getElementById('fio'),
  createTH = document.getElementById('createdAt'),
  updateTH = document.getElementById('updatedAt');

//прописываем события сортировки

//сортировка по id
IdTH.addEventListener('click', function () {
  flag = 'id';
  direction = !direction;
  const arrowId = document.getElementById("arrow-id");
  if (!direction) {
    arrowId.classList.remove("rotate");
  } else {
    arrowId.classList.add("rotate");
  }
  renderClientsTable();
})

//сортировка по фио
fullNameTH.addEventListener('click', function () {
  flag = 'fio';
  direction = !direction;
  const arrowFio = document.getElementById("arrow-fio");
  const textForward = document.getElementById("text-forward");
  const textReverse = document.getElementById("text-reverse");
  if (!direction) {
    arrowFio.classList.add("rotate");
    textForward.classList.add("blocked");
    textReverse.classList.remove("blocked");
  } else {
    arrowFio.classList.remove("rotate");
    textForward.classList.remove("blocked");
    textReverse.classList.add("blocked");
  }
  renderClientsTable();
})

//сортировка по дате создания
createTH.addEventListener('click', function () {
  flag = 'createdAt';
  direction = !direction;
  const arrowCreate = document.getElementById("arrow-create");
  if (!direction) {
    arrowCreate.classList.add("rotate");
  } else {
    arrowCreate.classList.remove("rotate");
  }
  renderClientsTable();
})

//сортировка по дате обновления
updateTH.addEventListener('click', function () {
  flag = 'updatedAt';
  direction = !direction;
  const arrowUpdate = document.getElementById("arrow-update");
  if (!direction) {
    arrowUpdate.classList.add("rotate");
  } else {
    arrowUpdate.classList.remove("rotate");
  }
  renderClientsTable();
})
