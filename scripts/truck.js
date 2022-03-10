(function (window) {
    "use strict";

    let App = window.App || {};

    function Truck(truckID, db) {
        this.truckID = truckID;
        this.db = db;
    }
    
    Truck.prototype.createOrder = function(order) {
        console.log("Adding order for " + order.emailAddress);
        this.db.add(order.emailAddress, order)
    }

    Truck.prototype.deliverOrder = function(customerID) {
        console.log("delivering order for " + customerID);
        this.db.remove(customerID)
    }

    Truck.prototype.printOrders = function() {

        //get all the email adresses (keys)
        let customerIDArray = Object.keys(this.db.getAll());

        console.log("Truck #" + this.truckID + " has pending orders:");

        //go through the list of emails I just created and get the order
        customerIDArray.forEach(function(id) {
            console.log(this.db.get(id));
        }.bind(this));


    }

    App.Truck = Truck;
    window.App = App;

})(window);