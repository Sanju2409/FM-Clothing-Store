const { connectToDatabase } = require("./connection")

//
// const db=await connectToDatabase();
// const fq=db.products.findOne({size:"S"});
// console.log(fq);

async function FirstQuery(){
    const db=await connectToDatabase();
    // console.log(db);
    const collections = await db.listCollections().toArray();
    // console.log("Available collections:", collections);
    // const fq=await db.collection("products").find({size:"S"});
    // console.log(fq)
    
    //Products for summer season under all category
    const q1= await db.collection("products").find({
       $or:[
        {name:{$regex:"summer", $options:"i"}},
        {description:{$regex:"summer", $options:"i"}},
       ]
    }).toArray();
    // console.log("Products for summer season:",q1);


    //List of the products that are available
    const q2=await db.collection("products").find({availabilty:true}).toArray();
    // console.log("Available products are:",q2);

    //List of the products that are available under Men's category
    const q3=await db.collection("products").find({
        availabilty:true,
        category:"Men"
    }).toArray();
    // console.log("Available products under Men's Category:",q3);

    //List of the products that are available under kids category and are located in Waterlooville
    const q4=await db.collection("products").find({
        availabilty:true,
        category:"Kids",
        branch:"Waterlooville"
    },{
        projection:{name:1,description:1,price:1,size:1,_id:0}
    }).toArray();
    // console.log("Available products under Kids Category and are located in Waterlooville:",q4);

    //History of delivery of orders
    const q5=await db.collection("orders").find({
        status:"Delivered",
    },{
        projection:{
            status:0,_id:0
    }
    }).toArray();

    const expandProductsInOrderHistory=q5.map(order=>({
        ...order,
    }))
    // console.log("History of delivery of orders:",JSON.stringify(expandProductsInOrderHistory, null, 2));

    //Product purchasing records based on the location

    //For Waterlooville
    const q6=await db.collection("orders").find({
        branch:'Waterlooville'
    },{
        projection:{
            _id:0
        }
    }
    ).toArray();
    // const expandedPurchaseWaterlooville=q6.map(purchase=>({
    //     ...purchase,
    // }))
    // console.log("Product purchasing records based on the location for Waterlooville:",JSON.stringify(q6,null,2));

    //For Fareham
    const q7=await db.collection("orders").find({
        branch:'Fareham'
    }).toArray();
    // console.log("Product purchasing records based on the location for Fareham:",JSON.stringify(q7,null,2));

    // Product purchasing record based on location
    const productPurchasesByLocation = await db.collection("orders").aggregate([
        {
          $unwind: "$products" // Decompose the products array for individual processing
        },
        {
          $group: {
            _id: {
              branch: "$branch", // Group by branch (location)
              productId: "$products.productId" // Group by productId
            },
            totalQuantity: { $sum: "$products.quantity" }, // Sum up the quantity
            totalOrders: { $sum: 1 } // Count the number of orders for the product
          }
        },
        {
          $lookup: {
            from: "products", // Join with the products collection
            localField: "_id.productId",
            foreignField: "productId",
            as: "productDetails"
          }
        },
        {
          $unwind: "$productDetails" // Flatten the joined productDetails array
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            branch: "$_id.branch", // Include branch (location)
            productId: "$_id.productId", // Include productId
            productName: "$productDetails.name", // Include product name
            totalQuantity: 1, // Include totalQuantity
            totalOrders: 1 // Include totalOrders
          }
        },
        {
          $sort: { branch: 1, totalQuantity: -1 } // Sort by branch and totalQuantity descending
        }
      ]).toArray();
      
    //   console.log("Products purchasing record by location:", productPurchasesByLocation);


    //Details of the customer who purchased the most
    const topCustomer = await db.collection("orders").aggregate([
        {
          $unwind: "$products" // Decompose the products array for individual processing
        },
        {
          $group: {
            _id: "$customerId", // Group by customerId
            totalQuantity: { $sum: "$products.quantity" }, // Sum up the product quantities for each customer
            totalOrders: { $sum: 1 } // Count the total number of orders for each customer
          }
        },
        {
          $sort: { totalQuantity: -1 } // Sort customers by total quantity in descending order
        },
        {
          $limit: 1 // Get only the top customer
        },
        {
          $lookup: {
            from: "customer", // Join with the customer collection
            localField: "_id", // customerId in orders
            foreignField: "customerId", // customerId in customer collection
            as: "customerDetails"
          }
        },
        {
          $unwind: "$customerDetails" // Flatten the joined customerDetails array
        },
        {
          $project: {
            _id: 0, // Exclude the default _id field
            customerId: "$_id", // Include customerId
            customerName: "$customerDetails.name", // Include customer name
            email: "$customerDetails.email", // Include customer email
            totalQuantity: 1, // Include totalQuantity
            totalOrders: 1 // Include totalOrders
          }
        }
      ]).toArray();
      
    //   console.log("Top customer who purchased the most:", topCustomer);
      
      //Month wise order count

      const monthlyOrderCounts = await db.collection("orders").aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$orderDate" }, // Extract the year from the orderDate
              month: { $month: "$orderDate" } // Extract the month from the orderDate
            },
            orderCount: { $sum: 1 } // Count the number of orders
          }
        },
        {
          $sort: {
            "_id.year": 1, // Sort by year ascending
            "_id.month": 1 // Sort by month ascending
          }
        },
        {
          $project: {
            _id: 0,
            year: "$_id.year", // Include year
            month: "$_id.month", // Include month
            orderCount: 1 // Include the order count
          }
        }
      ]).toArray();
      
    //   console.log("Monthly Order Counts:", monthlyOrderCounts);

   //
   const cancelledOrdersByCustomer = await db.collection("orders").aggregate([
    { 
      $match: { 
        status: "Cancelled" // Only match orders with status "Cancelled"
      }
    },
    {
      $group: {
        _id: "$customerId", // Group by customerId
        cancelledOrders: { $sum: 1 }, // Count the number of cancelled orders
        branchesInvolved: { $addToSet: "$branch" }, // Get all branches involved in cancelled orders
        productsCancelled: { $push: "$products.productId" } // List all product IDs cancelled in the order
      }
    },
    { 
      $sort: { 
        cancelledOrders: -1 // Sort by the number of cancelled orders in descending order
      }
    }
  ]).toArray();
  
  console.log("Cancelled Orders by Customer:", JSON.stringify(cancelledOrdersByCustomer,null,2));
  

   
      
      

      
}
FirstQuery();