import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

	private testMe = "Test me";

	constructor() { }

	callTestMe(): String {
		return this.testMe;
	}

}
