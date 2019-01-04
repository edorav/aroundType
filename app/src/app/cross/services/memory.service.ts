import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private beanList: {[k: string]: any} = {};

  constructor() { }

  public set(bean:any, type:string){
    if(!this.beanList[type]){
      this.beanList[type] = [];
    }
    this.beanList[type][bean.id] = bean;
  }

  public get(beanId:number, type:string){
    return this.beanList[type] && this.beanList[type][beanId] ? this.beanList[type][beanId] : null;
  }
}
