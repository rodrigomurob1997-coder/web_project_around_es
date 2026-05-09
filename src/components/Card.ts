export interface CardData {
  name: string;
  link: string;
}

export class Card {
  private _name: string;
  private _link: string;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  private _getTemplate(): HTMLElement {
    const templateElement = document.querySelector(
      this._templateSelector
    ) as HTMLTemplateElement;

    const cardElement = templateElement.content.querySelector(
      ".card"
    )?.cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private _handleLikeClick(likeButton: HTMLButtonElement): void {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  private _handleDeleteClick(cardElement: HTMLElement): void {
    cardElement.remove();
  }

  private _setEventListeners(cardElement: HTMLElement): void {
    const likeButton = cardElement.querySelector(
      ".card__like-button"
    ) as HTMLButtonElement;
    const deleteButton = cardElement.querySelector(
      ".card__delete-button"
    ) as HTMLButtonElement;
    const cardImage = cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;

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

  public generateCard(): HTMLElement {
    const cardElement = this._getTemplate();
    const cardTitle = cardElement.querySelector(".card__title") as HTMLElement;
    const cardImage = cardElement.querySelector(".card__image") as HTMLImageElement;

    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}