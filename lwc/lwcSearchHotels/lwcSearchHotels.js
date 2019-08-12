/* eslint-disable no-console */
import { LightningElement, api, track} from 'lwc';

export default class Lwc_searchHotels extends LightningElement {

    @track minimumRatingVal = 1;
    @track cityVal;

    handleHotelFilters(event) {
        console.log('Received rating: ' + event.detail.rating);
        console.log('Received city: ' + event.detail.city);
        this.minimumRatingVal = event.detail.rating;
        this.cityVal = event.detail.city;
    }

    sendHotelToMenu(event) {
        const selectedHotel = event.detail;
        const hotelsEvent = new CustomEvent('hotelselected', {
            detail: selectedHotel
        });
        this.dispatchEvent(hotelsEvent);
    }
}