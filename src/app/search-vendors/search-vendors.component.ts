import { Component, OnInit } from '@angular/core';
import { SearchVendorsService } from './search-vendors.service';
import { Vendor } from '../vendor';
import { Subject, Observable, of } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search-vendors',
  templateUrl: './search-vendors.component.html',
  styleUrls: ['./search-vendors.component.css']
})
export class SearchVendorsComponent implements OnInit {

	vendors$!: Observable<Vendor[]>;
	private searchTerms = new Subject<string>();

	constructor(private location: Location, private searchVendorsService: SearchVendorsService) { }

	ngOnInit(): void {
		this.vendors$ = this.searchTerms.pipe(
			// wait 300ms after each keystroke before considering the term
			debounceTime(300),

			// ignore new term if same as previous term
			distinctUntilChanged(),

			// switch to new search observable each time the term changes
			switchMap((term: string) => this.searchVendorsService.searchVendors(term)),
		);

	}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

		    details(): void {
			    console.log(this.location.forward());
		    }

}
