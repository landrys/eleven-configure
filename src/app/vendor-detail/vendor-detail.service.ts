import { Injectable } from '@angular/core';
import { Vendor } from '../vendor';
import { AwsService } from '../aws.service';
import { Configuration } from '../configuration';

@Injectable({
  providedIn: 'root'
})
export class VendorDetailService {

	readonly table = Configuration.VENDOR_SHIP_TIME_TABLE;

	constructor(private awsService: AwsService) { }

	async getVendor ( id: Number ) : Promise<Vendor> {

		const params = {
			Statement: "SELECT * FROM " + this.table + " where id=?",
			Parameters: [{ N: id.toString()}]
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		const vendor: Vendor  = {
			id: +data.Items![0]['id'].N!, name: data.Items![0]['name']?.S, 
			warehouse: data.Items![0]['warehouse']?.S, 
			cutOffTime: data.Items![0]['cutOffTime']?.S,
			shippingCarrier: data.Items![0]['shippingCarrier']?.S,
			shippingDays: data.Items![0]['shippingDays']?.N,
			regularOrderDays: data.Items![0]['regularOrderDays']?.NS,
			dropShipToStore: data.Items![0]['dropShipToStore']?.BOOL,
			isBike: data.Items![0]['isBike']?.BOOL,
			weeklyOrder: data.Items![0]['weeklyOrder']?.BOOL
		};
		return vendor;
	}

	async saveString ( attrName: string, attr: string, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE " + this.table + " set " + attrName + "=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ S: attr }, {N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
	async saveNumber ( attrName: string, attr: string, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE " + this.table +  " set " + attrName + "=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ N: attr }, {N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
	
	
	async saveBoolean ( attrName: string, attr: boolean, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE " +  this.table +  " set " + attrName + "=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ BOOL: attr }, {N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}

	async saveNumberSet ( attrName: string, attr: string[], id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE " + this.table + " set " + attrName + "=? where id=?",
			//Parameters: [{S: "one"}],
				Parameters: [{ NS: attr }, {N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
	



	async deleteAttribute ( attrName: string, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE " + this.table + " remove " + attrName + " where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
}
	/*
	async saveIt ( attrName: string, attr: string, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestVendorShipTime set " + attrName + "=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ S: attr }, {N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
	
       */
	/*
	async save ( vendor: Vendor ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestVendorShipTime set name=? set warehouse=? where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{ S: vendor.name! }, {S: vendor.warehouse!}, {N: vendor.id!.toString()}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}
       */



