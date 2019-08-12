/* eslint-disable eqeqeq */
/* eslint-disable no-console */
import { LightningElement, track } from 'lwc';

export default class LwcFilterBar extends LightningElement {
    @track maximumPrice;
    @track isExecutive = false;

    updateMaximumPrice(event) {
        let value = event.target.value;
        if(value == '') {
            value = null;
        }
        this.maximumPrice = value;
        console.log('Maximum price ' + this.maximumPrice);
    }

    updateIsExecutive(event) {
        this.isExecutive = event.target.checked;
        console.log('isExecutive ' + this.isExecutive);
    }

    filterClicked() {
        const filtersEvent = new CustomEvent('roomfilters', {
            detail: {
                maxPrice : this.maximumPrice,
                isExecutive : this.isExecutive
            }
        });
        this.dispatchEvent(filtersEvent);
    }
}