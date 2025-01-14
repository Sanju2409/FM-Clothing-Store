const {connectToDatabase,client}=require("./connection");
const {defineCollectionProduct,defineCollectionBranch,defineCollectionCustomer,defineCollectionOrders}=require("./schema");

async function createProducts(){
    const db=await connectToDatabase();
    await defineCollectionProduct(db);
    
    const productTemplates=[
        {
            name: "Soft Knit Jumper",
            description: "A soft, fine knit with a rib-knit collar and V-neck opening at the top. Dropped shoulders, long sleeves, and ribbing around the cuffs and hem.",
            composition: "Acrylic 50%, Polyester 38%, Wool 12%",
            category: "Women",
            sizes: ["S", "M", "L", "XL"]
          },
          {
            name: "Classic Polo Shirt",
            description: "A timeless classic, this polo shirt is crafted from premium cotton for all-day comfort. Features a buttoned collar and a tailored fit.",
            composition: "Cotton 100%",
            category: "Men",
            sizes: ["S", "M", "L", "XL"]
          },
          {
            name: "Kids' Denim Jacket",
            description: "A trendy denim jacket for kids, featuring a classic collar, button front, and two chest pockets. Perfect for casual outings.",
            composition: "Denim 80%, Polyester 20%",
            category: "Kids",
            sizes: ["S", "M", "L"]
          },
          {
            name: "Lightweight Running Shoes",
            description: "Lightweight and breathable running shoes with cushioned soles for maximum comfort and performance.",
            composition: "Synthetic 70%, Rubber 30%",
            category: "Sport",
            sizes: ["6", "7", "8", "9", "10"]
          },
          {
            name: "Anti-Aging Face Cream",
            description: "Advanced anti-aging face cream enriched with vitamins to reduce wrinkles and fine lines.",
            composition: "Organic Ingredients",
            category: "Beauty",
            sizes: ["200ml"]
          },
          {
            name: "Ceramic Coffee Mug",
            description: "Premium ceramic coffee mug with a heat-resistant handle.",
            composition: "Ceramic",
            category: "Home",
            sizes: ["300ml"]
          },
          {
            name: "Winter Wool Coat",
            description: "Elegant winter coat with a warm wool blend and a tailored fit.",
            composition: "Wool 70%, Polyester 30%",
            category: "Women",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            name: "Casual Jeans",
            description: "Relaxed-fit jeans made from premium denim for daily wear.",
            composition: "Denim 100%",
            category: "Men",
            sizes: ["30", "32", "34", "36", "38"]
        },
        {
            name: "Floral Summer Dress",
            description: "Light and breezy summer dress with a floral print and adjustable straps.",
            composition: "Cotton 100%",
            category: "Women",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            name: "Graphic T-Shirt",
            description: "Comfortable cotton t-shirt featuring vibrant graphic prints.",
            composition: "Cotton 100%",
            category: "Kids",
            sizes: ["XS", "S", "M", "L"]
        },
        {
            name: "Hooded Sweatshirt",
            description: "Classic pullover hoodie with a kangaroo pocket and ribbed cuffs.",
            composition: "Polyester 50%, Cotton 50%",
            category: "Men",
            sizes: ["S", "M", "L", "XL"]
        },
        {
            name: "Leather Boots",
            description: "Durable leather boots with a sturdy sole, ideal for outdoor adventures.",
            composition: "Leather 100%",
            category: "Sport",
            sizes: ["7", "8", "9", "10", "11"]
        },
        {
            name: "Slip-On Sneakers",
            description: "Stylish slip-on sneakers with breathable mesh for everyday use.",
            composition: "Synthetic 70%, Rubber 30%",
            category: "Sport",
            sizes: ["6", "7", "8", "9", "10"]
        },
        {
            name: "Knitted Scarf",
            description: "Soft and cozy scarf with intricate knitting patterns.",
            composition: "Wool 80%, Acrylic 20%",
            category: "Accessories",
            sizes: ["One Size"]
        },
        {
            name: "Leather Belt",
            description: "Premium leather belt with an adjustable buckle for a perfect fit.",
            composition: "Leather 100%",
            category: "Accessories",
            sizes: ["M", "L", "XL"]
        },
        {
            name: "Hydrating Body Lotion",
            description: "Lightweight body lotion enriched with aloe vera and vitamin E.",
            composition: "Organic Ingredients",
            category: "Beauty",
            sizes: ["200ml", "500ml"]
        },
        {
            name: "Matte Lipstick",
            description: "Long-lasting matte lipstick available in a range of vibrant shades.",
            composition: "Natural Ingredients",
            category: "Beauty",
            sizes: ["One Size"]
        },
        {
            name: "Decorative Vase",
            description: "Ceramic vase with a hand-painted design, perfect for home decor.",
            composition: "Ceramic",
            category: "Home",
            sizes: ["Small", "Medium", "Large"]
        },
        {
            name: "Soft Bath Towels",
            description: "Highly absorbent bath towels made from 100% premium cotton.",
            composition: "Cotton 100%",
            category: "Home",
            sizes: ["One Size"]
        }
        ,{ name: "Boho Maxi Dress", description: "Flowy and colorful dress perfect for summer outings.", composition: "Rayon 100%", category: "Women", sizes: ["S", "M", "L", "XL"] },
        { name: "Vintage Leather Jacket", description: "Classic leather jacket with a vintage finish.", composition: "Leather 100%", category: "Women", sizes: ["S", "M", "L"] },
        { name: "Formal Suit", description: "Two-piece suit tailored for professional and formal events.", composition: "Polyester 65%, Cotton 35%", category: "Men", sizes: ["M", "L", "XL", "XXL"] },
        { name: "Athletic Joggers", description: "Comfortable joggers for sports and casual wear.", composition: "Polyester 80%, Spandex 20%", category: "Men", sizes: ["S", "M", "L", "XL"] },
        { name: "Rainbow Tutu Skirt", description: "Fun and vibrant tutu skirt for kids.", composition: "Tulle 100%", category: "Kids", sizes: ["XS", "S", "M", "L"] },
        { name: "Cartoon Pajamas", description: "Soft and cozy pajamas with cute cartoon prints.", composition: "Cotton 100%", category: "Kids", sizes: ["S", "M", "L", "XL"] },
        { name: "Hiking Boots", description: "Rugged and durable boots for outdoor adventures.", composition: "Leather 70%, Rubber 30%", category: "Sport", sizes: ["6", "7", "8", "9", "10", "11"] },
        { name: "Flip-Flops", description: "Lightweight flip-flops for beach and casual wear.", composition: "Rubber 100%", category: "Sport", sizes: ["6", "7", "8", "9", "10"] },
        { name: "Luxury Watch", description: "Elegant wristwatch with a stainless steel strap.", composition: "Metal", category: "Accessories", sizes: ["One Size"] },
        { name: "Leather Wallet", description: "Compact wallet with multiple compartments.", composition: "Leather 100%", category: "Accessories", sizes: ["One Size"] },
        { name: "Herbal Shampoo", description: "Shampoo enriched with natural herbs for healthy hair.", composition: "Organic Ingredients", category: "Beauty", sizes: ["250ml", "500ml"] },
        { name: "Perfume Set", description: "Set of three luxury perfumes with unique fragrances.", composition: "Alcohol-based", category: "Beauty", sizes: ["One Size"] },
        { name: "Memory Foam Pillow", description: "Ergonomic pillow for a restful sleep.", composition: "Memory Foam", category: "Home", sizes: ["Standard", "Queen", "King"] },
        { name: "Non-Stick Frying Pan", description: "Durable frying pan with a non-stick coating.", composition: "Aluminum", category: "Home", sizes: ["8-inch", "10-inch", "12-inch"] }
    ];
    const branches=["Waterlooville", "Fareham", "Gosport", "Havant", "Chichester", "Portsmouth"];
    const products=[];
    productTemplates.forEach((template,templateIndex)=>{
        template.sizes.forEach((size,sizeIndex)=>{
            products.push({
                productId:`P${1000+10*templateIndex+sizeIndex}`,
                name:template.name,
                description:template.description,
                composition:template.composition,
                category:template.category,
                size,
                price:(Math.random()*100+100).toFixed(2),
                availabilty:Math.random()>0.3,
                branch:branches.filter(
                    ()=>
                        Math.random()>0.5
                    
                )
            });
        });
    });

    try{
        const collectionProduct=db.collection("products");
        if((await collectionProduct.countDocuments())===0){
            const result= await collectionProduct.insertMany(products);
            console.log(`${result.insertedCount} products inserted sucessfully!`);
        }
        else{
            console.log("Production collection already contains data");
        }
    }catch(error){
        console.log("Error inserting records to prodcut collection",error);
    }
}

