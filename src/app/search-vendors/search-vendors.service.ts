import { Injectable } from '@angular/core';
import { Vendor } from '../vendor';
import { AwsService } from '../aws.service';;
import { Observable, of, defer, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchVendorsService {

  constructor(private awsService: AwsService) { }

  searchVendors(term: string): Observable<Vendor[]> {

	  if (!term.trim()) {
		  // if not search term, return empty vendors array as observable.
		  return of([]);
	  }

	  const params = {
		  Statement: "SELECT * FROM TestVendorShipTime where contains(\"name\", ?)",
		  Parameters: [{ S: term }],
	  }

/*
TRIED TO DO IT HERE INSTEAD OF AT AWSSERVICE BUT REAN INTO SOME ISSUES GETTING THE CORRECT TYPE PASSED WITH ASYNC FUNCTION
	  const data = await awsService.executeQuery(params);

	  var vendors: Vendor[];
	  vendors = data.Items!.map( (val,index)  => { return {id: +val['id'].N!, name: val['name']?.S, warehouse: val['warehouse']?.S} });

	  const observableFromPromise = defer(() => from(vendors));
	  return observableFromPromise;
*/

	  const observableFromPromise = defer(() => from(this.awsService.executeVendorsQuery(params)));
	  return observableFromPromise;
  }


}
