import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../cross/service/auth.service';
import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService  extends CustomHttpClientService<Team> {

  protected getEndpoint(): string {
    return 'team';
  }

  constructor(
    public http: HttpClient,
    public _authService: AuthService
  ) {
    super(http, _authService);
   }
}
