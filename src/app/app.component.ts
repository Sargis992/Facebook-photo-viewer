import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

declare var FB: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'facebook-photo-viewer';

  loggedIn: boolean;
  userImages = [];
  errorMessage: string;
  isLoading = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initFcbSdk();
  }

  initFcbSdk() {
    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '344181733165289',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // FB.login();
  submitLogin() {
    console.log('submit login to facebook');
    FB.login((response) => {
      if (response.authResponse && response.status === 'connected') {
        this.isLoading = false;
        this.loggedIn = true;
        this.getUserPhotos(response.authResponse.userID);
      } else {
        this.loggedIn = false;
        console.log('User login failed');
      }
    });


  }

  getUserPhotos(id): void {
    // v3.3/me?fields=albums.fields(photos.fields(source))
    FB.api(`v3.3/me?fields=albums.fields(photos.fields(source))`, (response) => {
        if (response && !response.error && response.albums) {
          this.isLoading = true;
          let userImages = [];
          const {albums} = response;
          for (const item of albums.data) {
            if (item.photos) {
              userImages = [...userImages, ...item.photos.data];
            }
          }
          this.userImages = userImages;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'Permission is required';
        }
        this.cd.detectChanges();
      }
    );
  }

  logout() {
    FB.logout((response) => {
      this.loggedIn = false;
      console.log(response);
      // user is now logged out
    });
  }

}
