import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {VechileComponent} from './vechile/vechile.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,VechileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vechile Page';
}
