/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';


export default class LwcHotelApplication extends LightningElement {
    @track mainMenuOpened = true;
    @track userMenuOpened = false;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('applicationMenuChange', this.handleMenuChange, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleMenuChange(event) {
        this.mainMenuOpened = event.showMainMenu;
        this.userMenuOpened = event.showUserMenu;
    }

}