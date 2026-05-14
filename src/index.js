import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileCloseButton = editProfileModal.querySelector(".popup__close");

const editProfileForm = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardCloseButton = addCardModal.querySelector(".popup__close");
const addCardForm = addCardModal.querySelector(".popup__form");
const cardNameInput = addCardModal.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = addCardModal.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");

const editProfileFormValidator = new FormValidator(
  defaultFormConfig,
  editProfileForm,
);

const addCardFormValidator = new FormValidator(defaultFormConfig, addCardForm);

const cardSection = new Section(
  {
    items: initialCards.slice().reverse(),
    renderer: (card) => {
      renderCard(card);
    },
  },
  ".cards__list",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");

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
  openModal(editProfileModal);
}

function handleOpenAddCardModal() {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: nameInput.value,
    description: descriptionInput.value,
  });

  closeModal(editProfileModal);
}

function createCard(data) {
  const card = new Card(data, "#card-template", handleCardClick);
  return card.generateCard();
}

function renderCard(data) {
  const cardElement = createCard(data);
  cardSection.addItem(cardElement);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  renderCard(cardData);

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

editProfileModal.addEventListener("click", handleOverlayClose);
addCardModal.addEventListener("click", handleOverlayClose);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
imagePopup.setEventListeners();

cardSection.renderItems();
