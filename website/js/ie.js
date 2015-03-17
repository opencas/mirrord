/* ---------------------------------------------------------------------- */
/* ---------------------------------------------------------------------- */
/*	Browser Compatibility Check
 /* ---------------------------------------------------------------------- */
if ( $.browser.msie ) {
    var bResult = document.implementation.hasFeature("org.w3c.svg", "1.0");
    if(parseInt($.browser.version, 10) <= 7 && !bResult){
        window.location.href = "update-browser.html";
    }
}

