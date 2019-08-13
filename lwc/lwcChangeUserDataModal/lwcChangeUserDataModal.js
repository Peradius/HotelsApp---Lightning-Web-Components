/* eslint-disable no-console */
import { LightningElement, api, track } from 'lwc';
import updateGuest from '@salesforce/apex/LwcUserMenuController.updateGuest';

export default class LwcChangeUserDataModal extends LightningElement {
    @api guest;

    @track firstName;
    @track lastName;
    @track phone;

    changeFirstName(event) {
        this.firstName = event.target.value;
    }

    changeLastName(event) {
        this.lastName = event.target.value;
    }

    changePhone(event) {
        this.phone = event.target.value;
    }

    confirm() {
        updateGuest({
            guest: this.guest,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone
        })
        .then(result => {
            console.log('Guest updated!');
            this.guest = result;
            this.closeModal();
        })
        .catch(error => {
            console.log('Error updating guest!');
            console.log(error);
        })
    }

    cancel() {
        this.closeModal();
    }

    closeModal() {
        const closeModalEvent = new CustomEvent('closemodal');
        this.dispatchEvent(closeModalEvent);
    }
}