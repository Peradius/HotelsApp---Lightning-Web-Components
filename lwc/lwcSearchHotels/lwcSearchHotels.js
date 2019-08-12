/* eslint-disable no-console */
import { LightningElement, api, track} from 'lwc';

export default class Lwc_searchHotels extends LightningElement {
    minimumRating = 1;
    city;
    @track minimumRatingVal = 1;
    @track cityVal;

    handleRatingChange(event) {
        this.minimumRating = event.target.value;
        console.log('Rating ' + this.minimumRating);
    }

    handleCityChange(event) {
        this.city= event.target.value;
        console.log('City ' + this.city);
    }

    filterClicked() {
        // If user specified no rating, then set the lowest possible
        if(this.minimumRating == null) {
            this.minimumRating = 1;
        }
        this.minimumRatingVal = this.minimumRating;
        this.cityVal = this.city;

        // this.sendHotelFiltersEvent(this.minimumRating, this.city);
    }
    
    sendHotelToMenu(event) {
        const selectedHotel = event.detail;
        const hotelsEvent = new CustomEvent('hotelselected', {
            detail: selectedHotel
        });
        this.dispatchEvent(hotelsEvent);
    }

    // sendHotelFiltersEvent(minimumRating, city) {
    //     const filtersEvent = new CustomEvent('hotel', {
    //         rating: minimumRating,
    //         city: city,
    //     });
    //     this.dispatchEvent(filtersEvent);
    //     console.log('event sent!');
    // }
}