import {Popup} from "./Popup.js";
import {inputLinkPicture, inputNamePicture} from "../utils/constants.js"

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    /* Публичный метод открытия поп-апа */
    open(item) {
        inputLinkPicture.src = item.src;
        inputLinkPicture.alt = item.alt;
        inputNamePicture.textContent = item.alt;
        super.open();
    }

}
//
//
// /* Вызов формы увеличения картинки */
// function handleCardClick(name, link) {
//     openPopup(popupBigPictureImage);
//     // inputLinkPicture.src = link;
//     // inputLinkPicture.alt = name;
//     inputNamePicture.textContent = name;
// }