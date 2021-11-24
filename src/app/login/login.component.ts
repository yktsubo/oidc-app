import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { OktaAuth, Tokens } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import sampleConfig from '../app.config';

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: 'app-login',
  template: '<div id="sign-in-widget"></div>',  
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  signIn: any;

  constructor(private oktaAuth: OktaAuth) { 
    this.signIn = new OktaSignIn({
      baseUrl: sampleConfig.oidc.issuer.split('/oauth2')[0],
      clientId: sampleConfig.oidc.clientId,    
      redirectUri: sampleConfig.oidc.redirectUri,    
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Angular & Company'
        }
      },
      authClient: oktaAuth,
      useInteractionCodeFlow: sampleConfig.widget.useInteractionCodeFlow == 'true',
    });    
  }

  ngOnInit(): void {
    const originalUri = this.oktaAuth.getOriginalUri();
    if(!originalUri || originalUri === DEFAULT_ORIGINAL_URI){
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: sampleConfig.oidc.scopes
    }).then((tokens: Tokens) => {
      this.signIn.remove();

      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch((err: any) => {
      throw err;
    })
  }
  
  ngOnDestroy() {
    this.signIn.remove();
  }

}
