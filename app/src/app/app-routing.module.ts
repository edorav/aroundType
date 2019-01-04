import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home/home.page';
import { ListPage } from './list/list.page';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopComponent } from './shop/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'list',
    component: ListPage
  },
  {
    path: 'shop-list',
    component: ShopListComponent
  },
  {
    path: 'shop/:id',
    component: ShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
