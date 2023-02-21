import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from '../vendor';
import { AwsService } from '../aws.service';
import { VendorDetailService } from './vendor-detail.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent implements OnInit {

	vendor?: Vendor;
	newName: string = '';
	newWarehouse: string = '';
	newCutOffTime: string = '';
	newShippingCarrier: string = '';
	newShippingDays: number = 0;
	newRegularOrderDays?: string[];
	dropShipToStore?: boolean;
	dropShipToStoreChange: boolean = false;
	isBike?: boolean;
	isBikeChange: boolean = false;
	weeklyOrder?: boolean;
	weeklyOrderChange: boolean = false;
	orderDaysPattern="^[1-7](,[1-7]){0,6}$";
        cutOffTimePattern="([1]?[0-9]|2[0-3]):[0-5][0-9]";
	constructor( private route: ActivatedRoute,
		    private awsService: AwsService,
		    private vendorDetailService: VendorDetailService,
		    private location: Location,
		    private _snackBar: MatSnackBar,
		    private dialog: MatDialog ) { }

		    ngOnInit(): void {
			    this.getVendor();
		    }

		    async getVendor(): Promise<any> {
			    const id = Number(this.route.snapshot.paramMap.get('id'));
			    this.vendor = await this.vendorDetailService.getVendor(id);
			    this.dropShipToStore = this.vendor!.dropShipToStore;
			    this.isBike = this.vendor!.isBike;
			    this.weeklyOrder = this.vendor!.weeklyOrder;
		    }

		    goBack(): void {
			    this.location.back();
		    }
/* DELETE
		    save(): void {
			    this.vendorDetailService.save(this.vendor!);
		    }
		   */
		    
		    async saveString( attribute: string) {
			    try {

				    const attributeCapitalized = attribute.charAt(0).toUpperCase() + attribute.slice(1);
				    const newAttribute = "new" + attributeCapitalized; 
				    await this.vendorDetailService.saveString( attribute,  this[newAttribute as keyof VendorDetailComponent]! as string, this.vendor!.id.toString() );
				    (this.vendor![attribute as keyof Vendor] as any)=this[newAttribute as keyof VendorDetailComponent];
				    (this[newAttribute as keyof VendorDetailComponent] as string)='';
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }
		    async saveNumber( attribute: string) {
			    try {

				    const attributeCapitalized = attribute.charAt(0).toUpperCase() + attribute.slice(1);
				    const newAttribute = "new" + attributeCapitalized; 
				    await this.vendorDetailService.saveNumber( attribute,  this[newAttribute as keyof VendorDetailComponent]! as string, this.vendor!.id.toString() );
				    (this.vendor![attribute as keyof Vendor] as any)=this[newAttribute as keyof VendorDetailComponent];
				    (this[newAttribute as keyof VendorDetailComponent] as string)='';
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }



		    async saveNumberSet( attribute: string) {
			    try {

				    const attributeCapitalized = attribute.charAt(0).toUpperCase() + attribute.slice(1);
				    const newAttribute = "new" + attributeCapitalized; 
console.log(this[newAttribute as keyof VendorDetailComponent]);
				    await this.vendorDetailService.saveNumberSet( attribute,  this[newAttribute as keyof VendorDetailComponent]! as string[], this.vendor!.id.toString() );
				    (this.vendor![attribute as keyof Vendor] as any)=this[newAttribute as keyof VendorDetailComponent];
//this.newRegularOrderDays = undefined;
				    (this[newAttribute as keyof VendorDetailComponent] as any)=undefined;
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }



		    /*
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

		    async saveCutOffTime() {
			    try {
				    await this.vendorDetailService.saveIt( "cutOffTime",  this.newCutOffTime, this.vendor!.id.toString() );
				    this.vendor!.cutOffTime=this.newCutOffTime;
				    this.newCutOffTime='';
			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }

		   */
		    async saveBoolean(attribute: keyof VendorDetailComponent) {
			    try {
				    await this.vendorDetailService.saveBoolean( attribute as string,  this[attribute]! as boolean, this.vendor!.id.toString() );
				    const attributeChange = (attribute as string) + "Change";
				    (this.vendor![attribute as keyof Vendor] as any) = this[attributeChange as keyof VendorDetailComponent];

				    (this[attributeChange as keyof VendorDetailComponent] as any) = false;

			    } catch ( error ) {

				    this._snackBar.open("Error saving data to server. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }




		    private async delete(attribute: keyof Vendor ) {
			    console.log("Deleting attribute: " + attribute);
			    try {
				    await this.vendorDetailService.deleteAttribute( attribute, this.vendor!.id.toString() );
				    //this.getVendor();
				    (this.vendor![attribute] as any) = "";
				    
			    } catch ( error ) {

				    this._snackBar.open("Error deleting attribute. See console for more info", '', {
					    duration: 3000
				    });
				    console.log(error);
			    }
		    }



		    test(event : any) {
			    console.log("HERE");
		    }
		    changeCheckbox(event : any) {

			    console.log(event);

			    const attribute: string = event.source.id;
			    console.log(attribute);
			    const keyOfVendor = attribute as keyof Vendor;
			    const keyOfChange = (attribute + "Change") as keyof VendorDetailComponent;

			    if (event.checked === this.vendor![keyOfVendor]) {
				    (this[keyOfChange] as any)  = false;
			    } else {
				    (this[keyOfChange] as any) = true;
			    }
		    }


		    change3(event : any) {
console.log("Validity Change: " + event);
}
		    change2(event : any) {
console.log("ngModel Change: " + event);
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

				    break;

				    case "cutOffTime": 
					    console.log(event.target.value);
				    if (event.target.value !== this.vendor!.cutOffTime){
					    this.newCutOffTime=event.target.value;
				    } else {
					    this.newCutOffTime='';
				    }

				    break;

				    case "shippingCarrier": 
					    console.log(event.target.value);
				    if (event.target.value !== this.vendor!.shippingCarrier){
					    this.newShippingCarrier=event.target.value;
				    } else {
					    this.newShippingCarrier='';
				    }

				    break;

				    case "shippingDays": 
					    console.log(event.target.value);
				    if (event.target.value !== this.vendor!.shippingDays){
					    this.newShippingDays=event.target.value;
				    } else {
					    this.newShippingDays=0;
				    }

				    break;



				    case "regularOrderDays": 
				    if (typeof this.vendor!.regularOrderDays === "undefined") {
					    console.log(event.target.value);
					    console.log(event.target.value[0]);
					    if (typeof event.target.value[0] === 'undefined' ) {
						    this.newRegularOrderDays=undefined;
					    } else {
						    this.newRegularOrderDays=event.target.value.split(",");
					    }
				    } else if (  event.target.value !== this.vendor!.regularOrderDays!.toString() ) {
					    console.log(event);
					    this.newRegularOrderDays=event.target.value.split(",");
				    } else {
					    console.log(event.target.value);
					    this.newRegularOrderDays=undefined;
				    }

			    }
		    }

		    confirmDialog( attribute: keyof Vendor): void {
			    console.log(attribute);
			    const message = `Are you sure?`;

			    const dialogData = new ConfirmDialogModel("Confirm Deletion", message);

			    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
				    maxWidth: "400px",
				    data: dialogData
			    });

			    dialogRef.afterClosed().subscribe(dialogResult => {
				   if ( dialogResult ) {
					   this.delete (attribute);
				   }
			    });
		    }

}
