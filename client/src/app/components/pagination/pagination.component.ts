import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() ideas;
  @Output() onPaginate = new EventEmitter();
  page = 1;

  ngOnInit() {
     this.onPaginate.emit(this.page);
  }

  paginate(dir) {
      if(dir == 1) {
          this.page ++;
      }
      
      if(dir == -1 && this.page > 1) {
          this.page --;
      }

      this.onPaginate.emit(this.page);
  }
}