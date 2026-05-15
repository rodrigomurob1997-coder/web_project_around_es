class Popup {
  protected _popupElement: HTMLElement;

  constructor(popupSelector: string) {
    this._popupElement = document.querySelector(popupSelector) as HTMLElement;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  private _handleEscClose(evt: KeyboardEvent): void {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  public open(): void {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  public close(): void {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  public setEventListeners(): void {
    const closeButton = this._popupElement.querySelector(
      ".popup__close"
    ) as HTMLButtonElement;

    closeButton.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt: MouseEvent) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}