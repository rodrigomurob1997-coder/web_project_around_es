import { FormConfig } from "../utils/constants.ts";

export class FormValidator {
  private _config: FormConfig;
  private _formElement: HTMLFormElement;
  private _inputList: HTMLInputElement[];
  private _buttonElement: HTMLButtonElement;

  constructor(config: FormConfig, formElement: HTMLFormElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    ) as HTMLInputElement[];
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    ) as HTMLButtonElement;
  }

  private _showInputError(
    inputElement: HTMLInputElement,
    errorMessage: string
  ): void {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ) as HTMLElement;

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  private _hideInputError(inputElement: HTMLInputElement): void {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ) as HTMLElement;

    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
  }

  private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  private _hasInvalidInput(): boolean {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  private _disableButton(): void {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  }

  private _enableButton(): void {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
  }

  private _toggleButtonState(): void {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  private _setEventListeners(): void {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  public enableValidation(): void {
    this._setEventListeners();
  }

  public resetValidation(): void {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}