import { Component } from '@angular/core';
import { Books } from './books';

@Component({
  selector: 'app-root',
  imports: [Books],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
