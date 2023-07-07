// функция создание шапки модального окна

export default function createModalHead(title, clientId) {
  const header = document.createElement('div');
  const headerTitle = document.createElement('h3');
  header.classList.add('modal__head', 'flex');
  headerTitle.classList.add('modal__title');

  headerTitle.textContent = title;

  header.append(headerTitle);

  if (clientId) {
    const headerId = document.createElement('span');
    headerId.classList.add('modal__id');
    headerId.innerText = `ID: ${clientId}`;
    header.append(headerId);
  }

  return {
    header,
    headerTitle,
  };
}
