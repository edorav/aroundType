import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { HttpClient } from '@angular/common/http';
import { League } from './league';
import { AuthService } from '../cross/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService extends CustomHttpClientService<League> {

  protected getEndpoint(): string {
    return 'league';
  }

  constructor(
    public http: HttpClient,
    public _authService: AuthService
    ) {
      super(http, _authService);
   }
}
