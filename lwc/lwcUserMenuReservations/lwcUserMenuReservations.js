import { LightningElement, api} from 'lwc';

export default class LwcUserMenuReservations extends LightningElement {
    @api reservations;
    services;

    clickReservation(event) {
        let selectedReservation = event.target.value;
    }
}