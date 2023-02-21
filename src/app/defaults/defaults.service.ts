import { Injectable } from '@angular/core';
import { AwsService } from '../aws.service';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})

export class DefaultsService {

	readonly table = Configuration.VENDOR_SHIP_TIME_TABLE_SUPPORT;

	constructor(private awsService: AwsService ) { }

	getDefaults(): Promise<any>  {

		const params = {
			Statement: "SELECT * FROM " + this.table + " where support=?",
			Parameters: [{ S: "defaults" }],
		}

			return  this.awsService.executeQuery(params);
	}

	saveCutOffTime( cutOffTime: string ): Promise<any>  {

		const params = {

			Statement: "UPDATE " + this.table + " set cutOffTime=? where support=?",
			Parameters: [{ S: cutOffTime }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}

	saveLeadBusinessDays( leadBusinessDays: number ): Promise<any>  {

		
		const params = {

			Statement: "UPDATE " + this.table + " set leadBusinessDays=? where support=?",
			Parameters: [{ N: leadBusinessDays.toString() }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}

	saveShippingDays( shippingDays: number ): Promise<any>  {

		const params = {

			Statement: "UPDATE " + this.table + " set shippingDays=? where support=?",
			Parameters: [{ N: shippingDays.toString() }, {S: "defaults"}],
		}

			return  this.awsService.executeQuery(params);

	}

}
