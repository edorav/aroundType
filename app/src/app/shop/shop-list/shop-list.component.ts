import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent implements OnInit {
  public shops: Shop[];

  constructor(
    private _shopService: ShopService,
    private router: Router
  ) { }

  ngOnInit() {
    this._shopService.get('/-50.50519943/178.55140686/1500').subscribe((shops) => {
      this.shops = shops;
    })
  }

  public showBean(beanId: number) {
    this.router.navigate(['/shop/' + beanId]);
  }

  public thumbnailUrl(thumbnail: string){
    return this._shopService.getThumbnail(thumbnail);
  }
}
