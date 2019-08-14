/* eslint-disable no-console */
import { LightningElement, api, track} from 'lwc';
import addBilling from '@salesforce/apex/LwcUserMenuController.addBilling';

export default class LwcUserMenuHotelServices extends LightningElement {
    @api reservationId;
    @api services;

    orderClicked(event) {
        let orderedService = event.target.value;

        addBilling({
            reservationId: this.reservationId,
            service: orderedService
        })
        .then( () => {
            console.log("Billing added!");
        })
        .catch( error => {
            console.log("Error adding billing!");
            console.log(error);
        })
    }
}