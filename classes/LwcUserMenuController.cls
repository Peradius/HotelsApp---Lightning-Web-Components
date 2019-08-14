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

    @AuraEnabled
    public static Service_Billing__c addBilling(ID reservationId, Service__c service){
        Id billingId = getBillingByReservationId(reservationId);

        Service_Billing__c newServiceBilling = new Service_Billing__c(
            Name = service.Name,
            Service__c = service.Id,
            Billing__c = billingId
        );
    
        insert newServiceBilling;
        System.debug('newServiceBilling inserted');
        return newServiceBilling;
    }

    @AuraEnabled(cacheable=true)
    public static List<Service_Billing__c> getBillings(Id reservationId){
        Id billingId = getBillingByReservationId(reservationId);

        List<Service_Billing__c> servicebillings = [SELECT Name, Date__c, Service__r.Name, Service__r.Price__c, Service__r.Description__c 
                FROM Service_Billing__c 
                WHERE Billing__c = :billingId
                ORDER BY Date__c];

        if (servicebillings.size() > 0){
          return servicebillings;
        }

        return null;
    }

    private static Id getBillingByReservationId(Id reservationId){
        List<Reservation__c> billing = [SELECT Billing__r.Id FROM Reservation__c WHERE Reservation__c.Id = :reservationId];
        return billing[0].Billing__r.Id;
    }

    @AuraEnabled(cacheable=true)
    public static List<Service__c> getServices(Id reservationId){
        Id hotelId = getHotelId(reservationId);
        List<Service__c> services = [SELECT Name, Price__c, Description__c FROM Service__c WHERE Hotel__c = :hotelId];
        
        if (services.size() > 0){
          return services;
        }
        return null;
    }

    private static Id getHotelId(Id reservationId){
        List<Reservation__c> hotel = [SELECT Room__r.Hotel__c FROM Reservation__c WHERE Id = :reservationId LIMIT 1];
        return hotel.get(0).Room__r.Hotel__c;
    }
}
