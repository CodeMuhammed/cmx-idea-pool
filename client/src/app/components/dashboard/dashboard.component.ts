import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title = 'iDea bOx';
  ideas = [
    {
      'content': 'Just like in Angular 1.x, Angular 2 also provides with its own service called Http for making requests to servers',
      'impact': 8,
      'ease': 8,
      'confidence': 8
    }
  ];
  selectedIdea = this.ideas[0];
}