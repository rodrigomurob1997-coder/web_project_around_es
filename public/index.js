"use strict";
const defaultFormConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};
const initialCards = [
    {
        name: "Valle de Yosemite",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    },
    {
        name: "Montañas Calvas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    },
    {
        name: "Parque Nacional de la Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    },
];
class FormValidator {
    _config;
    _formElement;
    _inputList;
    _buttonElement;
    constructor(config, formElement) {
        this._config = config;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    }
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._config.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._config.errorClass);
    }
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    }
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }
    _disableButton() {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }
    _enableButton() {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._disableButton();
        }
        else {
            this._enableButton();
        }
    }
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        this._setEventListeners();
    }
    resetValidation() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}
class Card {
    _name;
    _link;
    _templateSelector;
    _handleCardClick;
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
class Section {
    _items;
    _renderer;
    _container;
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        this._container.prepend(element);
    }
}
class Popup {
    _popupElement;
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    open() {
        this._popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    setEventListeners() {
        const closeButton = this._popupElement.querySelector(".popup__close");
        closeButton.addEventListener("click", () => {
            this.close();
        });
        this._popupElement.addEventListener("mousedown", (evt) => {
            if (evt.target === this._popupElement) {
                this.close();
            }
        });
    }
}
class PopupWithImage extends Popup {
    _imageElement;
    _captionElement;
    constructor(popupSelector) {
        super(popupSelector);
        this._imageElement = this._popupElement.querySelector(".popup__image");
        this._captionElement = this._popupElement.querySelector(".popup__caption");
    }
    open(name, link) {
        if (!name || !link) {
            return;
        }
        this._imageElement.src = link;
        this._imageElement.alt = name;
        this._captionElement.textContent = name;
        super.open();
    }
}
class PopupWithForm extends Popup {
    _formElement;
    _inputList;
    _handleFormSubmit;
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._inputList = Array.from(this._formElement.querySelectorAll(".popup__input"));
        this._handleFormSubmit = handleFormSubmit;
    }
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((inputElement) => {
            inputValues[inputElement.name] = inputElement.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}
class UserInfo {
    _nameElement;
    _descriptionElement;
    constructor({ nameSelector, descriptionSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
    }
    getUserInfo() {
        return {
            name: this._nameElement.textContent || "",
            description: this._descriptionElement.textContent || "",
        };
    }
    setUserInfo({ name, description }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
    }
}
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(".popup__input_type_description");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardForm = addCardModal.querySelector(".popup__form");
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);
const cardSection = new Section({
    items: initialCards.slice().reverse(),
    renderer: (card) => {
        renderCard(card);
    },
}, ".cards__list");
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__description",
});
const imagePopup = new PopupWithImage("#image-popup");
const editProfilePopup = new PopupWithForm("#edit-popup", (inputValues) => {
    userInfo.setUserInfo({
        name: inputValues.name,
        description: inputValues.description,
    });
    editProfilePopup.close();
});
const addCardPopup = new PopupWithForm("#new-card-popup", (inputValues) => {
    const cardData = {
        name: inputValues["place-name"],
        link: inputValues.link,
    };
    renderCard(cardData);
    addCardPopup.close();
});
function fillProfileForm() {
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    descriptionInput.value = profileData.description;
}
function handleCardClick(name, link) {
    imagePopup.open(name, link);
}
function handleOpenEditModal() {
    fillProfileForm();
    editProfileFormValidator.resetValidation();
    editProfilePopup.open();
}
function handleOpenAddCardModal() {
    addCardForm.reset();
    addCardFormValidator.resetValidation();
    addCardPopup.open();
}
function createCard(data) {
    const card = new Card(data, "#card-template", handleCardClick);
    return card.generateCard();
}
function renderCard(data) {
    const cardElement = createCard(data);
    cardSection.addItem(cardElement);
}
editProfileButton.addEventListener("click", handleOpenEditModal);
addCardButton.addEventListener("click", handleOpenAddCardModal);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();
cardSection.renderItems();
