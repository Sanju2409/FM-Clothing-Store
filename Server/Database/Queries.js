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

    //Query 1-List of the products that are available under kids category and are located in Waterlooville
    const q4=await db.collection("products").find({
        availabilty:true,
        category:"Kids",
        branch:"Waterlooville"
    },{
        projection:{name:1,description:1,price:1,size:1,_id:0}
    }).toArray();
    // console.log("Available products under Kids Category and are located in Waterlooville:",q4);

    //Query2-History of delivery of orders
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

    // Query3-Product purchasing record based on location
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


    //Query4-Details of the customer who purchased the most
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
      
      //Query5-Month wise order count
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

   //Query6-List of cancelled order by customers
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
  
 // console.log("Cancelled Orders by Customer:", JSON.stringify(cancelledOrdersByCustomer,null,2));
  
 
     // Query7-Retrieve products with stock below the specified threshold
     const lowStockProducts = await db.collection("inventory").aggregate([
       {
         // Filter for products with stock less than the threshold
         $match: { stock: { $lt: 20 } }
       },
       {
         // Join with the products collection to fetch detailed product information
         $lookup: {
           from: "products",               // The collection to join with (products)
           localField: "productId",        // Field in inventory to match
           foreignField: "productId",      // Field in products to match
           as: "productDetails"            // Store the joined data in productDetails
         }
       },
       {
         // Flatten the productDetails array, as it will contain only one entry per product
         $unwind: "$productDetails"
       },
       {
         // Format the output, including product name, stock, branch, and product ID
         $project: {
           productId: 1,                  // Include the productId from inventory
           productName: "$productDetails.name",  // Get product name from the joined data
           stock: 1,                       // Show the stock count
           branch: 1,                      // Show the branch where the product is available
           _id: 0                          // Exclude the MongoDB _id field from the result
         }
       },
       
     ]).toArray();
 
     // Log the fetched low stock products
   //  console.log("Low Stock Products:", lowStockProducts);


  //Query8-Product availability and stock count for branch Fareham
   const branchStockData = await db.collection("inventory").aggregate([
    {
      // Filter the records to include only those that belong to the specified branch
      $match: { branch: "Fareham" }
    },
    {
      // Join the inventory data with the product details from the "products" collection
      $lookup: {
        from: "products",               // Collection to join with ("products")
        localField: "productId",        // Field in "inventory" collection to match
        foreignField: "productId",      // Field in "products" collection to match
        as: "productDetails"            // The result of the join will be stored in "productDetails"
      }
    },
    {
      // Flatten the "productDetails" array to access product info easily
      $unwind: "$productDetails"         
    },
    {
      // Project the fields we need: product ID, product name, and stock
      $project: {
        productId: 1,                  // Include product ID from the inventory collection
        productName: "$productDetails.name",  // Fetch product name from the joined productDetails array
        stock: 1,                        // Include stock quantity from the inventory collection
        _id: 0                           // Exclude MongoDB's default _id field from the result
      }
    }
  ]).toArray();

  // Log the result for the user
  // console.log(`Here is the product availability in the Fareham branch:`);
  // console.log(branchStockData);



   //Query 9-Top 5 high rated products based on customer review 
  
      // Aggregate the reviews collection to calculate average ratings and review count
      const topRatedProducts = await db.collection("reviews").aggregate([
        {
          // Group reviews by productId and calculate the average rating and review count
          $group: {
            _id: "$productId",  // Group by productId
            avgRating: { $avg: { $toDouble: "$rating" } },  // Calculate average rating
            reviewCount: { $sum: 1 }  // Count how many reviews the product has
          }
        },
        {
          // Sort the products by highest average rating
          $sort: { avgRating: -1 }
        },
        {
          // Limit the results to the top 'n' products based on average rating
          $limit: 5
        },
        {
          // Lookup product details (name) from the "products" collection
          $lookup: {
            from: "products",
            localField: "_id",  // The productId in reviews
            foreignField: "productId",  // The productId in products
            as: "productDetails"  // Store the matched product details in a new field
          }
        },
        { 
          // Unwind the productDetails array to make it easier to project data
          $unwind: "$productDetails"
        },
        {
          // Project only the relevant fields to return: productId, product name, average rating, and review count
          $project: {
            productId: 1,  // Return productId from the reviews
            productName: "$productDetails.name",  // Get product name from productDetails
            avgRating: 1,  // Include the calculated average rating
            reviewCount: 1,  // Include the total number of reviews
            _id: 0  // Exclude the _id field from the result
          }
        }
      ]).toArray();
  
      // Log the top-rated products for debugging purposes
      //console.log("Top Rated Products:", topRatedProducts);


      //Query10- To identify the top customers who have purchased products with the highest ratings and review scores

  
          // Step 1: Get the top-rated products based on the average customer ratings
          const topRatedProduct = await db.collection("reviews").aggregate([
            {
              $group: {
                _id: "$productId", // Group by productId to calculate ratings per product
                avgRating: { $avg: { $toDouble: "$rating" } },  // Calculate average rating for each product
                reviewCount: { $sum: 1 }  // Count how many reviews each product has received
              }
            },
            {
              $sort: { avgRating: -1 }  // Sort by the highest average rating (descending order)
            },
            {
              $limit: 5  // Limit to the top 'n' highest-rated products
            }
          ]).toArray();  // Fetch the result as an array
      
          // Step 2: Collect the productIds of the top-rated products
          const topRatedProductIds = topRatedProduct.map(product => product._id);
      
          // Step 3: Find customers who have purchased top-rated products
          const topCustomers = await db.collection("orders").aggregate([
            {
              $unwind: "$products"  // Flatten the products array to analyze each product in the order
            },
            {
              $match: {
                "products.productId": { $in: topRatedProductIds }  // Only consider orders with top-rated products
              }
            },
            {
              $group: {
                _id: "$customerId",  // Group by customerId
                purchasedProductCount: { $sum: 1 },  // Count how many top-rated products the customer bought
                totalSpent: { 
                  $sum: { 
                    $multiply: ["$products.quantity", "$products.price"] 
                  } 
                }  // Calculate the total amount spent by the customer on these products
              }
            },
            {
              $lookup: {
                from: "customer",  // Join with the "customers" collection to get customer details
                localField: "_id",  // Match by customerId
                foreignField: "customerId",
                as: "customerDetails"
              }
            },
            {
              $unwind: "$customerDetails"  // Unwind to get individual customer details
            },
            {
              $project: {
                customerId: "$_id",  // Include customerId in the result
                customerName: "$customerDetails.name",  // Include customer name
                purchasedProductCount: 1,  // Include count of top-rated products purchased
                totalSpent: 1,  // Include the total amount spent
                _id: 0  // Exclude the MongoDB _id field from the result
              }
            },
            {
              $sort: { totalSpent: -1 }  // Sort by total spent in descending order to get high-spending customers first
            },
            {
              $limit: 5  // Limit to the top 'n' customers who spent the most
            }
          ]).toArray();  // Fetch the result as an array
      
          // Step 4: Output the list of top customers
          console.log("Top Customers Based on Top-Rated Products:", topCustomers);
        
      
 
      
  

}
FirstQuery();