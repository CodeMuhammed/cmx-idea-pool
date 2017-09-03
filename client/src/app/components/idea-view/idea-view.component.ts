import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'idea-view',
  templateUrl: './idea-view.component.html',
  styleUrls: ['./idea-view.component.css']
})
export class IdeaViewComponent {
  @Input() idea;
  @Output() edit = new EventEmitter();
  averageScore;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['idea'].previousValue !== changes['idea'].currentValue) {
      let idea = changes['idea'].currentValue;
      this.averageScore = (parseInt(idea.impact) + parseInt(idea.ease) + parseInt(idea.confidence)) / 3;
    }
  }

  onClick() {
      this.edit.emit();
  }
}