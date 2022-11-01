import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {HolidaysService} from './holidays.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent{

	addOnBlur = true;
	readonly separatorKeysCodes = [ENTER, COMMA] as const;
	str = '2024-07-21';
	date1 = new Date(this.str);
	date2 = new Date(this.str);
	dates: Date[] = [this.date1, this.date2];

	constructor(private holidaysService: HolidaysService) { }

	add(event: MatChipInputEvent): void {
		console.log(this.holidaysService.callTestMe());
		const value = (event.value || '').trim();
		const dValue: Date = new Date(value);

		// Add our holidays 
		if (dValue) {
			this.dates.push(dValue);
		}

		// Clear the input value
		event.chipInput!.clear();
	}

	remove(date: Date): void {
		const index = this.dates.indexOf(date);

		if (index >= 0) {
			this.dates.splice(index, 1);
		}
	}
}

