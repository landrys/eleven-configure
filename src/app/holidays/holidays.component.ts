import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnInit} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {HolidaysService} from './holidays.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

	addOnBlur = true;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	dates: string[]=[];

	constructor(private _snackBar: MatSnackBar, private holidaysService: HolidaysService) { }

	async ngOnInit(): Promise<void> {

		try {
			const data: any = await this.holidaysService.getHolidays();
			//console.log(data.Items[0].futureHolidays.SS);
			this.dates = data?.Items[0]?.futureHolidays?.SS;
			if ( this.dates === undefined ) {
				this.dates=[];
			}
			this.removeBogusDate();

			 
		} catch ( err ) {
			console.log(err);
			this._snackBar.open("Error getting holidays. See console for more info", '', {
				  duration: 3000
			});
		}
		 
		 
	}

	async add(event: MatChipInputEvent): Promise<void> {
		const value = (event.value || '').trim();

		// Add our holidays 
		if (value) {
			this.dates.push(value);
		}

		const data: any = await this.holidaysService.updateHolidays(this.dates);

		// Clear the input value
		event.chipInput!.clear();
	}

	async remove(date: string): Promise<void> {
		const index = this.dates.indexOf(date);

		if (index >= 0) {
			this.dates.splice(index, 1);
		}
		try {
			if (this.dates.length == 0){
				this.dates[0] = '2001-01-01';
			} 
			const data: any = await this.holidaysService.updateHolidays(this.dates);
			this.removeBogusDate();
		} catch (err) {
			console.log(err);
		}
	}

	// Added this to get around error when we have no defined values. Big Hack but I gave up on trying to fix it.
	removeBogusDate() {
		const startIndex = this.dates.indexOf('2001-01-01');
		if (startIndex !== -1) {
			this.dates.splice(startIndex, 1);
		}
	}
}

