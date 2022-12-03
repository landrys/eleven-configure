import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	password: string  = "";
	message = 'status: Logged Out';


	constructor(private snackBar: MatSnackBar, public authService: AuthService, public router: Router) {
	}

	ngOnInit(): void {
		if (this.authService.isLoggedIn) {
			this.message = 'status: logged in'
		}
	}

	login() {

		this.authService.findUser(this.password).subscribe(
			(res) => { this.checkIfAuthorized(res); },
				(err) => { 
				console.log(err); 
				if(err.error.error=="Not Found") { 
					this.snackBar.open ( "No user found for given password", '', { duration: 4000 });
					console.log("No user found for given password"); 
				}
			});
	}

	async checkIfAuthorized( data : any ) {
		await this.authService.login(data);
		if ( this.authService.isLoggedIn ) {
			const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';
			this.message = 'status: logged in'
			this.router.navigateByUrl(redirect);
		} else {
			this.snackBar.open ( "You are not Authorized.", '', { duration: 4000 });
		}
	}

	logout() {
		this.authService.logout();
		this.message = 'status: logged out'
	}

}
				/*
		this.authService.login().subscribe((res) => {

			if (this.authService.isLoggedIn) {
				const redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login';
				this.message = 'status: logged in'
				this.router.navigateByUrl(redirect);
			}
		});
	       */

