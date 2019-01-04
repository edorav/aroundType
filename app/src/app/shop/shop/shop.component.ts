import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../shop';
import { ActivatedRoute } from '@angular/router';
import { MemoryService } from 'src/app/cross/services/memory.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public bean: Shop;

  constructor(
    private _shopService: ShopService,
    private route: ActivatedRoute,
    private _memoryService: MemoryService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if(this._memoryService.get(id, 'shop')){
      this.bean = this._memoryService.get(id, 'shop');
    } else {
      this._shopService.getBean(id).subscribe((bean) => {
        this.bean = bean;
        this._memoryService.set(bean, 'shop');
      });
    }
  }

  get thumbnailUrl(){
    return this._shopService.getThumbnail(this.bean.thumbnail);
  }

}
