import { Component, OnInit } from '@angular/core';
import {DefaultsService} from './defaults.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.css']
})
export class DefaultsComponent implements OnInit {

	cutOffTime = '';
        cutOffTimePattern="([1]?[0-9]|2[0-3]):[0-5][0-9]";
	leadBusinessDays = 0;
	shippingDays = 0;

	newCutOffTime = '';
	newLeadBusinessDays = 0;
	newShippingDays = 0;

	constructor(private _snackBar: MatSnackBar, private defaultsService: DefaultsService) { }

	async ngOnInit(): Promise<void> {
		try {
			const data: any = await this.defaultsService.getDefaults();
			this.cutOffTime=(data.Items[0].cutOffTime.S);
			this.leadBusinessDays=(data.Items[0].leadBusinessDays.N);
			this.shippingDays=(data.Items[0].shippingDays.N);
			 
		} catch ( err ) {
			console.log(err);
			this._snackBar.open("Error getting defaults. See console for more info", '', {
				  duration: 3000
			});
		}
		 
	}

	change(event : any){

		switch ( event.srcElement.id ) {
			case "cutOffTime": 
				if (event.target.value !== this.cutOffTime){
				       this.newCutOffTime=event.target.value;
			        } else {
				       this.newCutOffTime = '';
			        }
			break;
			case "leadBusinessDays": 
				if (event.target.value !== this.leadBusinessDays){
				       this.newLeadBusinessDays=event.target.value;
			        } else {
				       this.newLeadBusinessDays = 0;
			        }
			break;
			case "shippingDays": 
				if (event.target.value !== this.shippingDays){
				       this.newShippingDays=event.target.value;
			        } else {
				       this.newShippingDays = 0;
			        }
			break;

		}
	}


	async saveCutOffTime() {
		try {
			await this.defaultsService.saveCutOffTime( this.newCutOffTime );
			this.cutOffTime=this.newCutOffTime;
			this.newCutOffTime='';
		} catch ( error ) {

			this._snackBar.open("Error saving data to server. See console for more info", '', {
				duration: 3000
			});
			console.log(error);
		}
	}

	async saveLeadBusinessDays() {

		try {
			await this.defaultsService.saveLeadBusinessDays( this.newLeadBusinessDays );
			this.leadBusinessDays = this.newLeadBusinessDays;
			this.newLeadBusinessDays=0;

		} catch ( error ) {

			this._snackBar.open("Error saving data to server. See console for more info", '', {
				duration: 3000
			});

			console.log(error);
		}

	}

	async saveShippingDays() {

		try {
			await this.defaultsService.saveShippingDays( this.newShippingDays );
			this.shippingDays = this.newShippingDays;
			this.newShippingDays = 0;

		} catch ( error ) {

			this._snackBar.open("Error saving data to server. See console for more info", '', {
				duration: 3000
			});

			console.log(error);
		}

	}





}
