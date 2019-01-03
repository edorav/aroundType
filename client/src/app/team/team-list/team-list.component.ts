import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeamService } from '../team.service';
import { Team } from '../team';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  public addTeamVisible = false;
  public teamList: Team[];
  @Input() leagueId: number;

  constructor(
    private _teamService: TeamService
  ) { }

  ngOnInit() {
    this.getTeamList();
  }

  public addNewTeam(): void {
    this.addTeamVisible = true;
  }

  private getTeamList(): void {
    this._teamService.get().subscribe((teams) => {
      this.teamList = teams;
    });
  }

  public onTeamAdded(): void {
    this.getTeamList();
    this.addTeamVisible = false;
  }

}
