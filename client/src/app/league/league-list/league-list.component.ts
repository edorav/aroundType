import { Component, OnInit } from '@angular/core';
import { LeagueService } from '../league.service';
import { League } from '../league';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss']
})
export class LeagueListComponent implements OnInit {
  public leagues: League[];

  constructor(
    private _leagueService: LeagueService
  ) { }

  ngOnInit() {
    this._leagueService.get().subscribe((leagueList) => {
      this.leagues = leagueList;
    });
  }

}
