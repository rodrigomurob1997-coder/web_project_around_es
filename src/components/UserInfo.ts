export interface UserData {
  name: string;
  description: string;
}

interface UserInfoSelectors {
  nameSelector: string;
  descriptionSelector: string;
}

export class UserInfo {
  private _nameElement: HTMLElement;
  private _descriptionElement: HTMLElement;

  constructor({ nameSelector, descriptionSelector }: UserInfoSelectors) {
    this._nameElement = document.querySelector(nameSelector) as HTMLElement;
    this._descriptionElement = document.querySelector(
      descriptionSelector
    ) as HTMLElement;
  }

  public getUserInfo(): UserData {
    return {
      name: this._nameElement.textContent || "",
      description: this._descriptionElement.textContent || "",
    };
  }

  public setUserInfo({ name, description }: UserData): void {
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
  }
}