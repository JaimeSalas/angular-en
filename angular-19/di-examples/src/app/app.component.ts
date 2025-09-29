import { Component } from '@angular/core';
import { PersonEditComponent } from './person-edit.component';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  imports: [PersonEditComponent, ChildComponent],
  template: `
    <h1>
      Services
      <h1>
        <h3>App component</h3>
        <app-person-edit></app-person-edit>

        <button (click)="childVisible = !childVisible">Toggle</button>

        @if(childVisible) {
          <app-child></app-child>
        }
      </h1>
    </h1>
  `,
})
export class AppComponent {
  childVisible = true;
}
