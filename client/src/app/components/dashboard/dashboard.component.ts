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
      },
      {
        'content': 'Another cool idea i just thought about. go to mars and buy a mat',
        'impact': 10,
        'ease': 1,
        'confidence': 5
      }
    ];
    selectedIdea = this.ideas[0];

    selectIdea(idea) {
        this.selectedIdea = idea;
    }
}