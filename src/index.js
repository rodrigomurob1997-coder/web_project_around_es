import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { UserInfo } from "./components/UserInfo.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { defaultFormConfig, initialCards } from "./utils/constants.js";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");

const editProfileForm = editProfileModal.querySelector(".popup__form");
const nameInput = editProfileModal.querySelector(".popup__input_type_name");
const descriptionInput = editProfileModal.querySelector(
  ".popup__input_type_description",
);

const addCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const addCardForm = addCardModal.querySelector(".popup__form");

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
