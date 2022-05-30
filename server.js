const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { port, dbUser, dbPassword } = require("./config");
const { json } = require("express/lib/response");

const app = express();

// midleware
app.use(cors());
app.use(express.json());

// user : dbMukles
//pass: Mukles123456

const uri =
`mongodb+srv://${dbUser}:${dbPassword}@cluster0.exgqs.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productDb = client.db("Product").collection("ProductCollection");

    //get all product
    app.get('/', async (req, res) =>{
      const query = {};
      const cursor = productDb.find(query);
      const products = await cursor.toArray();
      res.send(products)
    });

    //get certain prodcut by id
    app.get('/product/:id', async(req, res) =>{
      const query = { _id: ObjectId(req.params.id)};
      const product = await productDb.findOne(query);
      res.send(product);
    });

    //get product by email
    app.get('/myProduct/:email', async(req, res) =>{
      const query = { "supplirName":req.params.email};
      const cursor = productDb.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    //post: add a new Product

    app.post('/prouduct/add', (req, res) =>{
      const doc = {
        title: "Record of a Shriveled Datum",
        content: "No bytes, no problem. Just insert a document, in MongoDB",
      }
      const result = await haiku.insertOne(doc);
    })

    //put: deliverd Product;
    app.put('/proudct/deliver/:id', async (req, res) =>{
      const filter = { _id: ObjectId(req.params.id)};
      const product = await productDb.findOne(filter);
      const updateDoc = {
        $set: {
          stock: product.stock - 1
        }
      };
      const result = await productDb.updateOne(filter, updateDoc);

      res.send({...product, stock: product.stock - 1}); 
    })


  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => console.log(`Your application is run on ${port}`));
