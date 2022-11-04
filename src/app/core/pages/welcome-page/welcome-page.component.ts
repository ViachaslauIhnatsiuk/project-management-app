import { Component } from '@angular/core';
import {
  kanbanPracticeCards,
  productivityList,
  cusomizeParagraphs,
  rssParagraphs,
  developers,
} from 'src/app/core/constants/welcome-page-content.constants';
import { KanbanPracticeCard, Developer } from 'src/app/core/models/welcome-page-content.models';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public readonly kanbanPracticeCards: KanbanPracticeCard[] = kanbanPracticeCards;
  public readonly productivityList: string[] = productivityList;
  public readonly cusomizeParagraphs: string[] = cusomizeParagraphs;
  public readonly rssParagraphs: string[] = rssParagraphs;
  public readonly developers: Developer[] = developers;
}
