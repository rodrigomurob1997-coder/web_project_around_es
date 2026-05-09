import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editProfileForm = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(".popup__input_type_description");
const cardsList = document.querySelector(".cards__list");
const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector(".popup__form");
const cardNameInput = addCardModal.querySelector(".popup__input_type_card-name");
const cardLinkInput = addCardModal.querySelector(".popup__input_type_url");
const imageModal = document.querySelector("#image-popup");
const imageModalImage = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageModalCloseButton = imageModal.querySelector(".popup__close");
const editProfileFormValidator = new FormValidator(defaultFormConfig, editProfileForm);
const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);
function openModal(modal) {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleEscClose);
}
function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscClose);
}
function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.currentTarget);
    }
}
function handleEscClose(evt) {
    if (evt.key === "Escape") {
        const openedModal = document.querySelector(".popup_is-opened");
        closeModal(openedModal);
    }
}
function fillProfileForm() {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
}
function handleCardClick(name, link) {
    imageModalImage.src = link;
    imageModalImage.alt = name;
    imageModalCaption.textContent = name;
    openModal(imageModal);
}
function handleOpenEditModal() {
    fillProfileForm();
    editProfileFormValidator.resetValidation();
    openModal(editProfileModal);
}
function handleOpenAddCardModal() {
    addCardForm.reset();
    addCardFormValidator.resetValidation();
    openModal(addCardModal);
}
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(editProfileModal);
}
function createCard(data) {
    const card = new Card(data, "#card-template", handleCardClick);
    return card.generateCard();
}
function renderCard(data, container) {
    const cardElement = createCard(data);
    container.prepend(cardElement);
}
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };
    renderCard(cardData, cardsList);
    closeModal(addCardModal);
    addCardForm.reset();
}
editProfileButton.addEventListener("click", handleOpenEditModal);
editProfileCloseButton.addEventListener("click", function () {
    closeModal(editProfileModal);
});
editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardButton.addEventListener("click", handleOpenAddCardModal);
addCardCloseButton.addEventListener("click", function () {
    closeModal(addCardModal);
});
addCardForm.addEventListener("submit", handleCardFormSubmit);
imageModalCloseButton.addEventListener("click", function () {
    closeModal(imageModal);
});
editProfileModal.addEventListener("click", handleOverlayClose);
addCardModal.addEventListener("click", handleOverlayClose);
imageModal.addEventListener("click", handleOverlayClose);
editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
initialCards
    .slice()
    .reverse()
    .forEach(function (card) {
    renderCard(card, cardsList);
});
