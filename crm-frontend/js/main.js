import createModalWindow from "./modal.js";
import renderClientsTable from "./renderTable.js";
import { modalWindow } from "./modalObj.js";

// находим тело таблицы и форму фильтрации
const formFilter = document.getElementById('form-filter');

tooltips();

renderClientsTable();

const addClientBtn = document.getElementById('add-clients__btn');
addClientBtn.addEventListener('click', function () {
  modalWindow.type = 'new';
  createModalWindow('', modalWindow);
});

function tooltips() { //функция с тултипами
  let tooltipElememt, tooltipTypeElement, tooltipValueElement;
  document.addEventListener('mouseover', function (event) {
    let target = event.target;
    let tooltipType = target.dataset.type;
    let tooltipValue = target.dataset.value;

    if (!tooltipType && !tooltipValue) return;

    tooltipElememt = document.createElement('div');
    tooltipValueElement = document.createElement('span');
    tooltipTypeElement = document.createElement('span');

    tooltipElememt.classList.add('tooltip');
    tooltipValueElement.classList.add('tooltip-value');
    tooltipTypeElement.classList.add('tooltip__title');

    tooltipTypeElement.innerText = tooltipType;
    tooltipElememt.append(tooltipTypeElement);

    tooltipValueElement.innerText = tooltipValue;

    tooltipElememt.append(tooltipValueElement);
    document.body.append(tooltipElememt);

    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElememt.offsetWidth) / 2;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElememt.offsetHeight - 10;
    if (top < 0) {
      top = coords.top + target.offsetHeight + 10;
    };

    tooltipElememt.style.left = left + 'px';
    tooltipElememt.style.top = top + 'px';
    tooltipElememt.style.opacity = 1;
  });

  document.addEventListener('mouseout', function () {
    if (tooltipElememt) {
      tooltipElememt.remove();
      tooltipElememt = null;
    };
  });
};

//фильтрация по запросу с задержкой 500мс

function Delay() {
  renderClientsTable();
  if (TimeOutID) {
    clearTimeout(TimeOutID);
  }
}

formFilter.addEventListener('input', function (e) {
  e.preventDefault();
  TimeOutID = setTimeout(Delay, 500);
})
formFilter.addEventListener('submit', function (e) {
  e.preventDefault();
})

//открытие клиента по hash ссылке
async function openHash() {
  if (document.location.hash) {
    const clientId = document.location.hash.split('id')[1];
    modalWindow.type = 'change';
    const response = await fetch(`http://localhost:3000/api/clients/${clientId}`);
    const client = await response.json();
    createModalWindow(client, modalWindow);
  };
}
openHash()
