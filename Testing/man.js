const express=require('express');
const mongoose=require('mongoose');
const app=express();
const PORT=8000;

urlData='mongodb://localhost:27017/qr';
mongoose.connect(urlData).then(() => console.log('MongoDB  connected')).catch((err) => console.log("Error connecting to MongoDB", err));

const urlSchema=new mongoose.Schema({
        url:{
        type:String,
        required:true,
},
});

const Url=mongoose.model("url",urlSchema);

app.get('/', async (req,res)=>{
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

app.post('/post', async (req, res) => {
    try {
        // Find if there's an existing URL record in the database
        let existingUrl = await Url.findOne();

        if (!existingUrl) {
            // If no existing URL found, create a new one
            existingUrl = await Url.create(req.body);
        } else {
            // If existing URL found, update it
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


app.listen(PORT,console.log('Server started'));