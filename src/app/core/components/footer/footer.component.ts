import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { githubAccounts, githubIcon, rssLogo } from 'src/app/core/constants/footer.constants';
import { IGithubAccount } from 'src/app/core/models/footer.models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  public readonly githubAccounts: IGithubAccount[] = githubAccounts;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('githubIcon', sanitizer.bypassSecurityTrustHtml(githubIcon));
    iconRegistry.addSvgIconLiteral('rssLogo', sanitizer.bypassSecurityTrustHtml(rssLogo));
  }
}
