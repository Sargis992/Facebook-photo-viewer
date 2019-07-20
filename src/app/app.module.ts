import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SocialLoginModule, AuthServiceConfig, LoginOpt} from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';

const fbLoginOptions: LoginOpt = {
  scope: 'email',
  return_scopes: true,
  enable_profile_selector: true
};


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('344181733165289', fbLoginOptions)
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
