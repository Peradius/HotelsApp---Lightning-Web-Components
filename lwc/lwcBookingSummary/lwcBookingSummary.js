import { LightningElement, api } from 'lwc';

export default class LwcBookingSummary extends LightningElement {
    @api hotel;
    @api room;
    @api guest;

    handleShowSummaryPopup(event) {
        this.guest = event.detail;
        const summaryPopupEvent = new CustomEvent('showsummarypopup', {
            detail: this.guest
        });

        this.dispatchEvent(summaryPopupEvent);
    }
}