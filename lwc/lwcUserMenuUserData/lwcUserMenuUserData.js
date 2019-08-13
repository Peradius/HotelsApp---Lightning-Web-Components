/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';

export default class LwcUserMenuUserData extends LightningElement {
    @api guest;
    @track showUserChangeData;

    changeUserData() {
        this.showUserChangeData = true;
    }

    showBilling() {
        console.log('show billing');
    }
}