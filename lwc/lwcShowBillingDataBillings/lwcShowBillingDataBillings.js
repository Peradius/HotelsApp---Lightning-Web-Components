import { LightningElement, api } from 'lwc';

export default class LwcShowBillingDataBillings extends LightningElement {
    @api billings;
    @api reservation
    @api reservationTotalBilling
    @api showTotalCost
}