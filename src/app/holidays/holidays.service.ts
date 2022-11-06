import { Injectable } from '@angular/core';
import { AwsService } from '../aws.service';;

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

	constructor(private awsService: AwsService ) { }

	updateHolidays( holidays: string[]): Promise<any>  {

		if ( holidays.length === 0 ){
			//holidays=null;
		}

		const params3 = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestTable set futureHolidays=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ SS: holidays }, {S: "one"}],
		}
		try {
			return  this.awsService.executeQuery(params3);
		} catch (err) {
			console.log("EError", err);
			throw(err);
		}
	}


	getHolidays(): Promise<any>  {

		const params3 = {
			// Statement: "SELECT * FROM VendorShipTimeSupport where support=?",
			Statement: "SELECT * FROM TestTable where id=?",
			//Parameters: [{ S: "customFutureHolidays" }],
			Parameters: [{ S: "one" }],
		}

			return  this.awsService.executeQuery(params3);
	}

}
