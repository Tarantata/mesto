import './index.css';

import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {Validation} from "../components/FormValidator.js";
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {
    buttonOpenEditPerson,
    inputJobPerson,
    jobProfile,
    nameProfile,
    inputNamePerson,
    formPerson,
    popupTypePerson,
    popupBigPictureImage,
    popupNewPlace,
    formPlace,
    buttonOpenNewPlace,
    cardContent,
    profileAvatar,
    popupAvatar,
    avatarEdit,
    formAvatar,
    avatarFromServer,
    popupConfirm,
    buttonSubmit
} from "../utils/constants.js";

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

let userId;

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-50/',
    headers: {
        authorization: '81329a12-6862-4862-a5bb-784002a24ef0',
        'content-type': 'application/json'
    }
})

const personInfo = new UserInfo( {
    personSelector: nameProfile,
    jobSelector: jobProfile
})

const initialUserInfo = api.getUserInfo()
initialUserInfo.then((userData) => {
    personInfo.setUserInfo(userData);
    userId = userData._id;
    profileAvatar.src = userData.avatar;
})
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })

const personPopup = new PopupWithForm(popupTypePerson,
    (profileInfo) => {
    renderLoading(true);
    const sendToServer = api.updateProfile(profileInfo);
    sendToServer.then((res) => {
        personInfo.setUserInfo(res);
    })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })
    .finally(() => {
        renderLoading(false)
    });
});

buttonOpenEditPerson.addEventListener('click', () => {
    personPopup.open();
    const {name, about} = personInfo.getUserInfo();
    inputNamePerson.value = name;
    inputJobPerson.value = about;
    popupPersonValid.clearSpan();
    popupPersonValid.activateButton();
})

const personAvatar = new PopupWithForm(popupAvatar,
    (avatarUrl) => {
    renderLoading(true);
    const sendToServer = api.getAvatarInfo(avatarUrl);
    sendToServer.then((res) => {
        avatarFromServer.src = res.avatar;
    })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })
    .finally(() => {
        renderLoading(false)
    });
});

avatarEdit.addEventListener( 'click', () => {
    personAvatar.open();
    popupAvatarValid.clearSpan();
    popupAvatarValid.deactivateButton();
})

const pictureBigSize = new PopupWithImage(popupBigPictureImage);

let cardId;
let cardForDelete;
const popupActivate = new PopupWithSubmit(popupConfirm, () => {
    const deleteCard = api.deleteCard(cardId);
    deleteCard.then(() => {
        cardForDelete.remove()
        })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })
});

// функция отрисоки 1 карточки
const createCard = (pictureData) => {
    const picture = new Card({
        data: pictureData,
        handleCardClick: (photo) => {
            pictureBigSize.open(photo);
        },
        handleCardDelete: (currentCardId, currentCard) => {
            popupActivate.open();
            cardId = currentCardId;
            cardForDelete = currentCard;
        },
        handleLikeClick: (likeButton, currentCardId, totalLike) => {
            if (likeButton.classList.contains('card__icon-like_active')) {
                const likeDelete = api.removeLike(currentCardId);
                likeDelete.then((res) => {
                    totalLike.textContent = res.likes.length;
                    likeButton.classList.remove('card__icon-like_active');
                })
                .catch((err) => {
                    console.log(`Ошибка: код ${err.status}`)
                })
            } else {
                const likeAdd = api.addLike(currentCardId);
                likeAdd.then((res)  => {
                    totalLike.textContent = res.likes.length;
                    likeButton.classList.add('card__icon-like_active');
                })
                .catch((err) => {
                    console.log(`Ошибка: код ${err.status}`)
                })
            }
        },
    },
        userId,
        selectorsConfig.cardTemplateTypePlace
    );
    return picture.generateCard();
}

const initialServerCards = api.getInitialCards();
initialServerCards.then((result) => {
    result.reverse();
    cardSection.renderItems(result) // выполнили метод отрисовки
})
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })

const cardSection = new Section({
    renderer: (initialCardsElement) => {
        const photoCard = createCard(initialCardsElement) // вызвали функцию отрисовки карточки
        cardSection.addItem(photoCard) // добавили карточку в ДОМ
    } // выполнится для каждго элемента массива (столько раз сколько этих элементов)
}, cardContent);

const placePopup = new PopupWithForm(popupNewPlace,
    (inputInfo) => {
        renderLoading(true);
        const addedCard = api.createNewCard(inputInfo);
        addedCard.then((res) => {
            const newCard = createCard(res);
            cardSection.addItem(newCard)
            })
        .catch((err) => {
            console.log(`Ошибка: код ${err.status}`);
        })
        .finally(() => {
            renderLoading(false)
        });
    });

buttonOpenNewPlace.addEventListener('click', () => {
    placePopup.open();
    popupPlaceValid.clearSpan();
    popupPlaceValid.deactivateButton();
})

function renderLoading(isLoading) {
    if (isLoading) {
        buttonSubmit.textContent = 'Сохранение...';
    } else {
        buttonSubmit.textContent = 'Сохранить';
    }
}

personPopup.setEventListeners();
pictureBigSize.setEventListeners();
placePopup.setEventListeners();
personAvatar.setEventListeners();
popupActivate.setEventListeners();

/* Проверка валидности */
const popupPersonValid = new Validation(selectorsConfig, formPerson);
popupPersonValid.enableValidation();
const popupPlaceValid = new Validation(selectorsConfig, formPlace);
popupPlaceValid.enableValidation();
const popupAvatarValid = new Validation(selectorsConfig, formAvatar);
popupAvatarValid.enableValidation();