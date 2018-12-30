/*
Different browser have different support problem.
Browser-polyfill will collect browser-support fix method.

Ref : https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills

author: jacky.chen
*/

// fix IE9 CustomEvent dosn't support.
// Ref : https://stackoverflow.com/questions/19345392/
(function() {
    if ( typeof(window.CustomEvent) === "function" ) return false;

    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;
}());
