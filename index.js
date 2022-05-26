//import require packages
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

//Express App and Port Ready for use
const app = express();
const port = process.env.PORT || 5000;

//Middle ware
app.use(cors());
//for post response getting
app.use(express.json());

//DATABASE CONNECTION URL SETUP = uri change user, pass env,
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.44qqp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

//ASYNC FUNCTION FOR DATABASE CRUD Operation
async function run() {
   // DATABASE CONNECTED
   await client.connect();
   //    console.log('database connected');

   //!DATABASE TABLE CREATING : (PRODUCTS,ORDERS,USERS,)
   const productsCollection = client.db(process.env.DB_NAME).collection('products');
   const ordersCollection = client.db(process.env.DB_NAME).collection('orders');
   const usersCollection = client.db(process.env.DB_NAME).collection('users');
   const reviewsCollection = client.db(process.env.DB_NAME).collection('reviews');


   

   //link : http://localhost:5000/products
   //!GET REQUEST DONE
   app.get('/products', async (req, res) => {
      const query = req.query;
      const result = await productsCollection.find(query).toArray();
      res.send(result);
   });

   //link : http://localhost:5000/products
   //!POST REQUEST CODE
   app.post('/products', async (req, res) => {
      //DATA collecting form input form
      const productData = req.body;
      const result = await productsCollection.insertOne(productData);
      res.send({ result: 'success' });
   });

   //link : http://localhost:5000/delete-products/628e58dd68ef2b08e512a82d
   //!DELETE DATA FROM DATABASE
   app.delete('/delete-products/:id', async (req, res) => {
      const id = { _id: ObjectId(req.params.id) };

      const result = await productsCollection.deleteOne(id);

      //response e object pabo {acknowlege:true,deletedCount:1};
      res.send(result);
   });

   //new data add korle seta new add hoi ager gulo thake, put method id na milse se baniye dei and and new create kre, pathch thakle update krbe noy na,
   //link : http://localhost:5000/update-products/628e58dd68ef2b08e512a82d
   //!UPDATE DATABASE DATA
   app.put('/update-products/:id', async (req, res) => {
      const filter = { _id: ObjectId(req.params.id) };
      const newProduct = req.body;

      /* const newProduct = {
         product_img: 'd2fdf',
         product_name: 'adnan khafdnadf  khan',
         product_price: 23430,
      }; */

      const options = {
         upsert: true,
      };
      const updateDoc = {
         $set: {
            ...newProduct,
         },
      };
      const result = await productsCollection.updateOne(filter, updateDoc, options);

      res.send(result);
   });

   //response result
   /*  {
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        } */

   //!Orders collection api

   /* const orderFields = {
        'user_name':'Arfan Khan',
        'user_email':'',
        'product_id':'',
        'product_name':'',
        'product_per_price':'23432',
        'totalPrice':'33423',
    } */

   //!GET REQUEST DONE
   app.get('/orders', async (req, res) => {
      const query = req.query;
      const result = await ordersCollection.find(query).toArray();
      res.send(result);
   });

   //link : http://localhost:5000/products
   //!POST REQUEST CODE
   app.post('/orders', async (req, res) => {
      //DATA collecting form input form
      const orderData = req.body;
      const result = await ordersCollection.insertOne(orderData);
      res.send({ result: 'success' });
   });

   //link : http://localhost:5000/delete-products/628e58dd68ef2b08e512a82d
   //!DELETE DATA FROM DATABASE
   app.delete('/delete-order/:product_id', async (req, res) => {
      const id = { product_id:req.params.product_id };

      const result = await ordersCollection.deleteOne(id);

      //response e object pabo {acknowlege:true,deletedCount:1};
      res.send(result);
   });

   //new data add korle seta new add hoi ager gulo thake, put method id na milse se baniye dei and and new create kre, pathch thakle update krbe noy na,
   //link : http://localhost:5000/update-products/628e58dd68ef2b08e512a82d
   //!UPDATE DATABASE DATA
   app.put('/update-order/:id', async (req, res) => {
      const filter = { _id: ObjectId(req.params.id) };
      const newOrder = req.body;

      const options = {
         upsert: true,
      };
      const updateDoc = {
         $set: {
            ...newOrder,
         },
      };
      const result = await ordersCollection.updateOne(filter, updateDoc, options);

      res.send(result);
   });

   //!ReviewCollection api

   /* const reviewFields = {
        'user_name':'Arfan Khan',
        'user_email':'',
        'product_id':'',
        'product_name':'',
        'product_per_price':'23432',
        'totalPrice':'33423',
    } */

   //!GET REQUEST DONE
   app.get('/reviews', async (req, res) => {
      const query = req.query;
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
   });

   //link : http://localhost:5000/products
   //!POST REQUEST CODE
   app.post('/reviews', async (req, res) => {
      //DATA collecting form input form
      const reviewData = req.body;
      const result = await reviewsCollection.insertOne(reviewData);
      res.send({ result: 'success' });
   });

   //link : http://localhost:5000/delete-products/628e58dd68ef2b08e512a82d
   //!DELETE DATA FROM DATABASE
   app.delete('/delete-reviews/:id', async (req, res) => {
      const id = { _id: ObjectId(req.params.id) };

      const result = await reviewsCollection.deleteOne(id);

      //response e object pabo {acknowlege:true,deletedCount:1};
      res.send(result);
   });

   //new data add korle seta new add hoi ager gulo thake, put method id na milse se baniye dei and and new create kre, pathch thakle update krbe noy na,
   //link : http://localhost:5000/update-products/628e58dd68ef2b08e512a82d
   //!UPDATE DATABASE DATA
   app.put('/update-reviews/:id', async (req, res) => {
      const filter = { _id: ObjectId(req.params.id) };
      const newReview = req.body;

      const options = {
         upsert: true,
      };
      const updateDoc = {
         $set: {
            ...newReview,
         },
      };
      const result = await reviewsCollection.updateOne(filter, updateDoc, options);

      res.send(result);
   });

   //!usersCollection api

   /* const reviewFields = {
        'user_name':'Arfan Khan',
        'user_email':'',
        'product_id':'',
        'product_name':'',
        'product_per_price':'23432',
        'totalPrice':'33423',
    } */

   //!GET REQUEST DONE
   app.get('/users', async (req, res) => {
      const query = req.query;
      const result = await usersCollection.find(query).toArray();
      res.send(result);
   });

   //link : http://localhost:5000/delete-products/628e58dd68ef2b08e512a82d
   //!DELETE DATA FROM DATABASE
   app.delete('/delete-users/:email', async (req, res) => {
      const email = { user_email:req.params.email };
      console.log(email);

      const result = await usersCollection.deleteOne(email);
      res.send({result:'deleted'});
   });

   //new data add korle seta new add hoi ager gulo thake, put method id na milse se baniye dei and and new create kre, pathch thakle update krbe noy na,
   //link : http://localhost:5000/update-products/628e58dd68ef2b08e512a82d
   //!UPDATE DATABASE DATA
   app.put('/update-users/:id', async (req, res) => {
      const filter = { _id: ObjectId(req.params.id) };
      const newData = req.body;

      const options = {
         upsert: false,
      };
      const updateDoc = {
         $set: {
            ...newData,
         },
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);

      res.send(result);
   });




}
run().catch(console.dir);

//Test Api
app.get('/', (req, res) => {
   res.send('server running = electro.pro api');
});

app.listen(port, () => {
   console.log('server running on 5000 page');
});
