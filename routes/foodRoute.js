const express = require('express');
const foodModel = require('../models/FoodModels');
const app = express();

app.get('/foods', async(req,res) =>{
    const foods = await foodModel.find({});

    try{
        res.send(foods);
    }catch (err){
        res.status(500).send(err);
    }
});

app.post('/food', async (req, res) => {
    const food = new foodModel(req.body);
  
    try {
      await food.save();
      res.send(food);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.get('/food/:id', async (req,res) => {
    try{
        const deleteFood = await foodModel.findByIdAndDelete(req.params.id);

        if(!deleteFood) res.status(404).send("no item found");
        res.status(500).send();
    }catch(err){
        res.status(500).send(err);
    }
});

app.get('/food/:id', async (req,res) =>{
    try{
        await foodModel.findByIdAndUpdate(req.params.id, req.body);
        await foodModel.save();
        res.send(food);
    }catch(err){
        res.status(500).send(err);
    }
});

module.exports = app;