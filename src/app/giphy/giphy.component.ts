import { Component, OnInit } from '@angular/core';
import { GiphyService } from '../giphy.service';
import { Observable, interval, fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.scss']
})
export class GiphyComponent implements OnInit {
  searchTerm: string;
  gifs: Object [] = []
  timer: Observable<number> = interval(1000)
  inputObservable: Observable<string>
  inputElement: any;
  constructor(private giphyService: GiphyService) { }
  getGiphy(){
    this.giphyService.gifSearch(this.searchTerm).subscribe(res => this.gifs = res['data'])
  }
  ngOnInit() {
    this.inputElement = document.getElementById("searchBox");
    this.inputObservable = fromEvent(this.inputElement, 'input').pipe(
      debounceTime(400),
      map(e => e['target'].value),
      filter(text => text.length > 3),
      distinctUntilChanged()
      )
    this.inputObservable.subscribe(val => 
      this.giphyService.gifSearch(val).subscribe(res => 
        this.gifs = res['data']))
    this.timer.subscribe()
  }

}
