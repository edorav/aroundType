import { Injectable } from '@angular/core';
import { CustomHttpClientService } from '../custom-http-client.service';
import { Shop } from './shop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends CustomHttpClientService<Shop> {

  constructor(
    public http: HttpClient,
  ) { 
    super(http);
  }

  protected getEndpoint(): string {
    return 'shop';
  }
}
