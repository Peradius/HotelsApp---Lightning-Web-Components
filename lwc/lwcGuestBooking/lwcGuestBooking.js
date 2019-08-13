/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import findEmail from '@salesforce/apex/GuestBookingController.findEmail';

export default class LwcGuestBooking extends LightningElement { 
    email;
    @track emailVal;
    @track guest;

    @track newGuestFirstName;
    @track newGuestLastName;
    @track newGuestPhone;
    @track newGuestEmail;
    
    @track hasAccountToggle = false;
    @track emailNotFound = false;

    @wire(findEmail, {email : '$emailVal'})
    wiredEmail({error, data}) {
        if(error) {
            this.error = error;
            console.log("Email " + this.emailVal + " not found!");
            console.log(error);
            this.emailNotFound = true;
        } else if(data) {
            console.log("Email found!");
            this.guest = data;
            this.emailNotFound = false;
            this.showSummaryPopup();
        }
    }

    updateEmail(event) {
        this.email = event.target.value;
    }

    switchToggle() {
        this.hasAccountToggle = !this.hasAccountToggle;
    }

    submitEmail() {
        this.emailVal = this.email;
    }

    submitNewGuest(event) {
        console.log('newGuest name: ' + this.newGuest.First_Name__c);
        // console.log('Guest inserted');
        // let guest = event.target.value;
        // console.log(guest);
        // console.log(guest.First_Name__c);
    }

    showSummaryPopup() {
        const summaryPopupEvent = new CustomEvent('showsummarypopup', {
            detail: this.guest
        });
        this.dispatchEvent(summaryPopupEvent);
    }

}