import { Component, OnInit } from '@angular/core';
import {
  kanbanPracticeCards,
  productivityList,
  cusomizeParagraphs,
  rssParagraphs,
  developers,
} from 'src/app/core/constants/welcome-page.constants';
import { IKanbanPracticeCard, IDeveloper } from 'src/app/core/models/welcome-page.models';
import * as AOS from 'aos';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  public readonly kanbanPracticeCards: IKanbanPracticeCard[] = kanbanPracticeCards;
  public readonly productivityList: string[] = productivityList;
  public readonly cusomizeParagraphs: string[] = cusomizeParagraphs;
  public readonly rssParagraphs: string[] = rssParagraphs;
  public readonly developers: IDeveloper[] = developers;

  ngOnInit(): void {
    AOS.init({ disable: 'mobile', duration: 1500, startEvent: 'load' });
  }
}
