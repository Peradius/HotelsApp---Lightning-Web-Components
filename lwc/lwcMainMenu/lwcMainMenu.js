/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class LwcMainMenu extends LightningElement {
    @track pageOneOpened = true;
    @track pageTwoOpened = false;
    @track pageThreeOpened = false;
    @track pageFourOpened = false;

    @track hotel;

    handleHotelSelection(event) {
        this.pageOneOpened = false;
        this.pageTwoOpened = true;

        this.hotel = event.detail;
    }
}