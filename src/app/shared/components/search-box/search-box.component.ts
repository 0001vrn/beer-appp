import { Component, OnInit } from '@angular/core';
import { BeerService } from '../../services/beer.service';
import { Beer } from '../../model/beer-pagination-list.model';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  term = new FormControl();
  beers: Array<Beer>;
  categories: any;
  currentCategory: String;
  constructor(private _beerService: BeerService) { }

  ngOnInit() {
    this.initializeDropdowns();
    this.listenForInput();
  }

  initializeDropdowns() {
    this._beerService.getBeers().subscribe((res) => {
        this.beers = res.data;
        // tslint:disable-next-line:no-shadowed-variable
        this._beerService.getCategories().then(res => {
          this.categories = res.data;
        });
      });
  }

  listenForInput() {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(term => this.searchTerm(term, this.currentCategory)),
      // tslint:disable-next-line:no-unused-expression
      function (error) { console.log('Error happened' + error); },
      // tslint:disable-next-line:no-unused-expression
      function () { console.log('the subscription is completed'); };
  }
  currentCat(cat) {
    this.currentCategory = cat;
    this.searchTerm(this.term.value, cat);

  }
  searchTerm(search, category) {
    this._beerService.searchBeer(search, category);
  }
}
