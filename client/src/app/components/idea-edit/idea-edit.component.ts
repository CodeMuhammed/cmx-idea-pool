import { Component, Input, OnChanges, SimpleChanges,Output, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'idea-edit',
  templateUrl: './idea-edit.component.html',
  styleUrls: ['./idea-edit.component.css']
})
export class IdeaEditComponent {
    @Input() idea;
    @Output() cancel = new EventEmitter();
    @Output() save = new EventEmitter();
    @Output() update = new EventEmitter();

    editableIdea;
    test = 3;
    mySubject = new Subject();

    ngOnInit() {
      this.mySubject
        .debounceTime(5000)
        .subscribe(val => {
             this.update.emit(Object.assign({}, this.editableIdea));
        });
    }

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

    onIdeaChanged() {
       if(this.editableIdea._id != 0) {
          this.mySubject.next(this.editableIdea); 
       }
    }
}