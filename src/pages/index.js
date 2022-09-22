import './index.css';

import {Card} from "../components/Card.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {FormValidator} from "../components/FormValidator.js";
import {Api} from "../components/Api.js";
import {PopupWithSubmit} from "../components/PopupWithSubmit.js";
import {
    selectorsConfig,
    buttonOpenEditPerson,
    inputJobPerson,
    jobProfile,
    nameProfile,
    inputNamePerson,
    formPerson,
    popupTypePerson,
    popupNewPlace,
    formPlace,
    buttonOpenNewPlace,
    cardContent,
    profileAvatar,
    popupAvatar,
    avatarEdit,
    formAvatar,
} from "../utils/constants.js";

let userId;

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-50/',
    headers: {
        authorization: '81329a12-6862-4862-a5bb-784002a24ef0',
        'content-type': 'application/json'
    }
})

const personInfo = new UserInfo( {
    personElement: nameProfile,
    jobElement: jobProfile,
    avatar: profileAvatar,
    handleId: (actualUserId) => {
        userId = actualUserId
    }
})

const initialUserInfo = api.getUserInfo()

const personPopup = new PopupWithForm('.popup_type_person',
    (profileInfo) => {
    renderLoading(true, popupTypePerson, 'Сохранить');
    const sendToServer = api.updateProfile(profileInfo);
    sendToServer.then((res) => {
        personInfo.setUserInfo(res);
        personPopup.close()
    })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })
    .finally(() => {
        renderLoading(false, popupTypePerson, 'Сохранить')
    });
});

buttonOpenEditPerson.addEventListener('click', () => {
    personPopup.open();
    const {name, about} = personInfo.getUserInfo();
    inputNamePerson.value = name;
    inputJobPerson.value = about;
    popupPersonValid.clearErrors();
    popupPersonValid.activateButton();
})

const personAvatar = new PopupWithForm('.popup_type_avatar',
    (avatarUrl) => {
    renderLoading(true, popupAvatar, 'Сохранить');
    const sendToServer = api.getAvatarInfo(avatarUrl);
    sendToServer.then((res) => {
        personInfo.setUserInfo(res);
        personAvatar.close()
    })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    })
    .finally(() => {
        renderLoading(false, popupAvatar, 'Сохранить')
    });
});

avatarEdit.addEventListener( 'click', () => {
    personAvatar.open();
    popupAvatarValid.clearErrors();
    popupAvatarValid.deactivateButton();
})

const pictureBigSize = new PopupWithImage('.popup_type_image');

let cardId;
let cardForDelete;
const popupActivate = new PopupWithSubmit('.popup_type_confirm', () => {
    const deleteCard = api.deleteCard(cardId);
    deleteCard.then(() => {
        cardForDelete.remove();
        popupActivate.close()
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
        handleLikeClick: (card) => {
            if (card.isLiked()) {
                const likeDelete = api.removeLike(card.getId());
                likeDelete.then((res) => {
                    card.deleteLike(res)
                })
                .catch((err) => {
                    console.log(`Ошибка: код ${err.status}`)
                })
            } else {
                const likeAdd = api.addLike(card.getId());
                likeAdd.then((res)  => {
                    card.putLike(res);
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
Promise.all([initialUserInfo, initialServerCards])
    .then(([userData, cards]) => {
        personInfo.setUserInfo(userData);
        cards.reverse();
        cardSection.renderItems(cards)
    })
    .catch((err) => {
        console.log(`Ошибка: код ${err.status}`)
    });

const cardSection = new Section({
    renderer: (initialCardsElement) => {
        const photoCard = createCard(initialCardsElement) // вызвали функцию отрисовки карточки
        cardSection.addItem(photoCard) // добавили карточку в ДОМ
    } // выполнится для каждго элемента массива (столько раз сколько этих элементов)
}, cardContent);

const placePopup = new PopupWithForm('.popup_type_card',
    (inputInfo) => {
        renderLoading(true, popupNewPlace, 'Создать');
        const addedCard = api.createNewCard(inputInfo);
        addedCard.then((res) => {
            const newCard = createCard(res);
            cardSection.addItem(newCard);
            placePopup.close()
            })
        .catch((err) => {
            console.log(`Ошибка: код ${err.status}`);
        })
        .finally(() => {
            renderLoading(false, popupNewPlace, 'Создать')
        });
    });

buttonOpenNewPlace.addEventListener('click', () => {
    placePopup.open();
    popupPlaceValid.clearErrors();
    popupPlaceValid.deactivateButton();
})

function renderLoading(isLoading, popupElement, submitText) {
    const popupButton = popupElement.querySelector('.popup__button')
    if (isLoading) {
        popupButton.textContent = 'Сохранение...';
    } else {
        popupButton.textContent = submitText
    }
}

personPopup.setEventListeners();
pictureBigSize.setEventListeners();
placePopup.setEventListeners();
personAvatar.setEventListeners();
popupActivate.setEventListeners();

/* Проверка валидности */
const popupPersonValid = new FormValidator(selectorsConfig, formPerson);
popupPersonValid.enableValidation();
const popupPlaceValid = new FormValidator(selectorsConfig, formPlace);
popupPlaceValid.enableValidation();
const popupAvatarValid = new FormValidator(selectorsConfig, formAvatar);
popupAvatarValid.enableValidation();