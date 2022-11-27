import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  static set<T>(fieldName: string, data: T): void {
    window.localStorage.setItem(fieldName, JSON.stringify(data));
  }

  static get<T>(fieldName: string): T {
    const storedItem = window.localStorage.getItem(fieldName);

    return this.exists(fieldName) ? JSON.parse(storedItem as string) : null;
  }

  static remove(fieldName: string): void {
    if (this.exists(fieldName)) {
      window.localStorage.removeItem(fieldName);
    }
  }

  static exists(fieldName: string): boolean {
    return !!window.localStorage.getItem(fieldName);
  }

  static clear(): void {
    window.localStorage.clear();
  }
}
