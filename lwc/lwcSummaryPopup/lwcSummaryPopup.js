/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class LwcSummaryPopup extends LightningElement {
    @api hotel;
    @api room;
    @api guest;
    @api checkIn;
    @api checkOut;
    @api totalPrice;

    confirmBooking() {
        console.log('Confirm clicked');
    }
    
    cancelBooking() {
        console.log('Cancel clicked');
    }
    
}