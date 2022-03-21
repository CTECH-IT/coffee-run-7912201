(function(window) {
    "use strict"

    const FORM_SELECTOR = '[data-coffee-order="form"]'
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'
    const SERVER_URL = 

    let App = window.App;
    let Truck = App.Truck;
    let RemoteDataStore = App.RemoteDataStore;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let Checklist = App.Checklist;
    let Validation = App.Validation;

    let myTruck = new Truck('12345', new DataStore());
    let checklist = new Checklist(CHECKLIST_SELECTOR);



    window.myTruck = myTruck;

    let formHandler = new FormHandler(FORM_SELECTOR);

    //when a checkbox is clicked, call deliverOrder on myTruck
    checklist.addClickHandler(myTruck.deliverOrder.bind(myTruck))


    formHandler.addSubmitHandler(function(data) {
        myTruck.createOrder.call(myTruck, data);
        checklist.addRow.call(checklist, data);
    })

    formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);