(function(window) {
    "use strict"

    let App = window.App || {};
    let $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error("No remote URL supplied.")
        }
        this.serverUrl = url 
    }

    RemoteDataStore.prototype.add = function(key, val) {
        $.post(this.serverUrl, val, function(serverResponse) {
            console.log(serverResponse);
        })
    }

    RemoteDataStore.prototype.getAll = function(cb) {
        //send "get" to thye server url
        //pass in an anonymous function that calls the cb callback function
        $.get(this.serverUrl, function(serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        });
    }

    RemoteDataStore.prototype.get = function(key, cb) {
        $.get(this.serverUrl + '?emailAddress=' + key, function(serverResponse) {
            console.log(serverResponse);
            cb(serverResponse);
        })
    }

    RemoteDataStore.prototype.remove = function(key) {
        $.ajax(this.serverUrl + "?emailAddress=" + key, {type: "DELETE" });
    }
    
    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window);