public with sharing class LwcGuestBookingController {
    @AuraEnabled
    public static Guest__c createGuest(String firstName, String lastName, String phone, String email) {
        Guest__c newGuest = new Guest__c();
        newGuest.First_Name__c = firstName;
        newGuest.Last_Name__c = lastName;
        newGuest.Phone__c = phone;
        newGuest.Email__c = email;

        insert newGuest;
        return newGuest;
     }

    @AuraEnabled(cacheable=true)
    public static Guest__c findEmail(String email){
        List <Guest__c> guests = [SELECT Name, First_Name__c, Last_Name__c, Email__c, Phone__c FROM Guest__c WHERE Email__c = :email];
        if (guests.size() == 1){
            return guests[0];
        }
        return null;     
     }
}
