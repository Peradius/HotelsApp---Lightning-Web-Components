/* eslint-disable no-console */
import { LightningElement, api, track} from 'lwc';
import getServices from '@salesforce/apex/LwcUserMenuController.getServices';


export default class LwcUserMenuReservations extends LightningElement {
    @api reservations;
    @api services;

    clickReservation(event) {
        let selectedReservation = event.target.value;
        this.queryServices(selectedReservation.Id);
        this.sendEvent(selectedReservation.Id);
    }

    queryServices(reservation) {
        getServices({
            reservationId: reservation
        })
        .then(result => {
            console.log("Success retrieving services!");
            this.services = result;
            console.log("Size is " + this.services.length);
        })
        .catch(error => {
            console.log("Error retrieving services!");
            console.log(error);
        })
    }

    sendEvent(reservation) {
        const showReservationServicesEvent = new CustomEvent('showreservationservices', {
            detail: {
                reservationId: reservation,
                services: this.services
            }
        });
        this.dispatchEvent(showReservationServicesEvent);
    }
}