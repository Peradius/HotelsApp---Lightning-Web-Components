/* eslint-disable no-console */
import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class LwcUserInteractions extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    bookRoomClicked() {
        fireEvent(this.pageRef, 'applicationMenuChange', {
            showMainMenu : true,
            showUserMenu : false
        });
    }

    viewAccountClicked() {
        fireEvent(this.pageRef, 'applicationMenuChange', {
            showMainMenu : false,
            showUserMenu : true
        });
    }
}