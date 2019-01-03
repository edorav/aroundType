import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';
import { LeagueListComponent } from './league/league-list/league-list.component';
import { LeagueDetailComponent } from './league/league-detail/league-detail.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NewLeagueComponent } from './league/new-league/new-league.component';

const routes: Routes = [
  { path: '', component: LeagueListComponent },
  { path: 'user', children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent },
  ]},
  { path: 'league', children: [
    { path: '', component: LeagueListComponent },
    { path: 'detail/:id', component: LeagueDetailComponent },
    { path: 'new', component: NewLeagueComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
