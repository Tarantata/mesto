const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit');
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.popup');
const nameInput = formElement.querySelector('.popup__input_info_person');
const jobInput = formElement.querySelector('.popup__input_info_profession');

const openPopup = function () {
  nameInput.setAttribute('value', nameProfile.textContent);
  jobInput.setAttribute('value', jobProfile.textContent);
  popupElement.classList.add('popup_active');
};

const closePopup = function () { 
  popupElement.classList.remove('popup_active');
};

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
nameProfile.textContent = nameInput.value;
jobProfile.textContent = jobInput.value;
closePopup();
}
 
formElement.addEventListener('submit', formSubmitHandler);
