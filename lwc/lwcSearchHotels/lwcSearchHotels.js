/* eslint-disable no-console */
import { LightningElement, track} from 'lwc';

export default class Lwc_searchHotels extends LightningElement {
    @track minimumRatingVal = 1;
    @track cityVal;

    handleHotelFilters(event) {
        this.minimumRatingVal = event.detail.rating;
        this.cityVal = event.detail.city;
    }

    sendHotelToMenu(event) {
        let selectedHotel = event.detail;
        const hotelsEvent = new CustomEvent('hotelselected', {
            detail: selectedHotel
        });
        this.dispatchEvent(hotelsEvent);
    }
}