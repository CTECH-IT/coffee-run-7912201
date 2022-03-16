(function(window) {
    "use strict"

    let App = window.App || {};
    let $ = window.jQuery;

    function Checklist(selector) {
        if (!selector) {
            throw new Error("No Selector Provided");
        }
        this.$element = $(selector);
        if (this.$element.length == 0) {
            throw new Error("Could not find element with selector: " + selector)
        }
    }

    function Row(coffeeOrder) {
        let $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });
        let $label = $('<label></label>');
        let $checkbox = $('<input></input>', {
            'type': 'checkbox',
            'value': coffeeOrder.emailAddress
        });
        let description = coffeeOrder.size + " ";
        if(coffeeOrder.flavor) {
            description += coffeeOrder.flavor + " ";
        } 
        description += coffeeOrder.coffee + ", ";
        description += "(" + coffeeOrder.emailAddress + ")  ";
        description += "[" + coffeeOrder.strength + "x]";

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;

    }

    //make a new row
    Checklist.prototype.addRow = function(coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element)
    }

    Checklist.prototype.removeRow = function(emailAddress) {
        this.$element
            .find('[value="' + emailAddress + '"]')
            .closest('["data-coffee-order="checkbox"]')
            .remove();
    }  

    App.Checklist = Checklist;
    window.App = App;


})(window);