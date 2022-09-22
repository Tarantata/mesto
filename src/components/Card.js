import { selectorsConfig } from '../utils/constants.js';

export class Card {
  constructor ({data, handleCardClick, handleCardDelete, handleLikeClick}, userId, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._myId = userId;
    this._cardId = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__icon-like');
    this._totalLike = this._element.querySelector('.card__like-total');
  }
  
  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(selectorsConfig.card)
    .cloneNode(true);
    return cardElement;
  }

  _setLikesInfo() {
    this._totalLike.textContent = this._likes.length;
    this._likes.forEach((like) => {
      if (like._id === this._myId) {
        this._likeButton.classList.add('card__icon-like_active')
      }
    })
  }

  _setDeleteIcon() {
    if (this._ownerId !== this._myId) {
      this._element.querySelector('.card__icon-delete').remove();
    }
  };

  getId() {
    return this._cardId;
  }

deleteLike(result) {
  this._totalLike.textContent = result.likes.length;
  this._likeButton.classList.remove('card__icon-like_active')
}

putLike(result) {
  this._totalLike.textContent = result.likes.length;
  this._likeButton.classList.add('card__icon-like_active')
}

  generateCard() {
    this._cardPlace = this._element.querySelector('.card__place');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardPlace.src = this._link;
    this._cardPlace.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._setLikesInfo();
    this._setEventListeners();
    this._setDeleteIcon();

    return this._element;
  }

  _setEventListeners() {
      this._element.querySelector('.card__icon-like').addEventListener('click', () => {
        this._handleLikeClick(this);
    });
      this._element.querySelector('.card__icon-delete').addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this._element);
    });
      this._cardPlace.addEventListener('click', () => {
        this._handleCardClick(this._cardPlace);
    });     
  }
}
