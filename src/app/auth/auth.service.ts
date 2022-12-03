import { Injectable } from '@angular/core';
import { Observable, of, Subject  } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Api11natorService } from '../api11nator.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

	isLoggedIn = false;
	redirectUrl: string = "/navigation";
	isLoggedInS:Subject<boolean> =  new Subject<boolean>();
	isLoggedInO(){
		return this.isLoggedInS.asObservable();
	}


	constructor(private api11natorService: Api11natorService) { }


	findUser( pass: string ): Observable<any> {
		return this.api11natorService.getUser(pass);
	}

	getCredentials(data: any): Observable<any> {
		return this.api11natorService.getCredentials(data);
	}

	async login(data: any) {

		await this.api11natorService.getCredentials(data).toPromise().then( data =>
								      { if ( data.principal.principal.authorities[0].authority == "ROLE_ADMIN" ) 
									      {
										      this.isLoggedIn = true;
										      this.isLoggedInS.next(this.isLoggedIn);
									      } else {
										      this.isLoggedIn = false;
										      this.isLoggedInS.next(this.isLoggedIn);
										      console.log(data);

									      } 
								      },
								      err =>
								      {
									      this.isLoggedIn = false;
									      this.isLoggedInS.next(this.isLoggedIn);
									      console.log(err);
								      }
							      );
	}


	logout(): void {
		this.isLoggedIn = false;
		this.isLoggedInS.next(this.isLoggedIn);
	}

}
	/*
	login(): Observable<boolean> {
		return of(true).pipe(
			delay(1000),
			tap(val => this.isLoggedIn = true)
		);
	}
       */


