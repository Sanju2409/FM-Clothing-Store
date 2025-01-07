require("dotenv").config();
const {MongoClient}=require("mongodb");
const client=new MongoClient("mongodb://localhost:27017");

async function connectToDatabase() {
    try{
        await client.connect();
        console.log("Connection to mongodb databse successfull");
        return client.db("FMClothingStore");
    }
    catch(e){
        console.error("Error connecting to Mongodb:",e);
        throw e;
    }
}
module.exports={connectToDatabase,client};