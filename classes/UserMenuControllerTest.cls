@isTest
private class UserMenuControllerTest {   
    @testSetup static void setup() {
        // INSERT HOTEL
        Hotel__c newHotel = new Hotel__c(
            Name = 'Hotel Test', 
            Address__c = 'Testowa 1',
            City__c = 'Testowo',
            Rating__c = 2
        );
        insert newHotel;

        // INSERT ROOM
        Room__c newRoom = new Room__c(
            Name = 'Room 1',
            Hotel__c = newHotel.Id,
            Single_Beds__c = 2,
            Double_Beds__c = 2,
            Price_for_Night__c = 50,
            Executive_Room__c = false
        );
        insert newRoom;
        
        // INSERT GUEST
        Guest__c newGuest = new Guest__c(
            First_Name__c = 'Peter',
            Last_Name__c = 'Alloy',
            Email__c = 'testcase@test.com'
        );
        insert newGuest;
        
        // INSERT BILLING
        Billing__c newBilling = new Billing__c(
            Name = 'Name'
        );
        insert newBilling;

        // INSERT RESERVATION
        Reservation__c newReservation = new Reservation__c(
            Check_In__c = Date.newInstance(2019,7,4),
            Check_Out__c = Date.newInstance(2019,7,7),
            Guest__c = newGuest.Id,
            Room__c = newRoom.Id,
            Billing__c = newBilling.Id
        );
        insert newReservation;
        
        // INSERT SERVICE
        Service__c newService = new Service__c(
            Name = 'Test service',
            Hotel__c = newHotel.Id,
            Price__c = 20
        );
        insert newService;
    }
    
    @isTest static void getReservationsTest() {     
        Guest__c newGuest = [SELECT Id FROM Guest__c LIMIT 1];
        
        Test.startTest();
            List<Reservation__c> reservations = UserMenuController.getReservations(newGuest.Id);
        Test.stopTest();
        
        System.assertEquals(1, reservations.size());
    }
    
    @isTest static void getReservationsNullTest() {
        Guest__c newGuest = new Guest__c(
            First_Name__c = 'Peter',
            Last_Name__c = 'Mark',
            Email__c = 'nulltestcase@test.com'
        );
        insert newGuest;
  
        Test.startTest();
        	List<Reservation__c> reservations = UserMenuController.getReservations(newGuest.Id);
        Test.stopTest();
        
        System.assertEquals(null, reservations);
    }
    
    
    
}