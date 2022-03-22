(function(window) {
    "use strict"

    const FORM_SELECTOR = '[data-coffee-order="form"]'
    const CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]'
    const SERVER_URL = "http://saturn.rochesterschools.org:8080/json"

    let App = window.App;
    let Truck = App.Truck;
    let RemoteDataStore = App.RemoteDataStore;
    let DataStore = App.DataStore;
    let FormHandler = App.FormHandler;
    let Checklist = App.Checklist;
    let Validation = App.Validation;

    let remoteDS = new RemoteDataStore(SERVER_URL);

    let myTruck = new Truck('12345', remoteDS);
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

function showStrength(value) {
    document.getElementById("strengthtext").innerHTML = "Strength: " + value;
}