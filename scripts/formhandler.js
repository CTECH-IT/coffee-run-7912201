(function(window) {
    "use strict";

    let App = window.App || {};
    let $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error("could not find element with selector: " + selector);
        }

        this.$formElement = $(selector);
    }

    //make the submit button work AND make createOrder a parameter
    
    FormHandler.prototype.addSubmitHandler = function(func) {
        console.log("Setting submit handler for the form...");

        this.$formElement.on("submit", function(event) {
            event.preventDefault();

            //put the info from the form into data
            let data = {};
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + " is " + item.value)
            })
            console.log(data);
            func(data);

            this.reset(); //reset upon submitting
            document.getElementById("strengthtext").innerHTML = "Strength: 30";
            this.elements[0].focus(); // make the cursor go to the coffee
        });
    }
    
    FormHandler.prototype.addInputHandler = function(func) {
        console.log("Setting Inputhandler for form")
        this.$formElement.on("input", '[name="emailAddress"]', function(event) {
            let emailAddress = event.target.value;
            if(func(emailAddress) == true) {
                event.target.setCustomValidity("");
            } else {
                event.target.setCustomValidity('"' + emailAddress + '" is not a valid e-mail address!');
            }
        });
    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);