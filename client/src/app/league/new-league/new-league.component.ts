import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-new-league',
  templateUrl: './new-league.component.html',
  styleUrls: ['./new-league.component.scss']
})
export class NewLeagueComponent implements OnInit {

  public newLeagueForm = new FormGroup({
    name: new FormControl('', Validators.minLength(7)),
    type: new FormControl(''),
    typeMatches: new FormControl('')
  });
  constructor(
    private router: Router,
    private _leagueService: LeagueService
  ) { }

  ngOnInit() {}

  onSubmit() {
    if (this.newLeagueForm.valid) {
      this._leagueService.addBean(this.newLeagueForm.value).subscribe((league) => {
        this.router.navigate(['league/detail/' + league.id]);
      }, (error) => {
        console.log('error');
      });
    }
  }

}
