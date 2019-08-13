import { LightningElement, api } from 'lwc';

export default class LwcShowBillingDataReservations extends LightningElement {
    @api reservations;

    financesClicked(event){
        let reservation = event.target.value;
        const showFinancesEvent = new CustomEvent('showreservationfinances', {
            detail: reservation
        });
        this.dispatchEvent(showFinancesEvent);
    }

    backClicked() {
        const closeBillingsEvent = new CustomEvent('closebilling');
        this.dispatchEvent(closeBillingsEvent);
    }
}