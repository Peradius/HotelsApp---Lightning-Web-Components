/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class LwcHotelFilterBar extends LightningElement {
    @track minimumRatingVal;
    @track cityVal;

    minimumRating = 1;
    city;

    handleRatingChange(event) {
        this.minimumRating = event.target.value;
        console.log('Rating ' + this.minimumRating);
    }

    handleCityChange(event) {
        this.city= event.target.value;
        console.log('City ' + this.city);
    }

    filterClicked() {
        this.minimumRatingVal = this.minimumRating;
        this.cityVal = this.city;

        this.sendHotelFiltersEvent(this.minimumRating, this.city);
    }

    sendHotelFiltersEvent(minimumRating, city) {
        const filtersEvent = new CustomEvent('hotelfilters', {
            detail: {
                rating: minimumRating,
                city: city,
            }
        });
        this.dispatchEvent(filtersEvent);
        console.log('filters event sent!');
    }
}