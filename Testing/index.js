const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Import bodyParser to parse request bodies
const cors = require('cors'); // Import cors to handle Cross-Origin Resource Sharing

const app = express();
const PORT = 8000;

urlData = 'mongodb://13.127.248.27:27017/qr';
mongoose.connect(urlData, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("Error connecting to MongoDB", err));

const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
});

const Url = mongoose.model("url", urlSchema);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Middleware to handle Cross-Origin Resource Sharing
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const existingUrl = await Url.findOne();
        if (!existingUrl) {
            return res.status(404).send("No URL found");
        }
        return res.json(existingUrl);
    } catch (err) {
        console.error("Error getting URL:", err);
        return res.status(500).send("Internal Server Error");
    }
});

// Modified POST endpoint to simply add data to the database
// Modified POST endpoint to create or update a single entry
app.post('/post', async (req, res) => {
    try {
        // Check if there's an existing URL record in the database
        let existingUrl = await Url.findOne();

        if (!existingUrl) {
            // If no existing URL found, create a new one
            existingUrl = await Url.create({ url: req.body.url });
        } else {
            // If existing URL found, update its URL
            existingUrl.url = req.body.url;
            await existingUrl.save();
        }

        // Respond with the updated or newly created URL object
        return res.status(200).json(existingUrl);
    } catch (err) {
        // Handle errors
        console.error("Error creating/updating URL:", err);
        return res.status(500).send("Internal Server Error");
    }
});


app.listen(PORT, console.log('Server started'));
