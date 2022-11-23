import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGenerateColor]',
})
export class GenerateColorDirective {
  constructor(element: ElementRef) {
    this.generateRandomColor(element);
  }

  public generateRandomColor(element: ElementRef): void {
    element.nativeElement.style.backgroundColor = `#${Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(6, '0')}`;
  }
}
