import { selectorsConfig } from './index.js';

export class Card {
  constructor (data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;    
  }
  
  _getTemplate () {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content

    .querySelector(selectorsConfig.card)
    .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardPlace = this._element.querySelector('.card__place');
    this._cardTitle = this._element.querySelector('.card__title');
    
    this._cardPlace.src = this._link;
    this._cardPlace.alt = this._name;
    this._cardTitle.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
      this._element.querySelector('.card__icon-like').addEventListener('click', () => {
        this._handleCardLike();
    });
      this._element.querySelector('.card__icon-delete').addEventListener('click', () => {
        this._handleCardDelete();
    });      
      this._element.querySelector('.card__place').addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
    });     
  }

  _handleCardLike() {
    this._element.querySelector('.card__icon-like').classList.toggle('card__icon-like_active'); 
  }

  _handleCardDelete() {
    this._element.remove();    
    this._element = null;
  }
}