async function createBranch() {
    const db=await connectToDatabase();
    await defineCollectionBranch(db);

    const branches=[{
        branchId:"B1",
        name:"Waterlooville",
        location:"Waterlooville, UK",
        manager:"Alice Johnson",
        staffCount:20},
    { branchId: "B2", name: "Fareham", location: "Fareham, UK", manager: "Bob Smith", staffCount: 20 },
    { branchId: "B3", name: "Gosport", location: "Gosport, UK", manager: "Catherine Brown", staffCount: 12 },
    { branchId: "B4", name: "Havant", location: "Havant, UK", manager: "David Green", staffCount: 10 },
    { branchId: "B5", name: "Chichester", location: "Chichester, UK", manager: "Evelyn White", staffCount: 18 },
    { branchId: "B6", name: "Portsmouth", location: "Portsmouth, UK", manager: "Frank Thomas", staffCount: 25 },];

    try{
        const collectionBranch=db.collection("branches");
        if((await collectionBranch.countDocuments())===0){
            const result=await collectionBranch.insertMany(branches);
            console.log(`${result.insertedCount} branches are inserted succesfully`)
        }else{
            console.log("Branch collection already contains data");
        }
    }catch(e){
        console.log("Error inserting records to branch collection",e);
    }
}

async function createCustomer() {
    const db=await connectToDatabase();
    await defineCollectionCustomer(db);

    
        const customers=[
            {
                customerId: "C1",
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "123-456-7890",
                address: "123 Elm Street, Portsmouth, UK",               
            },
            {
                customerId: "C2",
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "234-567-8901",
                address: "456 Oak Avenue, Havant, UK",     
            },
            {
                customerId: "C3",
                name: "Michael Brown",
                email: "michael.brown@example.com",
                phone: "345-678-9012",
                address: "789 Pine Road, Fareham, UK",              
            },
            {
                customerId: "C4",
                name: "Robert Brown",
                email: "robert.brown@example.com",
                phone: "111-222-3333",
                address: "321 Birch Road, Havant, UK",
            },
            {
                customerId: "C5",
                name: "Emily Davis",
                email: "emily.davis@example.com",
                phone: "444-555-6666",
                address: "654 Maple Street, Chichester, UK",
            },
            {
                customerId: "C6",
                name: "Michael Wilson",
                email: "michael.wilson@example.com",
                phone: "777-888-9999",
                address: "987 Willow Drive, Gosport, UK",
            },
            {
                customerId: "C7",
                name: "Sophia Martinez",
                email: "sophia.martinez@example.com",
                phone: "222-333-4444",
                address: "135 Aspen Way, Portsmouth, UK",
            },
            {
                customerId: "C8",
                name: "James Anderson",
                email: "james.anderson@example.com",
                phone: "666-777-8888",
                address: "246 Cedar Boulevard, Fareham, UK",
            },
            {
                customerId: "C9",
                name: "Alice Johnson",
                email: "alice.johnson@example.com",
                phone: "555-234-5678",
                address: "789 Pine Lane, Waterlooville, UK",
            },
            {
                customerId: "C10",
                name: "Olivia Harris",
                email: "olivia.harris@example.com",
                phone: "999-111-2222",
                address: "369 Elmwood Court, Waterlooville, UK",
            }
        
        ];
        try{
            const collection=db.collection("customer");
            if((await collection.countDocuments())===0){
                const result=await collection.insertMany(customers);
                console.log(`${result.insertedCount} customers are added to database`);
            }
            else{
                console.log("Customer collection already has data");
            }
        }catch(e){
            console.log("Error inserting data into customer collection",e.message);
        }
    
}



