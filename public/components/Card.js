export class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const templateElement = document.querySelector(this._templateSelector);
        const cardElement = templateElement.content.querySelector(".card")?.cloneNode(true);
        return cardElement;
    }
    _handleLikeClick(likeButton) {
        likeButton.classList.toggle("card__like-button_is-active");
    }
    _handleDeleteClick(cardElement) {
        cardElement.remove();
    }
    _setEventListeners(cardElement) {
        const likeButton = cardElement.querySelector(".card__like-button");
        const deleteButton = cardElement.querySelector(".card__delete-button");
        const cardImage = cardElement.querySelector(".card__image");
        likeButton.addEventListener("click", () => {
            this._handleLikeClick(likeButton);
        });
        deleteButton.addEventListener("click", () => {
            this._handleDeleteClick(cardElement);
        });
        cardImage.addEventListener("click", () => {
            this._handleCardClick(this._name, this._link);
        });
    }
    generateCard() {
        const cardElement = this._getTemplate();
        const cardTitle = cardElement.querySelector(".card__title");
        const cardImage = cardElement.querySelector(".card__image");
        cardTitle.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
        this._setEventListeners(cardElement);
        return cardElement;
    }
}
