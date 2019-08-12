/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';

export default class LwcMainMenu extends LightningElement {
    @track pageOneOpened = true;
    @track pageTwoOpened = false;
    @track pageThreeOpened = false;
    @track pageFourOpened = false;

    @track hotel;

    handleHotelSelection(event) {
        this.hotel = event.detail;
        this.pageTwoOpened = true;
        console.log('Retrieved ' + this.hotel);
    }
}