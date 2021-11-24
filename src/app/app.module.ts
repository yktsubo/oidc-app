import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './share/matrial.module';
import { HomeComponent } from './home/home.component';

import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { Router } from '@angular/router';
import config from './app.config';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

const oktaAuth = new OktaAuth(config.oidc);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    OktaAuthModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: OKTA_CONFIG,
      useValue: { 
        oktaAuth,
        onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
          const router = injector.get(Router);
          router.navigate(['/login']);
        }
      }
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref}    ,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
