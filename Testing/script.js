// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {

    // If found your QR code
    function onScanSuccess(decodeText, decodeResult) {
        alert("Your QR Code is: " + decodeText, decodeResult);
    }

    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbos: 250 }
    );
    htmlscanner.render(onScanSuccess);

    // Function to highlight QR code boundary
    function highlightQRBoundary() {
        const qrReader = document.getElementById("my-qr-reader");
        qrReader.style.border = "2px solid #ff0000"; // Red border
        setTimeout(() => {
            qrReader.style.border = "none"; // Remove border after 1 second
        }, 1000);
    }
});