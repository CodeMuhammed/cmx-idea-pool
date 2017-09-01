import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    defaultIdea = {
        '_id': 0,
        'content': '',
        'impact': 0,
        'ease': 0,
        'confidence': 0
    };
    filterText = '';
    title = 'iDea bOx';
    viewMode = 'preview'; // or edit
    rawIdeas = [
      {
        '_id': 1,
        'content': 'Just like in Angular 1.x, Angular 2 also provides with its own service called Http for making requests to servers',
        'impact': 8,
        'ease': 8,
        'confidence': 8
      },
      {
        '_id': 2,
        'content': 'Another cool idea i just thought about. go to mars and buy a mat',
        'impact': 10,
        'ease': 1,
        'confidence': 5
      }
    ];

    ideas = this.rawIdeas.slice();

    filterData(e) {
        this.ideas = this.rawIdeas.slice();
        this.ideas = this.ideas.filter((idea) => {
            let content = idea.content;
            let exists = content.toLowerCase().indexOf(e.toLowerCase()) > -1;
            return exists;
        });
    }

    selectedIdea = this.defaultIdea;

    selectIdea(idea) {
        this.selectedIdea = idea;
        this.viewMode = 'preview';
    }

    editIdea(idea) {
      console.log('here');
        this.selectedIdea = idea;
        this.viewMode = 'edit';
    }

    cancelEdit() {
      this.viewMode = 'preview';
    }

    saveIdea(e) {
      this.selectedIdea = e;
      this.ideas.forEach((idea, index) => {
        if(idea._id === this.selectedIdea._id) {
          this.ideas[index] = this.selectedIdea;
        }
      });

      this.viewMode = 'preview';
    }

    deleteIdea(idea) {
      if(idea._id === this.selectedIdea._id) {
          this.selectedIdea = this.defaultIdea;
      }
      
      let index = this.ideas.indexOf(idea);
      this.ideas.splice(index, 1);
    }
}