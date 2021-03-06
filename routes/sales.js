const express = require("express");
const route = express.Router();

const firebase = require('firebase/app')
require("firebase/database")


//Your FireBase Configurations here.
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}

firebase.initializeApp(firebaseConfig)
const database = firebase.database()

route.get("/", (req, res) => {
  database.ref('/sales').once('value').then(data =>{
    const list = data.val()
    res.send(list)
})
});

route.post("/", (req, res) => {
  database.ref('/sales').once('value').then(data =>{
  const list = data.val()

  const salesRef = database.ref('sales/')

  const sale = salesRef.push()
  sale.set({
    name: req.body.name,
    date: req.body.date,
    amount: req.body.amount,
    id: Object.keys(list).length,
  })
  res.send('Sales Added')
})
})

module.exports = route;