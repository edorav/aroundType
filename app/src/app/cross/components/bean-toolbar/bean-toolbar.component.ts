import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bean-toolbar',
  templateUrl: './bean-toolbar.component.html',
  styleUrls: ['./bean-toolbar.component.scss']
})
export class BeanToolbarComponent implements OnInit {
  public isSearching: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
