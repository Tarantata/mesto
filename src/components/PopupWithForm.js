import {Popup} from "./Popup.js";
import {selectorsConfig} from "../utils/constants.js"

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._getForm();
        this._inputs = Array.from(this._form.querySelectorAll(selectorsConfig.input));
    }

   _getForm() {
        return this._popup.querySelector(selectorsConfig.form)
   }

    /* Приватный метод сбора данных всех полей формы */
    _getInputValues() {
        this._inputValue = {};
        this._inputs.forEach((input) => {
            this._inputValue[input.name] = input.value
        })
        return this._inputValue;
    }

    /* Публичный метод добавления слушателя клика иконке закрытия попапа */
    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            // this.close()
        })
        super.setEventListeners()
    }

    /* Публичный метод закрытия поп-апов */
    close() {
        this._form.reset();
        super.close();
    };

}

