import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  loggedIn!: Observable<boolean>;

  ngOnInit(): void {
	  this.loggedIn=this.authService.isLoggedInO();
  }

  logout(): void {
	this.authService.logout();
	this.router.navigate(['/']);
  }

}