async function createOrders() {
    const db=await connectToDatabase();
    await defineCollectionOrders(db);

    
    const orders = [
        {
          orderId: "O1",
          customerId: "C5",
          orderDate: new Date("2024-11-29T13:05:42.992Z"),
          deliveryDate: new Date("2024-11-30T19:03:04.285Z"),
          products: [
            { productId: "P1111", quantity: 5 },
            { productId: "P1113", quantity: 4 }
          ],
          branch: "Gosport",
          status: "Delivered",
        },
        {
          orderId: "O2",
          customerId: "C4",
          orderDate: new Date("2024-12-11T01:06:38.575Z"),
          deliveryDate: new Date("2024-12-13T08:51:20.885Z"),
          products: [
            { productId: "P1021", quantity: 2 },
            { productId: "P1000", quantity: 1 }
          ],
          branch: "Havant",
          status: "Pending",
        },
        {
          orderId: "O3",
          customerId: "C5",
          orderDate: new Date("2024-12-14T02:47:52.543Z"),
          deliveryDate: new Date("2024-12-15T12:57:53.894Z"),
          products: [
            { productId: "P1073", quantity: 3 }
          ],
          branch: "Gosport",
          status: "Cancelled",
        },
        {
          orderId: "O4",
          customerId: "C3",
          orderDate: new Date("2024-12-04T17:26:57.226Z"),
          deliveryDate: new Date("2024-12-08T07:25:16.254Z"),
          products: [
            { productId: "P1060", quantity: 1 },
            { productId: "P1063", quantity: 2 }
          ],
          branch: "Portsmouth",
          status: "Cancelled",
        },
        {
          orderId: "O5",
          customerId: "C3",
          orderDate: new Date("2024-12-25T19:06:52.673Z"),
          deliveryDate: new Date("2024-12-31T06:58:35.773Z"),
          products: [
            { productId: "P1034", quantity: 2 }
          ],
          branch: "Gosport",
          status: "Cancelled",
        },
        {
          orderId: "O6",
          customerId: "C6",
          orderDate: new Date("2024-11-30T00:11:27.246Z"),
          deliveryDate: new Date("2024-12-01T00:43:21.791Z"),
          products: [
            { productId: "P1032", quantity: 3 },
            { productId: "P1020", quantity: 2 }
          ],
          branch: "Chichester",
          status: "Pending",
        },
        {
          orderId: "O7",
          customerId: "C7",
          orderDate: new Date("2024-12-13T21:27:34.902Z"),
          deliveryDate: new Date("2024-12-15T04:22:49.998Z"),
          products: [
            { productId: "P1190", quantity: 2 },
            { productId: "P1191", quantity: 1 }
          ],
          branch: "Portsmouth",
          status: "Delivered",
        },
        {
          orderId: "O8",
          customerId: "C4",
          orderDate: new Date("2024-12-26T16:27:16.595Z"),
          deliveryDate: new Date("2024-12-28T10:49:17.874Z"),
          products: [
            { productId: "P1082", quantity: 3 },
            { productId: "P1080", quantity: 3 }
          ],
          branch: "Gosport",
          status: "Pending",
        },
        {
          orderId: "O9",
          customerId: "C9",
          orderDate: new Date("2024-12-13T17:02:16.349Z"),
          deliveryDate: new Date("2024-12-14T23:03:40.102Z"),
          products: [
            { productId: "P1093", quantity: 3 },
            { productId: "P1061", quantity: 2 }
          ],
          branch: "Fareham",
          status: "Delivered",
        },
        {
          orderId: "O10",
          customerId: "C9",
          orderDate: new Date("2024-12-09T04:52:42.574Z"),
          deliveryDate: new Date("2024-12-12T20:48:48.813Z"),
          products: [
            { productId: "P1241", quantity: 5 }
          ],
          branch: "Waterlooville",
          status: "Delivered",
        },
        {
          orderId: "O11",
          customerId: "C2",
          orderDate: new Date("2024-12-10T13:04:16.798Z"),
          deliveryDate: new Date("2024-12-16T14:49:04.043Z"),
          products: [
            { productId: "P1039", quantity: 1 },
            { productId: "P1102", quantity: 5 }
          ],
          branch: "Fareham",
          status: "Cancelled",
        },
        {
          orderId: "O12",
          customerId: "C2",
          orderDate: new Date("2024-12-02T11:58:33.566Z"),
          deliveryDate: new Date("2024-12-03T02:14:29.851Z"),
          products: [
            { productId: "P1311", quantity: 3 },
            { productId: "P1312", quantity: 5 }
          ],
          branch: "Portsmouth",
          status: "Cancelled",
        },
        {
          orderId: "O13",
          customerId: "C1",
          orderDate: new Date("2024-12-08T23:01:09.475Z"),
          deliveryDate: new Date("2024-12-09T03:54:40.684Z"),
          products: [
            { productId: "P1049", quantity: 3 },
            { productId: "P1071", quantity: 1 }
          ],
          branch: "Fareham",
          status: "Cancelled",
        },
        {
          orderId: "O14",
          customerId: "C2",
          orderDate: new Date("2024-12-12T09:25:59.496Z"),
          deliveryDate: new Date("2024-12-18T05:27:17.365Z"),
          products: [
            { productId: "P1060", quantity: 1 },
            { productId: "P1073", quantity: 2 },
            { productId: "P1080", quantity: 2 }
          ],
          branch: "Gosport",
          status: "Pending",
        },
        {
          orderId: "O15",
          customerId: "C4",
          orderDate: new Date("2024-12-23T06:44:19.180Z"),
          deliveryDate: new Date("2024-12-25T16:38:10.569Z"),
          products: [
            { productId: "P1210", quantity: 2 },
            { productId: "P1202", quantity: 4 }
          ],
          branch: "Havant",
          status: "Delivered",
        },
        {
          orderId: "O16",
          customerId: "C3",
          orderDate: new Date("2024-12-13T21:23:17.556Z"),
          deliveryDate: new Date("2024-12-16T17:08:14.048Z"),
          products: [
            { productId: "P1010", quantity: 2 }
          ],
          branch: "Waterlooville",
          status: "Cancelled",
        },
        {
          orderId: "O17",
          customerId: "C1",
          orderDate: new Date("2024-12-07T10:12:14.735Z"),
          deliveryDate: new Date("2024-12-11T04:00:08.547Z"),
          products: [
            { productId: "P1012", quantity: 3 }
          ],
          branch: "Portsmouth",
          status: "Pending",
        },
        {
          orderId: "O18",
          customerId: "C10",
          orderDate: new Date("2024-12-10T02:00:52.531Z"),
          deliveryDate: new Date("2024-12-16T18:39:50.662Z"),
          products: [
            { productId: "P1103", quantity: 2 },
            { productId: "P1030", quantity: 1 }
          ],
          branch: "Havant",
          status: "Delivered",
        },
        {
          orderId: "O19",
          customerId: "C6",
          orderDate: new Date("2024-12-10T13:01:12.081Z"),
          deliveryDate: new Date("2024-12-11T20:55:49.925Z"),
          products: [
            { productId: "P1020", quantity: 5 }
          ],
          branch: "Fareham",
          status: "Delivered",
        },
        {
          orderId: "O20",
          customerId: "C8",
          orderDate: new Date("2024-12-20T22:53:34.429Z"),
          deliveryDate: new Date("2024-12-23T08:39:21.563Z"),
          products: [
            { productId: "P1201", quantity: 3 },
            { productId: "P1202", quantity: 1 }
          ],
          branch: "Chichester",
          status: "Pending",
        }
      ];
      
      
        try{
            const collection=db.collection("orders");
            if((await collection.countDocuments())===0){
                const result=await collection.insertMany(orders);
                console.log(`${result.insertedCount} orders are added to database`);
            }
            else{
                console.log("Order collection already has data");
            }
        }catch(e){
            console.log("Error inserting data into order collection",e.message);
        }
    
}

