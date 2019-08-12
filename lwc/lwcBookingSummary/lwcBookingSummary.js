import { LightningElement, api } from 'lwc';

export default class LwcBookingSummary extends LightningElement {
    @api hotel;
    @api room;
}