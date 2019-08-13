/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import getBillings from '@salesforce/apex/LwcUserMenuController.getBillings';

export default class LwcShowBillingData extends LightningElement {
    @api reservations;
    @track reservation;
    @track billings;
    @track reservationTotalBilling;
    @track showTotalCost = false;

    handleReservationFinances(event){
        this.reservation = event.detail;
        this.queryBillings();
    }

    closeBilling() {
        const closeBillingsEvent = new CustomEvent('closebilling');
        this.dispatchEvent(closeBillingsEvent);
    }

    queryBillings() {
        // Set billing to null, so if the reservation has no billings, it wont show the
        // billings from another reservation which has them
        this.billings = null;
        getBillings({
            reservationId: this.reservation.Id
        })
        .then(result => {
            console.log("Success retrieving billings!");
            if(result != null) {
                this.billings = result;
                this.calculateTotalBilling(result);
            } else {
                console.log("There is no additional billings");
                this.calculateTotalBilling(null);
            }
        })
        .catch(error => {
            console.log("Error retrieveing billings");
            console.log(error);
        })
    }

    calculateTotalBilling(billings) {
        let sum = this.reservation.Reservation_Cost__c;
        
        if(billings != null) {
            for(let i = 0; i < billings.length; i++) {
				sum += billings[i].Service__r.Price__c;
			}
        }

        this.reservationTotalBilling = sum;
        this.showTotalCost = true;
    }
}