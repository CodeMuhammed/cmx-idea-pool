import { Component } from '@angular/core';
import { PreloaderService }      from '../../services/preloader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
    constructor(private preloaderService: PreloaderService) {}
}