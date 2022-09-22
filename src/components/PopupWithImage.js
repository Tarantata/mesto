import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._inputLinkPicture = document.querySelector('.popup__picture-link');
        this._inputNamePicture = document.querySelector('.popup__picture-name');
    }

    /* Публичный метод открытия поп-апа */
    open(item) {
        this._inputLinkPicture.src = item.src;
        this._inputLinkPicture.alt = item.alt;
        this._inputNamePicture.textContent = item.alt;
        super.open();
    }
}
