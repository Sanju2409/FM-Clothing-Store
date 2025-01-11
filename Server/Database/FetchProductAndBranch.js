const { connectToDatabase } = require("./connection")
async function FetchProductBranch() {
    const db=await connectToDatabase();
    const productbranch=await db.collection("products").aggregate([
    {
        $project:{
            productId:1,
            branch:1,
            _id:0
        }
    }
]).toArray();
console.log(productbranch);
}

FetchProductBranch(); 