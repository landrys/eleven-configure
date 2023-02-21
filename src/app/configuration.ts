export class Configuration {
	static PROTO : string = "https"; // Eg. http or https use http for test and https for production otherwise wil get error trying to use an api call to http from an https web application
	static SERVER : string = "11nator.com"; // Eg testnator.com, 11nator.com, localhost:8010
	 /*
	static VENDOR_SHIP_TIME_TABLE : string = "TestVendorShipTime";
	static VENDOR_SHIP_TIME_TABLE_SUPPORT : string = "TestVendorShipTimeSupport";
       */
	static VENDOR_SHIP_TIME_TABLE : string = "VendorShipTime";
	static VENDOR_SHIP_TIME_TABLE_SUPPORT : string = "VendorShipTimeSupport";
}
