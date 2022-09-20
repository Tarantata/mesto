import {Popup} from "./Popup.js";
import {selectorsConfig} from "../pages/index.js";

export class PopupWithSubmit extends Popup{
    constructor(popupSelector, submitConfirm) {
        super(popupSelector);
        this._submitConfirm = submitConfirm;
        this._form = this._getForm();
    }

    _getForm() {
        return this._popupSelector.querySelector(selectorsConfig.form)
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitConfirm();
            this.close()
        })
        super.setEventListeners()
    }
}