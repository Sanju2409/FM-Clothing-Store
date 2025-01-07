async function defineCollectionProduct(db){
    try{
        const collection=await db.listCollections({name:"products"}).toArray();
        if(collection.length===0){
            console.log("Creating collection products");
            await db.createCollection("products");
        }
        else{
            console.log("Products Collection already has data");
        }
    }catch(error){
        console.log("Error defining collection products:",error);
    }
}

async function defineCollectionBranch(db){
    try{
        const collection=await db.listCollections({name:"branches"}).toArray();
        if(collection.length===0){
            console.log("Creating collection branches");
            await db.createCollection("branches");
        }
        else{
            console.log("Collection already has data");
        }
    }catch(e){
        console.log("Error fetching branch data");
    }
}

async function defineCollectionCustomer(db){
    try{
        const collection=await db.listCollections({name:"customer"}).toArray();
        if(collection.length===0){
            console.log("Creating collection customer");
            await db.createCollection("customer");
        }
        else{
            console.log("Collection customer already has data");
        }
    }catch(e){
        console.log("Error creeating collection customer");
    }
}

async function defineCollectionOrders(db){
    try{
        const collection=await db.listCollections({name:"orders"}).toArray();
        if(collection.length===0){
            console.log("Creating collection orders");
            db.createCollection("orders");
        }
        else{
            console.log("Collection orders already has data");
        }
    }catch(e){
        console.log("Error creating collection orders");
    }
}
module.exports={defineCollectionProduct,defineCollectionBranch,defineCollectionCustomer,defineCollectionOrders};