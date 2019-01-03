import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../cross/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CustomHttpClientService<User> {

  protected getEndpoint(): string {
    return 'user';
  }

  constructor(
    public http: HttpClient,
    public _authService: AuthService
  ) {
    super(http, _authService);
   }

  public login(user: User): Observable<object> {
    return this.http.post<object>(environment.baseUrl + this.getEndpoint() + '/signin', user);
  }

}
