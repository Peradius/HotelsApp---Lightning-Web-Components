/* eslint-disable no-console */
import { LightningElement, api, wire, track } from 'lwc';
import getHotels from '@salesforce/apex/HotelDropdownListController.getHotels';

export default class LwcHotelDropdownList extends LightningElement {
    @track hotels = [];
    @api rating;
    @api city;

    @wire(getHotels, {rating: '$rating', city: '$city'})
    wiredHotels({error, data}) {
        if(error) {
            this.error = error;
            this.hotels = null;
            console.log('Error receiving');
            console.log(error);
        } else if(data) {
            this.hotels = data;
            console.log('Success receiving');
        }
    }
    
    connectedCallback() {
        // Set initial values of the filters
        this.rating = 1;
        this.city = null;
    }
    
    updateFilters(event) {
        this.rating = event.rating;
        this.city = event.city;
        console.log(this.rating);
        console.log(this.city);
    }

    selectHotel(event) {
        let selectedHotel = event.target.value;

        const hotelsEvent = new CustomEvent('hotelselected', {
            detail: selectedHotel
        });
        this.dispatchEvent(hotelsEvent);
    }
}