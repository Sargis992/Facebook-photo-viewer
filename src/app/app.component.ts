import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {AuthService, SocialUser} from 'angularx-social-login';
import { FacebookLoginProvider} from 'angularx-social-login';
import {Observable} from "rxjs/index";
declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
  title = 'facebook-photo-viewer';

  private user: SocialUser;
  private loggedIn: boolean;
  // private userImages: Observable<object[]>
   userImages = [];

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {
    //   console.log('user', user);
    //   this.user = user;
    //   this.loggedIn = (user != null);
    // });

    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '344181733165289',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js,  fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  submitLogin() {
    console.log('submit login to facebook');

    // FB.login();
    FB.login((response) => {
      if (response.authResponse) {
        console.log(response);
        this.getUserPhotos(response.authResponse.userID);
      } else {
        console.log('User login failed');
      }
    });


  }

  getUserPhotos(id): void {
    //this.userImages.push(7)
    // v3.3/me?fields=albums.fields(photos.fields(source))
    FB.api(`v3.3/${id}?fields=albums.fields(photos.fields(source))`,  (response) => {
      console.log(response);
      if (response && !response.error) {
            let user_iamges = [];
            const {albums} = response;
            for (const item of albums.data) {
              if (item.photos) {
                user_iamges = [...user_iamges, ...item.photos.data];
              }
            }
        this.userImages = user_iamges;
        this.cd.detectChanges();
      }
      }
    );
  }

  logout() {
    FB.logout((response) => {
      console.log(response);
      // user is now logged out
    });
  }



  // signOut(): void {
  //   this.authService.signOut();
  // }
  //
  // signInWithFB(): void {
  //   console.log('sign in')
  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
}
