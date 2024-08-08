const mongoose = require("mongoose");
const ProductCollection = require("../../models/ProductSchema")


const getproductcontroller = async (req, res) => {
    try {
        const { category, name, subcategory,id} = req.params;
        let product;

        if (category) {
            const searchcategory = category.toLowerCase();
            product = await ProductCollection.find({
                category: { $regex: new RegExp(searchcategory, 'i') }
            });

        } else if (name) {
            const searchname = name.toLowerCase();
            product = await ProductCollection.find({
                name: { $regex: new RegExp(searchname, 'i') },
            });
        } else if (subcategory) {
            const searchsubcategory = subcategory.toLowerCase();
            product = await ProductCollection.find({
                sub_category: { $regex: new RegExp(searchsubcategory, 'i') },
            });
        }  else if(id){
            product=await ProductCollection.find({
                _id:id,
            });
        }
        else if (req.path.includes("/random")) {
          product=await ProductCollection.aggregate([
{
    $sample:{
        size:9,
    },
},
          ]);
        } 
        else if (req.path.includes("/top-rated")) {
           product=await ProductCollection.find().sort({rating:-1}).limit(9);
          } 
          else if (req.path.includes("/lowtohigh")) {
            product=await ProductCollection.find().sort({new_price:1}).limit(9);
           } 
           else if (req.path.includes("/hightolow")) {
            product=await ProductCollection.find().sort({new_price:-1}).limit(9);
           } 
        else {
            product = await ProductCollection.find();
        }
            res.status(200).send(product);
            console.log(`Product fetched successfully`);

    } catch (error) {
        res.status(500).send({
            message: "Error Fetching products",
        });
        console.log(`Error Occured:${error}`);
    }

}

module.exports = getproductcontroller;


// const mongoose = require('mongoose');
// const productcollection = require('../../models/ProductSchema');

// const getproductcontroller = async (req, res) => {
//     try {
//         const { category, name, sub_category } = req.params;
//         let product;
        
//         if (category) {
//             const searchCategory = category.toLowerCase();
//             product = await productcollection.find({
//                 category: { $regex: new RegExp(searchCategory, 'i') }
//             });
//         } else if (name) {
//             const searchName = name.toLowerCase();
//             product = await productcollection.find({
//                 name: { $regex: new RegExp(searchName, 'i') }
//             });
//         } else if (sub_category) {
//             const searchSubCategory = sub_category.toLowerCase();
//             product = await productcollection.find({
//                 sub_category: { $regex: new RegExp(searchSubCategory, 'i') }
//             });
//         } else {
//             product = await productcollection.find();
//         }

//         res.status(200).send(product);
//         console.log('Success: Products fetched'.bgCyan.blue);

//     } catch (error) {
//         res.status(500).send({
//             message: "Error fetching products",
//             error: error.message // Provide more details about the error
//         });
//         console.error('Error occurred:', error.message); // Log the error message for debugging
//     }
// };

// module.exports = getproductcontroller;