// async function createOrders() {
//     const db=await connectToDatabase();
//     await defineCollectionOrders(db);
//     const orders = [
//         {
//             orderId: "O1",
//             customerId: "C1",
//             orderDate: new Date("2023-12-01"),
//             deliveryDate: new Date("2023-12-05"),
//             products: [
//                 { productId: "P1000", quantity: 2 },
//                 { productId: "P1001", quantity: 1 },
//             ],
//             branch: "Portsmouth",
//             status: "Delivered",
//         },
//         {
//             orderId: "O2",
//             customerId: "C2",
//             orderDate: new Date("2023-12-15"),
//             deliveryDate: new Date("2023-12-20"),
//             products: [
//                 { productId: "P1002", quantity: 3 },
//                 { productId: "P1003", quantity: 1 },
//             ],
//             branch: "Havant",
//             status: "Pending",
//         },
//         {
//             orderId: "O3",
//             customerId: "C3",
//             orderDate: new Date("2023-12-10"),
//             deliveryDate: new Date("2023-12-12"),
//             products: [{ productId: "P1004", quantity: 1 }],
//             branch: "Fareham",
//             status: "Cancelled",
//         },
//     ];
//     try{
//         const collection=db.collection("orders");
//         if((await collection.countDocuments())===0){
//             const result= await collection.insertMany(orders);
//             console.log(`${result.insertedCount} orders have been inserted to the orders collection`);
//         }
//         else{
//             console.log("Orders collection already has data");
//         }
//     }catch(e){
//         console.log(`Error inserting orders:`,e);
//     }
// }

