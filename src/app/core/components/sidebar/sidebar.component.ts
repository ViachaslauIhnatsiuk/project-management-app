import { Component } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { listItems } from 'src/app/core/constants/sidebar.constants';
import { IListItems } from 'src/app/core/models/sidebar.models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public readonly listItems: IListItems[] = listItems;

  constructor(public headerService: HeaderService) {}
}
