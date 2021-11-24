import { Component, OnInit } from '@angular/core';
import { OktaAuth } from '@okta/okta-auth-js';

interface Claim {
  claim: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  claims: Claim[] = [];

  constructor(public oktaAuth: OktaAuth) { }

  async ngOnInit() {
    const uesrClaims = await this.oktaAuth.getUser();
    this.claims = Object.entries(uesrClaims).map(entry => ({claim: entry[0], value: entry[1]}));
  }

}
