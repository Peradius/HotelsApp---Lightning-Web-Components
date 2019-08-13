/* eslint-disable no-alert */
/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';
import createReservation from '@salesforce/apex/LwcSummaryPopupController.createReservation';

export default class LwcSummaryPopup extends LightningElement {
    @api hotel;
    @api room;
    @api guest;
    @api checkIn;
    @api checkOut;
    @api totalPrice;

    confirmBooking() {
        console.log('Confirm clicked');
        createReservation({
            guest: this.guest,
            room: this.room,
            checkIn: this.checkIn,
            checkOut: this.checkOut
        })
        .then(() => {
            console.log("Successfully created reservation");
            this.returnToMainPage();
        })
        .catch(error => {
            console.log("Error creating reservation!");
            console.log(error);
            this.returnToMainPage();
        })
    }
    
    cancelBooking() {
        console.log('Cancel clicked');
        this.returnToMainPage();
    }

    returnToMainPage() {
        alert("Reservation successfull!");
        const returnToMainPageEvent = new CustomEvent('returnmainpage');
        this.dispatchEvent(returnToMainPageEvent);
    }
    
}