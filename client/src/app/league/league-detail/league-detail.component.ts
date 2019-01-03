import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { League } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {
  public league: League;
  public leagueId: number;

  constructor(
    private route: ActivatedRoute,
    private _leagueService: LeagueService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.leagueId = this.route.snapshot.params.id;
    this._leagueService.getBean(id).subscribe((bean) => {
      this.league = bean;
    });
  }

}
