import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/cross/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  public profileForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.minLength(7))
  });
  constructor(
    private _userService: UserService,
    private router: Router,
    private _authService: AuthService,
  ) { }



  onSubmit() {
    if (this.profileForm.valid) {
      this._userService.login(this.profileForm.value).subscribe((jwt: any) => {
        this._authService.setToken(jwt.jwt);
        this.router.navigate(['league']);
      });
    }
  }

  ngOnInit() {
  }

}
