import { Component, OnInit } from '@angular/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public latitude;
  public longitude;
  public globalizationresult;

  ngOnInit() {
    this.globalization.getPreferredLanguage()
      .then(res => this.globalizationresult = res)
      .catch(e => console.log(e));
  }

  constructor(private globalization: Globalization) { }
}
