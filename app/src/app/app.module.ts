import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Globalization } from '@ionic-native/globalization/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListPage } from './list/list.page';
import { HomePage } from './home/home.page';
import { ShopListComponent } from './shop/shop-list/shop-list.component';
import { ShopComponent } from './shop/shop/shop.component';
import { BeanToolbarComponent } from './cross/components/bean-toolbar/bean-toolbar.component';

//https://www.joshmorony.com/creating-a-sliding-introduction-component-in-ionic-2/

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ListPage,
    HomePage,
    ShopListComponent,
    ShopComponent,
    BeanToolbarComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        }
    }),
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
