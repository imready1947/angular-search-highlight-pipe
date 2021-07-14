//our root app component
import {Component, NgModule, VERSION, Pipe, PipeTransform} from '@angular/core'
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'

@Pipe({
    name: 'highlight'
})
export class HighlightSearch implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<mark>" + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}

@Component({ 
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  template: `
    <label for="search-term">Search</label>
    <input placeholder="Enter term" (input)="updateSearch($event)" id="search-term">
    <div *ngFor="let result of results" [innerHTML]="result.summary | highlight: searchTerm"></div>
  `,
})
export class AppComponent {
  results: any[];
  searchTerm: string;
  constructor() {
    this.results = [
      {
        "id": "1",
        "summary": "These are the results for the searched text",
      },
      {
        "id": "2",
        "summary": "Here are some more results you searched for",
      },
      {
        "id": "2",
        "summary": "Searching for answers, are we?",
      },
      {
        "id": "2",
        "summary": "What more could you ask for?",
      }
    ]
  }
  updateSearch(e) {
    this.searchTerm = e.target.value
  }
}