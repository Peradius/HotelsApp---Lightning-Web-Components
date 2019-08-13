/* eslint-disable no-console */
import { LightningElement, api, track, wire } from 'lwc';
import getRooms from '@salesforce/apex/LwcHotelRoomsListController.getRooms';

export default class LwcHotelRoomsList extends LightningElement {
    @api hotelId;
    @api checkInDate;
    @api checkOutDate;
    @api peopleInRoom;
    @api maxPrice = null;
    @api isExecutive = null;
    @api totalDays;

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
        let selectedRoom = event.target.value;
        console.log('selected room name: ' + selectedRoom.Name);
        console.log('and its price: ' + selectedRoom.Price_for_Night__c);

        let totalPrice = this.totalDays * selectedRoom.Price_for_Night__c;
        console.log('Total price: ' + totalPrice);

        const roomEvent = new CustomEvent('roomselected', {
            detail: {
                selectedRoom : selectedRoom,
                checkInDate : this.checkInDate,
                checkOutDate : this.checkOutDate,
                totalPrice : totalPrice
            }
        });
        this.dispatchEvent(roomEvent);
    }
}