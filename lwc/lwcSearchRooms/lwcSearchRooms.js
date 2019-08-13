/* eslint-disable no-console */
import { LightningElement, track, api } from 'lwc';

export default class LwcSearchRooms extends LightningElement {
    @api hotelId;

    @track checkInDate;
    @track checkOutDate;
    @track peopleInRoom = 1;
    @track maxPrice = null;
    @track isExecutive = null;
    @track totalDays;
    
    @track errorMessage = '';
    @track isDateError = false;
    @track totalDays;

    handleRoomFilters(event) {
        this.maxPrice = event.detail.maxPrice;
        this.isExecutive = event.detail.isExecutive
    }

    updateCheckInDate(event) {
        this.checkInDate= event.target.value;
        console.log('Check-In Date ' + this.checkInDate);
        this.validateDate();
    }

    updateCheckOutDate(event) {
        this.checkOutDate= event.target.value;
        console.log('Check-Out Date ' + this.checkOutDate);
        this.validateDate();
    }

    updatePeopleInRoom(event) {
        this.peopleInRoom= event.target.value;
        console.log('People in room ' + this.peopleInRoom);
        this.validateDate();
    }

    validateDate() {
        let todayDate = new Date();
		let day = todayDate.getDate();
		let month = todayDate.getMonth() + 1;
        let year = todayDate.getFullYear();
        
        // if date is less then 10, then append 0 before date   
        if(day < 10) {
            day = '0' + day;
        } 
        // if month is less then 10, then append 0 before date    
        if(month < 10) {
            month = '0' + month;
        }
        
        let todayDateFormatted = year + '-' + month + '-' + day;

        // First validation : is not null
		if(this.checkInDate == null || this.checkOutDate == null) {
			this.errorMessage = "Please select the dates!";
			this.isDateError = true;
		} else {
			// Second validation : CheckIn Date is today or in the future
			if(this.checkInDate < todayDateFormatted) {
				this.errorMessage = "Check In must be today or in the future!";
				this.isDateError = true;
			} else {
				//Third validation : Check out is at least one day later after CheckIn
				if(this.checkOutDate <= this.checkInDate) {
					this.errorMessage = "Check Out must be at least one day after Check In!";
					this.isDateError = true;
				} else {
					// Dates are valid
					this.isDateError = false;
					this.errorMessage = '';
				}
			}
        }
        
        if(this.isDateError === false && this.peopleInRoom != null) {
            // Calculate num of days of guest's stay
            let startDate = new Date(this.checkInDate); 
            let endDate = new Date(this.checkOutDate);
            this.totalDays = (endDate - startDate) / 8.64e7;
        }
    }

    sendRoomToMenu(event) {
        const roomEvent = new CustomEvent('roomselected', {
            detail: {
                selectedRoom : event.detail.selectedRoom,
                checkInDate : event.detail.checkInDate,
                checkOutDate : event.detail.checkOutDate,
                totalPrice : event.detail.totalPrice
            }
        });
        this.dispatchEvent(roomEvent);
    }
}