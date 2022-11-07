import { Component } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(public headerService: HeaderService) {}
}
