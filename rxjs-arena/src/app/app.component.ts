import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  delay,
  map,
  range,
  tap,
  of,
  concatMap,
  mergeMap,
  switchMap,
} from 'rxjs';
import { myMap } from './temp';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  pageTitle = 'Lemon store';
  cartCount = 0;

  ngOnInit(): void {
    // range(1, 5)
    //   .pipe(concatMap((i) => of(i).pipe(delay(this.randomDelay()))))
    //   .subscribe((item) => console.log('concatMap:', item));
    
    // range(11, 5)
    //   .pipe(mergeMap((i) => of(i).pipe(delay(this.randomDelay()))))
    //   .subscribe((item) => console.log('mergeMap:', item));
    
    // range(21, 5)
    //   .pipe(switchMap((i) => of(i).pipe(delay(this.randomDelay()))))
    //   .subscribe((item) => console.log('switchMap:', item));
    
    // range(1, 5)
    //   .pipe(myMap((i: any) => i * 2))
    //   .subscribe(console.log);
  }

  private randomDelay() {
    return Math.floor(Math.random() * 1000) + 500; // 0.5 - 1.5
  }
}
