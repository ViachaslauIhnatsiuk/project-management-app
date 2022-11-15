import { Component } from '@angular/core';
import {
  kanbanPracticeCards,
  productivityList,
  cusomizeParagraphs,
  rssParagraphs,
  developers,
} from 'src/app/core/constants/welcome-page.constants';
import { IKanbanPracticeCard, IDeveloper } from 'src/app/core/models/welcome-page.models';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public readonly kanbanPracticeCards: IKanbanPracticeCard[] = kanbanPracticeCards;

  public readonly productivityList: string[] = productivityList;

  public readonly cusomizeParagraphs: string[] = cusomizeParagraphs;

  public readonly rssParagraphs: string[] = rssParagraphs;

  public readonly developers: IDeveloper[] = developers;
}
