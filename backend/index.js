//index.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const MONGO_URL = "mongodb://127.0.0.1:27017/restarount";

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
        seedRestaurantData();
        startServer();
    })
    .catch((error) => {
        console.log("Failed to connect to MongoDB", error);
    });

// Define the restaurant model
const restaurantSchema = new mongoose.Schema({
    name: String,
    address: String,
    contact: String,
    location: String,
    rating: Number,
    offers: Boolean,
    cuisines: [String],
    image: String,
});
const RestaurantModel = mongoose.model("Restaurant", restaurantSchema);

async function seedRestaurantData() {
    await RestaurantModel.deleteMany({});

    const restaurantData = [
        {
            name: "Tandoor Palace",
            address: "123 Main Street, Hyderabad",
            contact: "123-456-7890",
            location: "Hyderabad",
            rating: 3.5,
            offers: true,
            cuisines: ["North Indian", "Biryani"],
            image:
                "https://wallpaperaccess.com/full/1972889.jpg",
        },
        {
            name: "Sushi Samba",
            address: "456 Oak Avenue, Bangalore",
            contact: "987-654-3210",
            location: "Bangalore",
            rating: 4.8,
            offers: true,
            cuisines: ["Japanese", "Sushi"],
            image:
                "https://image.khaleejtimes.com/?uuid=50c0f154-d638-519b-a53d-8dd4e8363f3a&function=fit&type=preview&source=false&q=75&maxsize=1200&scaleup=0",
        },
        {
            name: "La Trattoria",
            address: "789 Elm Street, Mumbai",
            contact: "456-789-0123",
            location: "Mumbai",
            rating: 3.2,
            offers: false,
            cuisines: ["Italian", "Pastas", "Pizzas"],
            image:
                "https://www.fatchefcompany.co.uk/_webedit/cached-images/191-0-556-0-8889-10000-1280.jpg",
        },
        {
            name: "Spice Garden",
            address: "321 Oak Road, Delhi",
            contact: "789-012-3456",
            location: "Delhi",
            rating: 2.7,
            offers: true,
            cuisines: ["South Indian", "Vegetarian"],
            image:
                "https://d1oh9y2nmj4y5b.cloudfront.net/uploads/photo/filename/2308/09_resizedforweb.jpg",
        },
        {
            name: "Chopsticks",
            address: "654 Maple Lane, Pune",
            contact: "012-345-6789",
            location: "Pune",
            rating: 4.3,
            offers: true,
            cuisines: ["Chinese", "Asian Fusion"],
            image:
                "https://i.gadgets360cdn.com/large/2-1598024648772.jpg?downsize=600:*&output-quality=80",
        },
        {
            name: "Seaside Grill",
            address: "987 Beach Road, Chennai",
            contact: "345-678-9012",
            location: "Chennai",
            rating: 3.6,
            offers: true,
            cuisines: ["Seafood", "Barbecue"],
            image:
                "https://www.seaside-grill.com/wp-content/uploads/2022/05/DSC07813.jpg",
        },
        {
            name: "Pasta Perfetto",
            address: "159 Elm Avenue, Hyderabad",
            contact: "678-901-2345",
            location: "Hyderabad",
            rating: 2.4,
            offers: false,
            cuisines: ["Italian", "Pastas"],
            image:
                "https://perfetto.com.sa/storage/app/uploads/public/xRw/Ns6/_%D9%85/thumb_2334_800x465_0_0_auto.jpg",
        },
        {
            name: "Sizzle Steak House",
            address: "753 Oak Street, Bangalore",
            contact: "901-234-5678",
            location: "Bangalore",
            rating: 3.9,
            offers: true,
            cuisines: ["Steak", "American"],
            image:
                "https://media.geeksforgeeks.org/wp-content/uploads/20240110004646/file.jpg",
        },
        {
            name: "Dosa Delights",
            address: "369 Main Road, Chennai",
            contact: "234-567-8901",
            location: "Chennai",
            rating: 4.1,
            offers: true,
            cuisines: ["South Indian", "Vegetarian"],
            image:
                "https://tse3.mm.bing.net/th?id=OIP.94wCgav1mHUJP0E-fIM9TwHaE8&pid=Api&P=0&h=220",
        },
        {
            name: "Bella Napoli",
            address: "852 Pine Avenue, Mumbai",
            contact: "567-890-1234",
            location: "Mumbai",
            rating: 4.6,
            offers: true,
            cuisines: ["Italian", "Pizzas"],
            image:
                "https://media.geeksforgeeks.org/wp-content/uploads/"+
                "20240110004602/pexels-chan-walrus-958545-(1).jpg",
        },
    ];

    await RestaurantModel.insertMany(restaurantData);
    console.log("Restaurant data seeded successfully!");
}

function startServer() {
    app.get("/health", (req, res) => {
        res.status(200)
        .json("Server is up and running");
    });

    app.get("/api/restaurants", async (req, res) => {
        try {
            const restaurants = await RestaurantModel.find({});
            res.status(200).json({ success: true, data: restaurants });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}