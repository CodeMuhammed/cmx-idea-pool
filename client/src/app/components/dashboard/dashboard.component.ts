import { Component } from '@angular/core';
import { IdeasService }      from '../../services/ideas.service';
import { AuthService }      from '../../services/auth.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private ideasService: IdeasService, private authService: AuthService) {}

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
                (ideas) => {
                    ideas.sort((idea1, idea2) => {
                       return this.getAverageScore(idea2) - this.getAverageScore(idea1);
                    });

                    this.rawIdeas = ideas;
                    this.ideas = this.rawIdeas.slice();
                },
                (err) => {
                    alert(err);
                }
            );
    }

    getAverageScore(idea) {
        return (idea.impact + idea.ease + idea.confidence) / 3;
    }

    sortIdea() {
        
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
        this.ideasService.createIdea(this.selectedIdea)
            .subscribe(
                idea => {
                   this.rawIdeas.unshift(idea);
                   this.rawIdeas.sort((idea1, idea2) => {
                       return this.getAverageScore(idea2) - this.getAverageScore(idea1);
                   });
                   this.ideas = this.rawIdeas.slice();
                   this.selectedIdea = idea;
                   this.viewMode = 'preview';
                },
                error => {
                   alert(error);
                }
            )
    }

    updateIdea() {
        this.ideasService.updateIdea(this.selectedIdea)
            .subscribe(
                stat => {
                   console.log(stat);
                   this.rawIdeas.forEach((idea, index) => {
                     if(this.selectedIdea._id === idea._id) {
                        this.rawIdeas[index] = this.selectedIdea;
                        this.rawIdeas.sort((idea1, idea2) => {
                            return this.getAverageScore(idea2) - this.getAverageScore(idea1);
                        });
                        this.ideas = this.rawIdeas.slice();
                        this.viewMode = 'preview';
                     }
                   });
                },
                error => {
                   alert(error);
                }
            )
    }

    deleteIdea(idea) {
      this.ideasService.deleteIdea(idea)
            .subscribe(
                stat => {
                   console.log(stat);
                   if(idea._id === this.selectedIdea._id) {
                        this.selectedIdea = this.defaultIdea;
                   }
                    
                   let index = this.rawIdeas.indexOf(idea);
                   this.rawIdeas.splice(index, 1);
                   this.ideas = this.rawIdeas.slice();
                },
                error => {
                   alert(error);
                }
            )
    }

    logout() {
        this.authService.logout();
    }
}