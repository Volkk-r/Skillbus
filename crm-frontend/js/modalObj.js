// обьект модального окна

export const modalWindow = {
  type: "new",
  title: function () {
    let title = null;
    if (this.type === "delete") {
      title = "Удалить клиента"
    } else if (this.type === "change") {
      title = "Изменить данные"
    } else if (this.type === "new") {
      title = "Новый клиент"
    }
    return title;
  },
  bigButton: function () {
    return (this.type === 'delete') ? 'Удалить' : 'Сохранить';
  },
  smallButton: function () {
    return (this.type === 'change') ? 'Удалить клиента' : 'Отмена';
  }
}
