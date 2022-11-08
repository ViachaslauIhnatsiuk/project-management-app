import { Component } from '@angular/core';
import { githubAccounts } from 'src/app/core/constants/footer.constants';
import { IGithubAccount } from 'src/app/core/models/footer.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public readonly githubAccounts: IGithubAccount[] = githubAccounts;
}
