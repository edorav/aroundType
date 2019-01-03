import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public profileForm = new FormGroup({
    firstName: new FormControl('', Validators.minLength(3)),
    lastName: new FormControl('', Validators.minLength(3)),
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(7))
  });
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._userService.get().subscribe((res: User[]) => {
      console.log(res);
    });
  }

}
