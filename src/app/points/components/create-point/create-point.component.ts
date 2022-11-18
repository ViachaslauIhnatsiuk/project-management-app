import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-create-point',
  templateUrl: './create-point.component.html',
  styleUrls: ['./create-point.component.scss'],
})
export class CreatePointComponent {
  @Input() taskId: string = '';

  public isFormVisible: boolean = false;

  public toggleVisibilityForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
