export class Section {
    constructor ({ renderer }, cardContainer){
        // this._items = items;
        this._renderer = renderer; // 1 готовая карточка
        this._cardContainer = cardContainer;
    }

    //публичный метод, отвечающий за отрисовку всех элементов
    renderItems(cards){ // отрисовка все имеющиеся фото в зависимости от данных массива
        cards.forEach((item) => {
            this._renderer(item)
        })
    }

    //публичный метод, принимающий DOM-элемент и добавляющий его в контейнер
    addItem(element){ // добавление карточки в разметку
        this._cardContainer.prepend(element);
    }
}