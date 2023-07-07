export default function createModalError() {
  const errorBlock = document.createElement('div');
  const errorSpan = document.createElement('span');

  errorBlock.classList.add('modal-error', 'blocked');
  errorSpan.classList.add('modal-error__text');

  errorBlock.classList.remove('blocked');

  errorBlock.append(errorSpan);

  return {
    errorBlock,
    errorSpan,
  };
};
