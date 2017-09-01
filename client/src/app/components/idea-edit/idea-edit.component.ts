import { Component, Input, OnChanges, SimpleChanges,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'idea-edit',
  templateUrl: './idea-edit.component.html',
  styleUrls: ['./idea-edit.component.css']
})
export class IdeaEditComponent {
  @Input() idea;
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  editableIdea;
  test = 3;

  ngOnChanges(changes: SimpleChanges) {
    if(changes['idea'].previousValue !== changes['idea'].currentValue) {
      this.editableIdea = Object.assign({}, changes['idea'].currentValue);
    }
  }

  cancelEdit() {
      this.cancel.emit();
  }

  saveEdit() {
      this.save.emit(Object.assign({}, this.editableIdea));
  }
}