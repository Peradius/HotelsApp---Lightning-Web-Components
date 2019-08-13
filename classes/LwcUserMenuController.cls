public with sharing class LwcUserMenuController {
@AuraEnabled(cacheable=true)
    public static List<Reservation__c> getReservations(Id guestId){
        List<Reservation__c> reservations = [SELECT Check_In__c, Check_Out__c, Reservation_Cost__c, Reservation_Date__c, Name, 
                Room__r.Photo__c, Room__r.Name, Room__r.Single_Beds__c, Room__r.Double_Beds__c 
                FROM Reservation__c  WHERE Guest__c = :guestId];
        
        if (reservations.size() > 0){
          return reservations;
        }
        return null;
    }

    @AuraEnabled
    public static Guest__c updateGuest(Guest__c guest, String firstName, String lastName, String phone){
        guest.First_Name__c = firstName;
        guest.Last_Name__c = lastName;
        guest.Phone__c = phone;
        
        update guest;
        System.debug('Guest updated!');
        return guest;
    }
}
