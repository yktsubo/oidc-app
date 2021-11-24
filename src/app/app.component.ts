import { Component } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'oidc-app';

  constructor(public authStateService: OktaAuthStateService, private oktaAuth: OktaAuth){}

  async logout() {
    await this.oktaAuth.signOut();
  }

}
