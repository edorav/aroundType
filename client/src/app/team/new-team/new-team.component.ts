import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {
  @Input() leagueId: number;
  @Output() teamAdded: EventEmitter<string> = new EventEmitter();
  public newTeamForm: FormGroup;

  constructor(
    private _teamService: TeamService
  ) { }

  ngOnInit() {
    this.newTeamForm = new FormGroup({
      name: new FormControl('', Validators.minLength(7)),
      league: new FormControl(this.leagueId)
    });
  }

  public onSubmit(): void {
    if (this.newTeamForm.valid) {
      this._teamService.addBean(this.newTeamForm.value).subscribe(() => {
        this.teamAdded.emit('bean_added');
      });
    }
  }

}
