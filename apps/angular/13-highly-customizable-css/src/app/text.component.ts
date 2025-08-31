/* eslint-disable @angular-eslint/component-selector */
import { Component, input } from '@angular/core';

@Component({
  selector: 'text',
  template: `
    <p>
      <ng-content />
    </p>
  `,
  styles: [
    `
      p {
        font-size: var(--text-font-size, 10px);
        color: var(--text-color, black);
      }
    `,
  ],
})
export class TextComponent {
  font = input(10);
  color = input('black');
}
