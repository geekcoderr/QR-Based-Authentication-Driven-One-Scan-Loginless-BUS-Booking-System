const qr = require('qrcode');
const express = require('express');
const PORT = 8000;
const app = express();

app.get('/', (req, res) => {
    const data = 'https://www.linkedin.com/in/nishant-maheshwari-geekcoderr';
    const options = {
        errorCorrectionLevel: 'H',
        type: 'png',
        quality: 0.92,
        margin: 1
    };

    // Generate QR code as a data URI
    qr.toDataURL(data, options, (err, url) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }

        // Render the QR code as an image
        console.log(url);
        res.send(`<img src="${url}" alt="QR Code">`);
    });
});

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
