import { Injectable } from '@angular/core';
import { Credentials  } from "@aws-sdk/types";
import { DynamoDB, DynamoDBClient, ExecuteStatementCommand, ExecuteStatementCommandInput, ScanCommand, ScanCommandInput, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Vendor } from './vendor';
import { Api11natorService } from './api11nator.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AwsService {

	private ddbClient!: DynamoDBClient;
	private ddbDocClient!: DynamoDBDocumentClient;
	private key!: string;
	private sec!: string;

	constructor(private api11natorService: Api11natorService) { 
		api11natorService.getUno().subscribe(data => this.setItUp(data));
	}

	private setItUp( data:any ) {
		this.key = data.replace('uno\n','');
		this.api11natorService.getDue().subscribe(data => this.setItUp2(data));
	}

	private setItUp2( data:any ) {

		this.sec = data.replace('due\n','');

		const  credential = {
			accessKeyId: this.key.trim(),
			secretAccessKey: this.sec.trim()
		}

		const region='us-east-1';
		this.ddbClient = new DynamoDBClient({ region: region, credentials: credential});

		const  marshallOptions = {
			// Whether to automatically convert empty strings, blobs, and sets to `null`.
			convertEmptyValues: true, // false, by default.
			// Whether to remove undefined values while marshalling.
			removeUndefinedValues: true, // false, by default.
			// Whether to convert typeof object to map attribute.
			convertClassInstanceToMap: false, // false, by default.
		}

		const unmarshallOptions = {
			// Whether to return numbers as a string instead of converting them to native JavaScript numbers.
			wrapNumbers: false, // false, by default.
		}

		const translateConfig = { marshallOptions, unmarshallOptions };

		this.ddbDocClient = DynamoDBDocumentClient.from(this.ddbClient, translateConfig);

	}

	async executeVendorsQuery ( input: ExecuteStatementCommandInput ) : Promise<Vendor[]> {
		const data = await this.ddbDocClient.send(new ExecuteStatementCommand(input));
		var vendors: Vendor[];
		vendors = data.Items!.map( (val,index)  => { return {id: +val['id'].N!, name: val['name']?.S, warehouse: val['warehouse']?.S} });
		console.log(vendors);
		return vendors;
	}

	async executeQuery( input: ExecuteStatementCommandInput ) {
			const data = await this.ddbDocClient.send(new ExecuteStatementCommand(input));
			return data;
	}

	async getWithScan( input: ScanCommandInput ) {
		try {
			const data = await this.ddbDocClient.send(new ScanCommand(input));
			return data;
		} catch (err) {
			console.log("Error", err);
			throw(err);
		}
	}

}
