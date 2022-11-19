import { Injectable } from '@angular/core';
import { Vendor } from '../vendor';
import { AwsService } from '../aws.service';

@Injectable({
  providedIn: 'root'
})
export class VendorDetailService {

	constructor(private awsService: AwsService) { }

	async getVendor ( id: Number ) : Promise<Vendor> {

		const params = {
			Statement: "SELECT * FROM TestVendorShipTime where id=?",
			Parameters: [{ N: id.toString()}]
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		const vendor: Vendor  = {id: +data.Items![0]['id'].N!, name: data.Items![0]['name']?.S, warehouse: data.Items![0]['warehouse']?.S};
		return vendor;
	}

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
	async deleteAttribute ( attrName: string, id: string ) : Promise<any> {

		const params = {
			//Statement: "UPDATE VendorShipTimeSupport set futureHolidays=? where support=customFutureHolidays",
			Statement: "UPDATE TestVendorShipTime remove " + attrName + " where id=?",
			//Parameters: [{S: "one"}],
			Parameters: [{N: id}],
		}

		const data = await this.awsService.executeQuery(params);
		console.log(data);
		return data;
	}









}
