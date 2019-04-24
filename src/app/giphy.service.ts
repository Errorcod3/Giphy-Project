import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  constructor(private http: HttpClient) {}
    gifSearch(searchTerm){
    return this.http.get(`http://api.giphy.com/v1/gifs/search?apikey=G9FJhL25vJYpBxNctTyMO3hpX9LqJjL3&limit=20&rating=r&q=${searchTerm}`);
  }
}