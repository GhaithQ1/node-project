const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewSchema = new Schema({
    firstname:String,
    lastname:String,
    email:String,
    telephone:Number,
    age:Number,
    country:String,
    gender:String
},
{
    timestamps:true
}
)

const Mydata = mongoose.model("MyData" , NewSchema);

module.exports = Mydata;

