import { Component } from '@angular/core';
import { Api11natorService } from './api11nator.service';
import { AwsService } from './aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	// Just doing this so that the singletons get instatiated before any calls
	// We have a bit of a race condition when gettint credentials.
	constructor(private api11natorService: Api11natorService,
		    private awsService: AwsService ) {
	}
}
