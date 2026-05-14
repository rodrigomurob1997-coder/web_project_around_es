import { Popup } from "./Popup.js";

export type FormSubmitHandler = (inputValues: Record<string, string>) => void;

export class PopupWithForm extends Popup {
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _handleFormSubmit: FormSubmitHandler;

  constructor(popupSelector: string, handleFormSubmit: FormSubmitHandler) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector(
      ".popup__form"
    ) as HTMLFormElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    ) as HTMLInputElement[];
    this._handleFormSubmit = handleFormSubmit;
  }

  private _getInputValues(): Record<string, string> {
    const inputValues: Record<string, string> = {};

    this._inputList.forEach((inputElement) => {
      inputValues[inputElement.name] = inputElement.value;
    });

    return inputValues;
  }

  public setEventListeners(): void {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  public close(): void {
    super.close();
    this._formElement.reset();
  }
}