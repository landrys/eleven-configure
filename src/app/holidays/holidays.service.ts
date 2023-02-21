import { Injectable } from '@angular/core';
import { AwsService } from '../aws.service';;
import { Configuration} from '../configuration';;

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

        readonly table = Configuration.VENDOR_SHIP_TIME_TABLE_SUPPORT;

	constructor(private awsService: AwsService ) { }

	updateHolidays( holidays: string[]): Promise<any>  {

		if ( holidays.length === 0 ){
			//holidays=null;
		}

		const params3 = {
			Statement: "UPDATE " + this.table + " set futureHolidays=? where support=?",
			Parameters: [{ SS: holidays }, {S: "customFutureHolidays"}],
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
			Statement: "SELECT * FROM " + this.table + " where support=?",
			Parameters: [{ S: "customFutureHolidays" }],
		}

			return  this.awsService.executeQuery(params3);
	}

}
