/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';
import getReservations from '@salesforce/apex/LwcUserMenuController.getReservations';

export default class LwcUserMenu extends LightningElement {
    @track guest;
    @track loggedIn = false;
    @track reservations;
    @track showBillingPage = false;
    @track showReservationDetails = false;

    handleLogin(event) {
        this.guest = event.detail;
        this.loggedIn = true;
        this.queryReservations();
    }

    queryReservations() {
        getReservations({
            guestId: this.guest.Id
        })
        .then(result => {
            console.log('Reservations retrieved successfully!');
            this.reservations = result;
        })
        .catch(error => {
            console.log('Error retrieving reservations!');
            console.log(error);
        })
    }
}