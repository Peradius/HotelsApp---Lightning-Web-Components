/* eslint-disable no-console */
import { LightningElement, api, track, wire } from 'lwc';
import getRooms from '@salesforce/apex/HotelRoomsListController.getRooms';

export default class LwcHotelRoomsList extends LightningElement {
    @api hotelId;
    @api checkInDate;
    @api checkOutDate;
    @api peopleInRoom;
    @api maxPrice = null;
    @api isExecutive = null;

    @track rooms = [];

    @wire(getRooms, {hotelId : '$hotelId', maxPrice : '$maxPrice', peopleInRoom : '$peopleInRoom', checkIn : '$checkInDate', checkOut : '$checkOutDate', isExecutive : '$isExecutive'})
    wiredRooms({error, data}) {
        if(error) {
            this.error = error;
            this.rooms = null;
            console.log('Error receiving');
            console.log(error);
        } else if(data) {
            this.rooms = data;
            console.log('Success receiving');
        }
    }

    bookThisRoom(event) {
        console.log('Booked room ' + event.target.value);
        console.log(this.totalDays);
    }
}