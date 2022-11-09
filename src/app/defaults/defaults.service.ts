import { Injectable } from '@angular/core';
import { AwsService } from '../aws.service';;

@Injectable({
  providedIn: 'root'
})

export class DefaultsService {

	constructor(private awsService: AwsService ) { }

	getDefaults(): Promise<any>  {

		const params = {
			// Statement: "SELECT * FROM VendorShipTimeSupport where support=?",
			Statement: "SELECT * FROM TestTable where id=?",
			//Parameters: [{ S: "customFutureHolidays" }],
			Parameters: [{ S: "defaults" }],
		}

			return  this.awsService.executeQuery(params);
	}

	saveCutOffTime( cutOffTime: string ): Promise<any>  {

		const params = {

			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestTable set cutOffTime=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ S: cutOffTime }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}

	saveLeadBusinessDays( leadBusinessDays: number ): Promise<any>  {

		
		const params = {

			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestTable set leadBusinessDays=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ N: leadBusinessDays.toString() }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}

	saveShippingDays( shippingDays: number ): Promise<any>  {

		const params = {

			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestTable set shippingDays=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ N: shippingDays.toString() }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}








}
