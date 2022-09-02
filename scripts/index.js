import {Card} from "./Card.js";
import {initialCards} from "./cards.js";
import {PopupWithImage} from "./PopupWithImage.js";
import {Section} from "./Section.js";
import {UserInfo} from "./UserInfo.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {Popup} from "./Popup.js";
import {Validation} from "./FormValidator.js";

const buttonOpenEditPerson = document.querySelector('.profile__edit');
const buttonOpenNewPlace = document.querySelector('.profile__add');
export const popupNewPlace = document.querySelector('.popup_type_card');
export const popupTypePerson = document.querySelector('.popup_type_person');
export const formPerson = document.querySelector('.popup__form-person');
export const formPlace = document.querySelector('.popup__form-place');
export const nameProfile = document.querySelector('.profile__title');
export const jobProfile = document.querySelector('.profile__subtitle');
export const inputNamePerson = document.querySelector('.popup__input_person-name');
export const inputJobPerson = document.querySelector('.popup__input_person-profession');
// export const inputNamePlace = document.querySelector('.popup__input_place-name');
// export const inputLinkPlace = document.querySelector('.popup__input_place-link');
const cardContent = document.querySelector('.content');
export const inputNamePicture = document.querySelector('.popup__picture-name');
export const inputLinkPicture = document.querySelector('.popup__picture-link');
const popupBigPictureImage = document.querySelector('.popup_type_image');

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
personPopup.setEventListeners();

const pictureBigSize = new PopupWithImage(popupBigPictureImage);
pictureBigSize.setEventListeners();

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
placePopup.setEventListeners();

buttonOpenNewPlace.addEventListener('click', () => {
    placePopup.open();
    popupPlaceValid.clearSpan();
    popupPlaceValid.deactivateButton();
})

cardSection.renderItems() // выполнили метод отрисовки

/* Проверка валидности */
const popupPersonValid = new Validation(selectorsConfig, formPerson);
popupPersonValid.enableValidation();
const popupPlaceValid = new Validation(selectorsConfig, formPlace);
popupPlaceValid.enableValidation();