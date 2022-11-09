import { Injectable } from '@angular/core';
import { Credentials  } from "@aws-sdk/types";
import { DynamoDB, DynamoDBClient, ExecuteStatementCommand, ExecuteStatementCommandInput, ScanCommand, ScanCommandInput, GetItemCommand, ListTablesCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

@Injectable({
  providedIn: 'root'
})

export class AwsService {

	private ddbClient: DynamoDBClient;
	private ddbDocClient: DynamoDBDocumentClient;

	constructor() { 


		const  credential = {
			accessKeyId: 'AKIAWDOWJNCMFCSX4HPR',
			secretAccessKey: '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'
		}
		/*
		const  credential = {
			accessKeyId: 'AKIAWDOWJNCMECZSORER',
			secretAccessKey: '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'
		}
	       */

		const region='us-east-1';
		this.ddbClient = new DynamoDBClient({ region: region, credentials: credential});

		// TODO get from our DB on Init...

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
