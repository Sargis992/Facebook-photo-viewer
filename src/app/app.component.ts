import {Component, OnInit} from '@angular/core';

import {AuthService, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider} from 'angularx-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'facebook-photo-viewer';
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      console.log('user', user);
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  signInWithFB(): void {
    console.log('sign in')
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
