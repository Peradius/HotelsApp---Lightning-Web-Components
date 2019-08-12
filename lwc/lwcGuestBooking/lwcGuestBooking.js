/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import findEmail from '@salesforce/apex/GuestBookingController.findEmail';
import GUEST_OBJECT from '@salesforce/schema/Guest__c';
import GUEST_FIRST_NAME from '@salesforce/schema/Guest__c.First_Name__c';
import GUEST_LAST_NAME from '@salesforce/schema/Guest__c.Last_Name__c';
import GUEST_PHONE from '@salesforce/schema/Guest__c.Phone__c';
import GUEST_EMAIL from '@salesforce/schema/Guest__c.Email__c';

export default class LwcGuestBooking extends LightningElement {
    guestObject = GUEST_OBJECT;
    guestFields = [GUEST_FIRST_NAME, GUEST_LAST_NAME, GUEST_PHONE, GUEST_EMAIL];
    email;
    @track emailVal;
    guest;

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
        }
    }

    updateEmail(event) {
        this.email = event.target.value;
    }

    switchToggle() {
        this.hasAccountToggle = !this.hasAccountToggle;
    }

    submitEmail(event) {
        this.emailVal = this.email;
        console.log(this.email);
        console.log(this.wiredEmail);
    }

    submitNewGuest() {
        console.log('Guest inserted');
    }

}