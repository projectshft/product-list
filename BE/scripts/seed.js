require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const Product = require('../models/product'); // Ensure this path is correct
const Review = require('../models/review'); // Ensure this path is correct

const uri = process.env.MONGODB_URI || "mongodb://lesavantdon:icecream2@localhost:27017/productsdb?authSource=admin";

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Database connected!');
    return Product.deleteMany({});  // Clear existing product data
  })
  .then(() => {
    console.log('Existing product data deleted!');
    
    // Sample product datanode
    const sampleProducts = [
      { 
        name: 'Ray-Ban Wayfarer', 
        price: 150, 
        category: 'Sunglasses',
        image: 'https://example.com/rayban-wayfarer.jpg',
        description: 'Classic Ray-Ban Wayfarer sunglasses, known for their iconic style.',
        userName: 'JohnDoe'
      },
      { 
        name: 'Oakley Holbrook', 
        price: 130, 
        category: 'Sunglasses',
        image: 'https://example.com/oakley-holbrook.jpg',
        description: 'Stylish Oakley Holbrook sunglasses designed for a modern look.',
        userName: 'JaneSmith'
      },
      { 
        name: 'Persol 714', 
        price: 250, 
        category: 'Sunglasses',
        image: 'https://example.com/persol-714.jpg',
        description: 'Foldable sunglasses designed by Persol.',
        userName: 'BobJohnson'
      },
      { 
        name: 'Maui Jim Peahi', 
        price: 220, 
        category: 'Sunglasses',
        image: 'https://example.com/maui-jim-peahi.jpg',
        description: 'Maui Jim Peahi sunglasses with polarized lenses.',
        userName: 'AliceWilliams'
      },
      { 
        name: 'Gucci GG0061S', 
        price: 400, 
        category: 'Sunglasses',
        image: 'https://example.com/gucci-gg0061s.jpg',
        description: 'Luxury sunglasses from Gucci with a stylish design.',
        userName: 'CharlieBrown'
      },
      { 
        name: 'Fendi FF 0240S', 
        price: 300, 
        category: 'Sunglasses',
        image: 'https://example.com/fendi-ff-0240s.jpg',
        description: 'Trendy Fendi sunglasses with a unique frame.',
        userName: 'SamanthaGreen'
      },
      { 
        name: 'Prada PR 17WS', 
        price: 350, 
        category: 'Sunglasses',
        image: 'https://example.com/prada-pr-17ws.jpg',
        description: 'Elegant Prada sunglasses perfect for any occasion.',
        userName: 'DanielThompson'
      },
      { 
        name: 'Tom Ford FT0237', 
        price: 500, 
        category: 'Sunglasses',
        image: 'https://example.com/tom-ford-ft0237.jpg',
        description: 'Tom Ford sunglasses with a luxury design.',
        userName: 'OliviaMartinez'
      },
      { 
        name: 'Bolon B6033', 
        price: 90, 
        category: 'Sunglasses',
        image: 'https://example.com/bolon-b6033.jpg',
        description: 'Affordable and stylish sunglasses by Bolon.',
        userName: 'SophiaRobinson'
      },
      { 
        name: 'Ray-Ban Aviator', 
        price: 160, 
        category: 'Sunglasses',
        image: 'https://example.com/rayban-aviator.jpg',
        description: 'Classic aviator sunglasses from Ray-Ban.',
        userName: 'LiamJones'
      },
      { 
        name: 'Vogue Eyewear VO4097S', 
        price: 180, 
        category: 'Sunglasses',
        image: 'https://example.com/vogue-vo4097s.jpg',
        description: 'Chic Vogue sunglasses with a vintage touch.',
        userName: 'EllaDavis'
      },
      { 
        name: 'Levi’s LV001', 
        price: 75, 
        category: 'Sunglasses',
        image: 'https://example.com/levis-lv001.jpg',
        description: 'Stylish Levi’s sunglasses that fit any casual outfit.',
        userName: 'AvaGarcia'
      }
    
    
    ];
    
    return Product.insertMany(sampleProducts); // Insert new product data
  })
  .then(async (insertedProducts) => {
    console.log('New products added!');

    // Sample review data with dynamic product IDs and required fields
    const sampleReviews = [
      { 
        productId: insertedProducts[0]._id, // Use the ID of the first inserted product
        review: 'Absolutely love these sunglasses! Perfect for sunny days.', // Actual review text
        rating: 5, 
        user: 'AliceWilliams', // User who made the review
      },
      { 
        productId: insertedProducts[1]._id, // Use the ID of the second inserted product
        review: 'Great style but a bit pricey. Still worth it!', // Actual review text
        rating: 4, 
        user: 'MichaelBrown', // User who made the review
      },
      { 
        productId: insertedProducts[2]._id, // ID of the Persol 714
        review: 'Stylish and functional, perfect for outdoor activities.',
        rating: 5, 
        user: 'SophieTurner',
      },
      { 
        productId: insertedProducts[3]._id, // ID of the Maui Jim Peahi
        review: 'The polarized lenses make a big difference! Highly recommend.',
        rating: 5, 
        user: 'EmmaStone',
      },
      { 
        productId: insertedProducts[4]._id, // ID of the Gucci GG0061S
        review: 'Luxury feel and stylish design, but the fit is a bit snug.',
        rating: 4, 
        user: 'DanielCraig',
      },
      { 
        productId: insertedProducts[5]._id, // ID of the Fendi FF 0240S
        review: 'These are my go-to sunglasses for every occasion!',
        rating: 5, 
        user: 'ScarlettJohansson',
      },
      { 
        productId: insertedProducts[6]._id, // ID of the Prada PR 17WS
        review: 'Great design, but they slip off my nose sometimes.',
        rating: 3, 
        user: 'ChrisHemsworth',
      },
      { 
        productId: insertedProducts[7]._id, // ID of the Tom Ford FT0237
        review: 'Truly a statement piece! Worth every penny.',
        rating: 5, 
        user: 'NataliePortman',
      },
      { 
        productId: insertedProducts[8]._id, // ID of the Bolon B6033
        review: 'Decent sunglasses for the price, but they feel a bit cheap.',
        rating: 3, 
        user: 'RyanGosling',
      },
      { 
        productId: insertedProducts[9]._id, // ID of the Ray-Ban Aviator
        review: 'Classic aviators that never go out of style!',
        rating: 4, 
        user: 'OliviaColman',
      },
      { 
        productId: insertedProducts[10]._id, // ID of the Vogue Eyewear VO4097S
        review: 'Love the vintage look! They fit perfectly.',
        rating: 5, 
        user: 'JessicaAlba',
      },
      { 
        productId: insertedProducts[11]._id, // ID of the Levi’s LV001
        review: 'Stylish and affordable, great for casual outings.',
        rating: 4, 
        user: 'TomHolland',
      },
    
    
    ];
    
    await Review.deleteMany({}); // Clear existing reviews
    console.log('Existing reviews deleted!');

    await Review.insertMany(sampleReviews); // Insert new reviews
    console.log('New reviews added!');
  })
  .catch(err => {
    console.error('Error:', err);
  })
  .finally(() => {
    mongoose.connection.close(); // Close the connection
  });
