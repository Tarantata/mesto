export class Validation {
    constructor (validationData, formType) {
        this._form = validationData.form;
        this._button = validationData.button;
        this._input = validationData.input; 
        this._buttonInvalid = validationData.buttonInvalid;
        this._inputRedBorder = validationData.inputRedBorder;
        this._inputError = validationData.inputError;
        this._errorActive = validationData.errorActive;        
        this._formType = formType;
    }

    _showInputError(inputElement, errorMessage) {
      const inputName = inputElement.getAttribute('name');
      const errorElement = this._formType.querySelector(`#${inputName}-error`);
      inputElement.classList.add(this._inputRedBorder);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorActive);
    }

    _hideInputError(inputElement) {
      const inputName = inputElement.getAttribute('name');
      const errorElement = this._formType.querySelector(`#${inputName}-error`);
      inputElement.classList.remove(this._inputRedBorder);
      errorElement.classList.remove(this._errorActive);
      errorElement.textContent = '';
    }

    _isValid(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

    _toggleButtonState() {
      if (this._hasInvalidInput()) {            
        this.deactivateButton();
      } else {        
        this.activateButton();
      }
    }

    _hasInvalidInput() {
      return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
    }

    enableValidation() {      
      this._inputList = Array.from(this._formType.querySelectorAll(this._input));
      this._submitButton = this._formType.querySelector(this._button);

      this._toggleButtonState();
    
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState();
        });
      });
    }

    clearSpan() {         
      this._inputList.forEach((input) => {
        this._hideInputError(input)
      })
    }
    /* активация кнопки Submit для открытия формы Person */
    activateButton() {      
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._buttonInvalid);
    }
    /* деактивация кнопки Submit для открытия формы Place */
    deactivateButton () {      
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._buttonInvalid);
    }
}