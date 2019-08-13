/* eslint-disable no-console */
import { LightningElement, track} from 'lwc';
import findEmail from '@salesforce/apex/LwcGuestBookingController.findEmail';
import createGuest from '@salesforce/apex/LwcGuestBookingController.createGuest'

export default class LwcGuestBooking extends LightningElement { 
    @track newGuestFirstName;
    @track newGuestLastName;
    @track newGuestPhone;
    @track newGuestEmail;
    
    @track guest;
    @track hasAccountToggle = false;
    @track emailNotFound = false;

    emailToFind;

    changeEmailToFind(event) {
        this.emailToFind = event.target.value;
    }

    switchToggle() {
        this.hasAccountToggle = !this.hasAccountToggle;
    }

    submitEmail() {
        findEmail({
            email: this.emailToFind
        })
        .then(result => {
            console.log("Email found!");
            this.guest = result;
            this.emailNotFound = false;
            this.showSummaryPopup();
        })
        .catch(error => {
            this.error = error;
            console.log("Email " + this.emailToFind + " not found!");
            console.log(error);
            this.emailNotFound = true;
        })
    }

    submitNewGuest() {
        createGuest({
            firstName: this.newGuestFirstName,
            lastName: this.newGuestLastName,
            phone: this.newGuestPhone,
            email: this.newGuestEmail
        })
        .then(result => {
            console.log("Success inserting a new guest!");
            this.guest = result;
            this.showSummaryPopup();
        })
        .catch(error => {
            console.log("Error inserting a new guest!");
            console.log(error);
        })
    }

    showSummaryPopup() {
        const summaryPopupEvent = new CustomEvent('showsummarypopup', {
            detail: this.guest
        });
        this.dispatchEvent(summaryPopupEvent);
    }

    changeFirstName(event) {
        this.newGuestFirstName = event.target.value;
    }

    changeLastName(event) {
        this.newGuestLastName = event.target.value;
    }

    changePhone(event) {
        this.newGuestPhone = event.target.value;
    }

    changeEmail(event) {
        this.newGuestEmail = event.target.value;
    }

}