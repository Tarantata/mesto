import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { Validation } from './FormValidator.js';

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

/* Константы */
const cardContent = document.querySelector('.content');
const popupsList = document.querySelectorAll('.popup');
/* Константы поп-апа (Person) */
const popupTypePerson = document.querySelector('.popup_type_person');
const buttonOpenEditPerson = document.querySelector('.profile__edit');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const inputNamePerson = document.querySelector('.popup__input_person-name');
const inputJobPerson = document.querySelector('.popup__input_person-profession');
const formPerson = document.querySelector('.popup__form-person');
/* Константы поп-апа(Place) */
const buttonOpenNewPlace = document.querySelector('.profile__add');
const inputNamePlace = document.querySelector('.popup__input_place-name');
const inputLinkPlace = document.querySelector('.popup__input_place-link');
const popupNewPlace = document.querySelector('.popup_type_card');
const formPlace = document.querySelector('.popup__form-place');
/* Константы поп-апа(Picture) */
const inputNamePicture = document.querySelector('.popup__picture-name');
const inputLinkPicture = document.querySelector('.popup__picture-link');
const popupBigPictureImage = document.querySelector('.popup_type_image');

/* Функция открытия поп-апов */
function openPopup(popup) {
  popup.classList.add('popup_active');
  document.addEventListener('keydown', closeEscape);
};
/* Функция закрытия поп-апов */
function closePopup(popup) {
  popup.classList.remove('popup_active');
  document.removeEventListener('keydown', closeEscape);
};
/* Функция закрытия поп-апа при нажатии на ESC */
function closeEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_active');
    closePopup(openedPopup);
  }
}
popupsList.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => { 
    if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
      closePopup(popup);
    }
  })
});
/* Вызов формы Person */
  buttonOpenEditPerson.addEventListener('click', () => {    
    openPopup(popupTypePerson);
    inputNamePerson.value = nameProfile.textContent;
    inputJobPerson.value = jobProfile.textContent;   
    popupPersonValid.activateButton();
    popupPersonValid.clearSpan();
  });
/* Вызов формы Place */
  buttonOpenNewPlace.addEventListener('click', () => {
    formPlace.reset();
    openPopup(popupNewPlace);
    popupPlaceValid.deactivateButton();
    popupPlaceValid.clearSpan();
  });
  /* Вызов формы увеличения картинки */
  function handleCardClick (name, link) {  
    openPopup(popupBigPictureImage);
    inputLinkPicture.src = link;
    inputLinkPicture.alt = name;
    inputNamePicture.textContent = name; 
  }
  // export { handleCardClick };
/* Размещение карточек по умолчанию */
function  createCard (itemCard) {
  const card = new Card(itemCard, selectorsConfig.cardTemplateTypePlace, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function createInitialCards () { 
initialCards.forEach((item) => {  
  cardContent.prepend(createCard(item));
});
}

/* Размещение карточек из поп-апа */
function addNewCard(evt) {
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = inputNamePlace.value;
  newCardData.link = inputLinkPlace.value;  
  cardContent.prepend(createCard(newCardData));
  closePopup(popupNewPlace);
}
formPlace.addEventListener('submit', addNewCard);

/* Редактирование профиля */
function fillProfileData(evt) {
  evt.preventDefault();
  nameProfile.textContent = inputNamePerson.value;
  jobProfile.textContent = inputJobPerson.value;
  closePopup(popupTypePerson);
};

formPerson.addEventListener('submit', fillProfileData);

/* Проверка валидности */
const popupPersonValid = new Validation(selectorsConfig, formPerson);
popupPersonValid.enableValidation();
const popupPlaceValid = new Validation(selectorsConfig, formPlace);
popupPlaceValid.enableValidation();

createInitialCards();