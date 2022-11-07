import { Component } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public headerService: HeaderService) {}
}
