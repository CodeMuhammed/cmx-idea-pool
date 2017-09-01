import { Component } from '@angular/core';
import { IdeasService }      from '../../services/ideas.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private ideasService: IdeasService) {}

    defaultIdea = {
        '_id': 0,
        'content': '',
        'impact': 0,
        'ease': 0,
        'confidence': 0
    };
    newIdeaTemplate = {
        '_id': 0,
        'content': 'Enter your new idea here',
        'impact': 1,
        'ease': 1,
        'confidence': 1
    };

    filterText = '';
    title = 'iDea bOx';
    viewMode = 'preview'; // or edit

    rawIdeas = [];
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

    ngOnInit() { 
        this.ideasService.getIdeas()
            .subscribe(
                ideas => {
                  this.rawIdeas = ideas;
                  this.ideas = this.rawIdeas.slice();
                },
                error => {
                   alert(error);
                }
            )
    }

    selectIdea(idea) {
        this.selectedIdea = idea;
        this.viewMode = 'preview';
    }

    editIdea(idea) {
        this.selectedIdea = idea;
        this.viewMode = 'edit';
    }

    cancelEdit() {
      // if selected was new, just pick the first on the list
      let alreadyExists = false;
      this.rawIdeas.forEach((idea, index) => {
        if(idea._id === this.selectedIdea._id) {
          alreadyExists = true;
        }
      });

      if(!alreadyExists) {
        this.selectedIdea = this.ideas[0];
      }
      this.viewMode = 'preview';
    }

    saveIdea(e) {
       this.selectedIdea = e;
       let alreadyExists = this.selectedIdea._id == 0 ? false : true;

        alreadyExists ? this.updateIdea() : this.createIdea();
    }

    createIdea() {
        console.log('about to create a new idea');
    }

    updateIdea() {
        console.log('about to update idea');
    }

    deleteIdea(idea) {
      if(idea._id === this.selectedIdea._id) {
          this.selectedIdea = this.defaultIdea;
      }
      
      let index = this.rawIdeas.indexOf(idea);
      this.rawIdeas.splice(index, 1);
      this.ideas = this.rawIdeas.slice();
    }
}