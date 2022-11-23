import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGenerateColor]',
})
export class GenerateColorDirective {
  constructor(element: ElementRef) {
    this.generateRandomColor(element);
  }

  public generateRandomColor(element: ElementRef): void {
    const generatedColor = `#${Math.floor(Math.random() * 2 ** 24)
      .toString(16)
      .padStart(6, '0')}`;
    element.nativeElement.style.backgroundColor = generatedColor;
  }
}
