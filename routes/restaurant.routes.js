const express = require("express");
const router = express.Router(); 
const Restaurant = require('../models/restaurant.model')

// Create 

router.get("/create", (req, res, next) => {
   res.render("restaurant-views/create");
 });

router.post('/create', async(req,res) => {
   /* const restaurant = new Restaurant ({
        author: req.body.author,
        title: req.body.title,
        address: req.body.address,
        phoneNumber: req.body.phone,
        availableFood: req.body.availableFood,
        foodTypes: req.body.foodTypes,
        comments: req.body.comments 
    });*/

    try {
        // const newRestaurant = await restaurant.save();
        const newRestaurant = Restaurant.create({...req.body, author: req.session.currentUser._id});
        // res.status(201).json(newRestaurant);
        res.render('restaurant-views/details', {restaurant: newRestaurant});
    } catch (err) {
        next(err);
    }
})    
    // Read 

    router.get('/details/:restaurantsId', (req, res, next) => {
        restaurant.findbyId(req.params.restaurantId)
        .then(restaurant => {
            res.render('restaurant-views/details', {restaurant: newRestaurant});
        }).catch (err => {
            next(err);
        })
    })
    // Update 

    router.post('/update/:restaurantId', (req, res, next) => {
        console.log({ restaurantUpdateBody: req.body});
        

        Restaurant.findbyIdAndUpdate(req.params.restaurantId, req.body, { new: true })
            .then((updatedRestaurant) => {
                console.log({updatedRestaurant});

                res.redirect(`/restaurant/details/${updatedRestaurant._id}`)
            })
            .catch((err) => next(err));
    })

    // Delete 

    router.post('/delete/:restaurantID/', (req, res, next) => {
        restaurant.findbyIdAndRemove(req.params.restaurantId)
        .then(() => {
            console.log(
                `Restaurant ID ${req.params.restaurantId} has been successfully removed from the DB.`
            );
            res.redirect("/restaurant-views/restaurants");
            })
            .catch((err) => next(err));
    })

    module.exports = router;