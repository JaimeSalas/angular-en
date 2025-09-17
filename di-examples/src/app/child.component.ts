import { Component } from '@angular/core';
import { PersonService } from './person.service';
import { CommonModule } from '@angular/common';
import { PersonEditComponent } from './person-edit.component';

// <pre>{{ personService.getPerson() | json }}</pre>
@Component({
  selector: 'app-child',
  imports: [CommonModule, PersonEditComponent],
  template: `
    <h4>child component</h4>
    <app-person-edit />
  `,
  styles: ``,
  providers: [PersonService]
})
export class ChildComponent {
  constructor(public personService: PersonService) {}
}
