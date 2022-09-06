export class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    /* Приватный метод закрытия поп-апа при нажатии на ESC */
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    /* Публичный метод открытия поп-апов */
    open() {
        this._popupSelector.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscClose);
    };

    /* Публичный метод закрытия поп-апов */
    close() {
        this._popupSelector.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscClose);
    };

    /* Публичный метод добавления слушателя клика иконке закрытия попапа */
    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
                this.close();
            }
        })
    }
}
