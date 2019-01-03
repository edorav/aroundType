import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = false;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn = this._authService.getToken() !== null;
  }

  public logout(): void {
    this._authService.logout();
    this.router.navigate(['/user/signin']);
  }
}