async function createOrders() {
    const db = await connectToDatabase();
    await defineCollectionOrders(db);

    const branches = ["Waterlooville", "Fareham", "Gosport", "Havant", "Chichester", "Portsmouth"];
    const statuses = ["Pending", "Delivered", "Cancelled"];
    const customers = [...Array(10).keys()].map(i => `C${i + 1}`); // Customer IDs (C1 to C10)
    const productIds = [...Array(105).keys()].map(i => `P${1000 + i}`); // Product IDs (P1000 to P1104)

    const orders = [...Array(27).keys()].map(i => {
        const orderDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date in last 30 days
        const deliveryDate = new Date(orderDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Delivery within 7 days
        const numberOfProducts = Math.floor(Math.random() * 5) + 1; // 1-5 products in each order
        const products = Array.from({ length: numberOfProducts }, () => ({
            productId: productIds[Math.floor(Math.random() * productIds.length)],
            quantity: Math.floor(Math.random() * 5) + 1, // Quantity: 1-5
        }));

        return {
            orderId: `O${i + 1}`,
            customerId: customers[Math.floor(Math.random() * customers.length)],
            orderDate,
            deliveryDate,
            products,
            branch: branches[Math.floor(Math.random() * branches.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
        };
    });
    try {
        const collectionOrders = db.collection("orders");
        if ((await collectionOrders.countDocuments()) === 0) {
            const result = await collectionOrders.insertMany(orders);
            console.log(`${result.insertedCount} orders inserted successfully!`);
        } else {
            console.log("Orders collection already contains data");
        }
    } catch (error) {
        console.log("Error inserting records to orders collection:", error);
    }
}


// async function prepareInventoryData() {
//   try {
//     // Connect to the database
//     const db = await connectToDatabase();

//     // Fetch product IDs along with their corresponding branches
//     const productBranches = await db.collection("products").aggregate([
//       {
//         $project: {
//           productId: 1,  // Include productId
//           branch: 1,     // Include branches where product is available
//           _id: 0         // Exclude the MongoDB default _id field
//         }
//       }
//     ]).toArray();

//     // Function to generate a random date between the given start and end dates
//     function generateRandomDate(start, end) {
//       const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
//       return new Date(randomTime); // Convert random time to a Date object
//     }

//     // Define the range for the random dates (last 6 months)
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);  // 6 months ago
//     const currentDate = new Date(); // Current date

//     // Prepare the inventory data by combining product ID and branch with stock levels and random update dates
//     const inventoryData = productBranches.flatMap(({ productId, branch }) => {
//       return branch.map(branchName => ({
//         productId,              // Product ID
//         branch: branchName,     // Branch name where the product is available
//         stock: Math.floor(Math.random() * 91) + 10,  // Random stock count between 10 and 100
//         lastUpdated: generateRandomDate(sixMonthsAgo, currentDate) // Random date within the last 6 months
//       }));
//     });

//     // Log the prepared inventory data for verification
//     console.log("Prepared Inventory Data:", inventoryData);

//     // Insert the generated inventory data into the "inventory" collection
//     const result = await db.collection("inventory").insertMany(inventoryData);

//     // Log success message showing how many records were inserted
//     console.log(`${result.insertedCount} inventory records inserted successfully.`);
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error("Error preparing inventory data:", error.message);
//   }
// }


async function prepareInventoryData() {
  try {
    // Connect to the database
    const db = await connectToDatabase();

    // Check if the inventory collection already has data
    const existingCount = await db.collection("inventory").countDocuments();
    if (existingCount > 0) {
      console.log("Inventory collection already has data. No new records inserted.");
      return;
    }

    // Fetch product IDs along with their corresponding branches
    const productBranches = await db.collection("products").aggregate([
      {
        $project: {
          productId: 1,  // Include productId
          branch: 1,     // Include branches where product is available
          _id: 0         // Exclude the MongoDB default _id field
        }
      }
    ]).toArray();

    // Function to generate a random date between the given start and end dates
    function generateRandomDate(start, end) {
      const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
      return new Date(randomTime); // Convert random time to a Date object
    }

    // Define the range for the random dates (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);  // 6 months ago
    const currentDate = new Date(); // Current date

    // Prepare the inventory data by combining product ID and branch with stock levels and random update dates
    const inventoryData = productBranches.flatMap(({ productId, branch }) => {
      return branch.map(branchName => ({
        productId,              // Product ID
        branch: branchName,     // Branch name where the product is available
        stock: Math.floor(Math.random() * 91) + 10,  // Random stock count between 10 and 100
        lastUpdated: generateRandomDate(sixMonthsAgo, currentDate) // Random date within the last 6 months
      }));
    });

    // Log the prepared inventory data for verification
    console.log("Prepared Inventory Data:", inventoryData);

    // Insert the generated inventory data into the "inventory" collection
    const result = await db.collection("inventory").insertMany(inventoryData);

    // Log success message showing how many records were inserted
    console.log(`${result.insertedCount} inventory records inserted successfully.`);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error preparing inventory data:", error.message);
  }
}


async function createCustomerReview() {
  try {
    // Step 1: Establish a connection to the database
    const db = await connectToDatabase();
    console.log("Successfully connected to the database.");

    // Step 2: Fetch productId and customerId from the 'orders' collection
    const orderData = await db.collection("orders").aggregate([
      {
        // Match orders that have products (this ensures only orders with products are processed)
        $match: { "products.0": { $exists: true } }
      },
      {
        // Project only the relevant fields (customerId and products)
        $project: {
          customerId: 1,  // Include customerId
          products: 1,    // Include the products array
          _id: 0          // Exclude _id field from the result
        }
      }
    ]).toArray();

    console.log("Fetched order data:", orderData);

    // Step 3: Generate review data for each product in the order
    const reviews = orderData.flatMap(({ customerId, products }) => {
      // For each product in the order, generate a review
      return products.map(({ productId }) => {
        // Ensure that productId is valid before generating review
        if (!productId) {
          console.log(`Skipping order for customer ${customerId} with missing productId`);
          return null; // Skip this review if productId is missing
        }

        return {
          reviewId: `R${Math.floor(Math.random() * 10000)}`,  // Generate a random reviewId
          productId: productId,                               // Use the valid productId
          customerId: customerId,                             // Use the valid customerId
          rating: (Math.random() * 5).toFixed(1),              // Random rating between 0 and 5
          reviewText: "This product is amazing! Highly recommended.",  // Sample review text
          reviewDate: new Date().toISOString().split('T')[0]   // Get today's date in YYYY-MM-DD format
        };
      }).filter(review => review !== null); // Filter out any invalid reviews where productId was missing
    });

    console.log("Generated Reviews:", reviews);

    // Step 4: Insert the generated review data into the 'reviews' collection
    if (reviews.length > 0) {
      const result = await db.collection("reviews").insertMany(reviews);
      console.log(`${result.insertedCount} reviews were successfully inserted into the database!`);
    } else {
      console.log("No valid reviews to insert.");
    }

  } catch (error) {
    // Step 5: Catch and log any errors during the process
    console.error("An error occurred while creating customer reviews:", error.message);
  }
}



// Function to generate a random date within the past month
function getRandomDateWithinLastMonth() {
  const today = new Date();
  const pastMonth = new Date(today);
  pastMonth.setMonth(today.getMonth() - 1);
  
  const randomDate = new Date(
    pastMonth.getTime() + Math.random() * (today.getTime() - pastMonth.getTime())
  );

  return randomDate.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
}

async function createWishlistCollection() {
  try {
    // Step 1: Connect to the database
    const db = await connectToDatabase();
    const wishlistCount = await db.collection("wishlist").countDocuments();
    if (wishlistCount > 0) {
      console.log("Wishlist collection already contains data. No new records inserted.");
      return;
    }
    // Step 2: Fetch valid customers and products
    const customers = await db.collection("customer").find({}, { projection: { customerId: 1, _id: 0 } }).toArray();
    const products = await db.collection("products").find({}, { projection: { productId: 1, _id: 0 } }).toArray();

    const customerIds = customers.map(customer => customer.customerId);
    const productIds = products.map(product => product.productId);

    // Step 3: Generate wishlist data for customers
    const wishlistData = customerIds.map(customerId => {
      // Assign a random selection of products to each customer
      const randomProducts = productIds
        .sort(() => Math.random() - 0.5) // Shuffle products
        .slice(0, Math.floor(Math.random() * 5) + 1); // Pick 1-5 products

      return {
        wishlistId: `W${Math.floor(Math.random() * 10000)}`, // Generate a random wishlistId
        customerId: customerId,
        products: randomProducts.map(productId => ({
          productId: productId,
          addedDate: getRandomDateWithinLastMonth() // Assign a random date within the last month
        }))
      };
    });

    // Step 4: Insert the wishlist data into the database
    const result = await db.collection("wishlist").insertMany(wishlistData);
    console.log(`${result.insertedCount} wishlists inserted successfully!`);
  } catch (error) {
    console.error("Error creating wishlist collection:", error.message);
  }
}


// Function to generate a random date between a start and end date
function generateRandomDate(start, end) {
  // Calculate a random time within the provided range
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  
  // Return the random date in a human-readable format (YYYY-MM-DD)
  return new Date(randomTime).toISOString().split("T")[0];
}

async function createDiscountsCollection() {
  try {
    // Step 1: Establish a connection to the database
    const db = await connectToDatabase();

    // Step 2: Check if any discounts already exist in the collection
    const discountsCount = await db.collection("discounts").countDocuments();
    if (discountsCount > 0) {
      console.log("The discounts collection already has data. No need to insert more.");
      return; // Exit early if discounts data already exists
    }

    // Step 3: Fetch all products from the database (only productId and name)
    const products = await db.collection("products").find({}, { projection: { productId: 1, name: 1, _id: 0 } }).toArray();
    if (products.length === 0) {
      console.log("It seems there are no products in the products collection. Please add products first.");
      return; // Exit if no products are found
    }

    // Step 4: Determine how many products will have discounts
    const percentageToDiscount = 0.3; // 30% of the products will have discounts
    const totalDiscountedProducts = Math.ceil(products.length * percentageToDiscount);

    // Randomly shuffle the products and select a subset for discounts
    const discountedProducts = products
      .sort(() => Math.random() - 0.5) // Shuffle the products randomly
      .slice(0, totalDiscountedProducts); // Select the first N products for discounts

    // Step 5: Prepare the discount data for each selected product
    const discountsData = discountedProducts.map(product => {
      // Generate a random discount percentage between 10% and 30%
      const randomDiscount = Math.floor(Math.random() * 21) + 10;

      // Generate random start and end dates for the discount within January 2025
      const startDate = generateRandomDate(new Date(2025, 0, 1), new Date(2025, 0, 15));
      const endDate = generateRandomDate(new Date(2025, 0, 16), new Date(2025, 0, 31));

      // Return the discount details for this product
      return {
        discountId: `D${Math.floor(Math.random() * 10000)}`, // Generate a random unique discount ID
        productId: product.productId,
        productName: product.name, // Include the product name for easier understanding
        discountPercentage: randomDiscount,
        startDate: startDate,
        endDate: endDate,
        description: `Enjoy ${randomDiscount}% off on ${product.name} (Product ID: ${product.productId})`
      };
    });

    // Step 6: Insert the generated discounts into the database
    const result = await db.collection("discounts").insertMany(discountsData);

    // Step 7: Log a success message with the number of discounts inserted
    console.log(`${result.insertedCount} discounts successfully added to the database.`);

  } catch (error) {
    // If an error occurs, log the error message
    console.error("Oops, something went wrong while creating the discounts collection:", error.message);
  }
}





createProducts();
createBranch();
createCustomer();
createOrders();

prepareInventoryData();
createCustomerReview();
createWishlistCollection();
createDiscountsCollection();