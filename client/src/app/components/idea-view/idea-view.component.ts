import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'idea-view',
  templateUrl: './idea-view.component.html',
  styleUrls: ['./idea-view.component.css']
})
export class IdeaViewComponent {
  @Input() idea;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['idea'].previousValue !== changes['idea'].currentValue) {
      console.log('Input updated');
    }
  }
}