import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AwsService } from './aws.service'
import { Configuration } from './configuration';


@Injectable({
  providedIn: 'root'
})
export class Api11natorService {

	private goof = btoa('joe:joe');
	private jdbcUrl = 'api/jdbc';  // URL to web api
	//readonly server = "localhost:8010";
	readonly server = Configuration.SERVER;
	readonly proto = Configuration.PROTO; // or https

	private httpOptions = {
		headers: new HttpHeaders({
			'Authorization': 'Basic ' + this.goof
		}),
		responseType: 'text' as 'json'
	}


	constructor( private http: HttpClient ) { }

	getUno(): Observable<any>{
		return this.http.get(this.proto + '://' + this.server + '/api/jdbc/select uno from asdy', this.httpOptions);
	}

	getDue(): Observable<any>{
		return this.http.get(this.proto + '://' + this.server + '/api/jdbc/select due from asdy', this.httpOptions);
	}

	getCredentials( data: any ): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + btoa(data.username + ":" + data.password) 
			})
		}
		const url = this.proto + '://' + this.server + '/user';
		return this.http.get(url, httpOptions);
	}

	getUser( sku: string ): Observable<any>{

		let queryParams = new HttpParams();
		queryParams = queryParams.append("sku",sku);
		let httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.goof
			}),
			params: queryParams
		}
		const url = this.proto + '://' + this.server + '/api/users';
		return this.http.get(url, httpOptions);

	}

}
