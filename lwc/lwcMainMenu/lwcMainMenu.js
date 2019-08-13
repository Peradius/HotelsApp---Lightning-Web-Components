/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class LwcMainMenu extends LightningElement {
    @track pageOneOpened = true;
    @track pageTwoOpened = false;
    @track pageThreeOpened = false;
    @track pageFourOpened = false;

    @track hotel;
    @track room;
    @track guest;
    @track checkIn;
    @track checkOut;
    @track totalPrice;

    handleHotelSelection(event) {
        this.pageOneOpened = false;
        this.pageTwoOpened = true;

        this.hotel = event.detail;
    }

    handleRoomSelection(event) {
        this.pageTwoOpened = false;
        this.pageThreeOpened = true;

        this.room = event.detail.selectedRoom;
        this.checkIn = event.detail.checkInDate;
        this.checkOut = event.detail.checkOutDate;
        this.totalPrice = event.detail.totalPrice;

        console.log(this.hotel.Name);
        console.log(this.room.Name);
    }

    handleShowSummaryPopup(event) {
        this.guest = event.detail;

        this.pageThreeOpened = false;
        this.pageFourOpened = true;
    }
}