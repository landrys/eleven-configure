export interface Vendor {
  id: number;
  name?: string;
  warehouse?: string;
  cutOffTime?: string;
  shippingCarrier?: string;
  shippingDays?: string;
  regularOrderDays?: string[];
  dropShipToStore?: boolean;
  isBike?: boolean;
  weeklyOrder?: boolean;
}
