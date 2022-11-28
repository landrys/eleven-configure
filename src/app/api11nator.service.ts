import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AwsService } from './aws.service'


@Injectable({
  providedIn: 'root'
})
export class Api11natorService {

	private jdbcUrl = 'api/jdbc';  // URL to web api
	//readonly server = "localhost:8010";
	readonly server = "testnator.com";

	private httpOptions = {
		headers: new HttpHeaders({
			'Authorization': 'Basic ' + btoa('joe:joe')
		}),
		responseType: 'text' as 'json'
	}


	constructor( private http: HttpClient ) { }

	getUno(): Observable<any>{
		return this.http.get('http://' + this.server + '/api/jdbc/select uno from asdy', this.httpOptions);
	}

	getDue(): Observable<any>{
		return this.http.get('http://' + this.server + '/api/jdbc/select due from asdy', this.httpOptions);
	}

}
