/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class LwcMainMenu extends LightningElement {
    @track pageOneOpened = true;
    @track pageTwoOpened = false;
    @track pageThreeOpened = false;
    @track pageFourOpened = false;

    @track hotel;
    @track room;

    handleHotelSelection(event) {
        this.pageOneOpened = false;
        this.pageTwoOpened = true;

        this.hotel = event.detail;
    }

    handleRoomSelection(event) {
        this.pageTwoOpened = false;
        this.pageThreeOpened = true;

        this.room = event.detail;

        console.log(this.hotel.Name);
        console.log(this.room.Name);
    }
}