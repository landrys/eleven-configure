import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '../vendor';
import { AwsService } from '../aws.service';
import { VendorDetailService } from './vendor-detail.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

	vendor?: Vendor;
	newName: string = '';
	newWarehouse: string = '';

	constructor( private route: ActivatedRoute,
		    private awsService: AwsService,
		    private vendorDetailService: VendorDetailService,
		    private location: Location,
		    private _snackBar: MatSnackBar) { }

		    ngOnInit(): void {
			    this.getVendor();
		    }

		    async getVendor(): Promise<any> {
			    const id = Number(this.route.snapshot.paramMap.get('id'));
			    this.vendor = await this.vendorDetailService.getVendor(id);
		    }

		    goBack(): void {
			    this.location.back();
		    }

		    save(): void {
			    this.vendorDetailService.save(this.vendor!);
		    }

		    async saveName() {
			    try {
				    await this.vendorDetailService.saveIt( "name",  this.newName, this.vendor!.id.toString() );
				    this.vendor!.name=this.newName;
				    this.newName='';
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }

		    async saveWarehouse() {
			    try {
				    await this.vendorDetailService.saveIt( "warehouse",  this.newWarehouse, this.vendor!.id.toString() );
				    this.vendor!.warehouse=this.newWarehouse;
				    this.newWarehouse='';
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }

		    async deleteWarehouse() {
			    try {
				    await this.vendorDetailService.deleteAttribute( "warehouse", this.vendor!.id.toString() );
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }




		    change(event : any) {
			    switch ( event.srcElement.id ) {
				    case "name": 
					    if (event.target.value !== this.vendor!.name){
					    this.newName=event.target.value;
				    } else {
					    this.newName='';
				    }

				    break;

				    case "warehouse": 
					    console.log(event.target.value);
					    if (event.target.value !== this.vendor!.warehouse){
					    this.newWarehouse=event.target.value;
				    } else {
					    this.newWarehouse='';
				    }

			    }
		    }




}
