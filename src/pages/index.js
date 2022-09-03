import './index.css';

import {Card} from "../components/Card.js";
import {initialCards} from "../utils/cards.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Validation} from "../components/FormValidator.js";
import {buttonOpenEditPerson, inputJobPerson, jobProfile, nameProfile, inputNamePerson, formPerson, popupTypePerson, popupBigPictureImage, popupNewPlace, formPlace, buttonOpenNewPlace, cardContent} from "../utils/constants.js";

export const selectorsConfig = {
    form: '.form',
    button: '.popup__button',
    input: '.popup__input',
    buttonInvalid: 'popup__button_invalid',
    inputRedBorder: 'popup__input_error',
    inputError: 'error',
    errorActive: 'error_active',
    card: '.card',
    cardTemplateTypePlace: '.card-template_type_place',
};

const personInfo = new UserInfo( {
    personSelector: nameProfile,
    jobSelector: jobProfile
})

const personPopup = new PopupWithForm(popupTypePerson,
    (profileInfo) => {
    personInfo.setUserInfo(profileInfo)
});

buttonOpenEditPerson.addEventListener('click', () => {
    personPopup.open();
    const {title, subtitle} = personInfo.getUserInfo();
    inputNamePerson.value = title;
    inputJobPerson.value = subtitle;
    popupPersonValid.clearSpan();
    popupPersonValid.activateButton();
})

const pictureBigSize = new PopupWithImage(popupBigPictureImage);

// функция отрисоки 1 карточки
const createCard = (pictureData) => {
    const picture = new Card({
        data: pictureData,
        handleCardClick: (photo) => {
            pictureBigSize.open(photo);
        }
    }, selectorsConfig.cardTemplateTypePlace);
    return picture.generateCard();
}

const cardSection = new Section({
    items: initialCards,
    renderer: (initialCardsElement) => {
        const photoCard = createCard(initialCardsElement) // вызвали функцию отрисовки карточки
        cardSection.addItem(photoCard) // добавили карточку в ДОМ
    } // выполнится для каждго элемента массива (столько раз сколько этих элементов)
}, cardContent);

const placePopup = new PopupWithForm(popupNewPlace,
    (inputInfo) => {
        const newCard = createCard(inputInfo);
        cardSection.addItem(newCard)
    });

buttonOpenNewPlace.addEventListener('click', () => {
    placePopup.open();
    popupPlaceValid.clearSpan();
    popupPlaceValid.deactivateButton();
})

personPopup.setEventListeners();
pictureBigSize.setEventListeners();
placePopup.setEventListeners();

cardSection.renderItems() // выполнили метод отрисовки

/* Проверка валидности */
const popupPersonValid = new Validation(selectorsConfig, formPerson);
popupPersonValid.enableValidation();
const popupPlaceValid = new Validation(selectorsConfig, formPlace);
popupPlaceValid.enableValidation();