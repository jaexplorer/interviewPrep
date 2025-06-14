class LocalStorage {
  private readonly localstorage = window.localStorage;

  public setItem(key: string, item: string) {
    this.localstorage.setItem(key, item);
  }

  public getItem(key: string) {
    return this.localstorage.getItem(key);
  }

  public removeItem(key: string) {
    this.localstorage.removeItem(key);
  }

  public clearAll() {
    this.localstorage.clear();
  }
}

export enum LocalStorageKeys {
  APP_THEME = 'APP_THEME',
}

const localStorage = new LocalStorage();
export default localStorage;
