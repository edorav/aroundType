import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('jwt') ?
      localStorage.getItem('jwt') :
      null;
  }

  public setToken(jwt: string): void {
    localStorage.setItem('jwt', jwt);
  }

  public logout(): void {
    localStorage.clear();
  }
}
