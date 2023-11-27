const country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const Mydata = require("./models/Mydata");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"))
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

mongoose
  .connect(
    "mongodb+srv://ghaithdrh:8w4cuU7MZdklyZfx@cluster0.pcolro1.mongodb.net/Data?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conncted successfully");
  })
  .catch((error) => {
    console.log("conncted is Not Successfully");
  });

  app.post('/views/user/add.ejs', async(req,res)=>{
    const data =  new Mydata(req.body);
    await data.save().then(()=>{
      res.redirect("/")
    }).catch(()=>{
      console.log("not send data")
    })
    }
    
    
  )





app.get("/", async(req, res) => {
    
  try{
    const showdata = await Mydata.find();
    res.render("index",{
      data:showdata,
      moment:moment,
      
    })
    
  }catch(err){
    console.log("not found data")
  }
   
});

app.get("/user/add", async(req, res) => {
  res.render("user/add",{
    country:country_list
  })
});

app.get("/edit/:id", async(req, res) => {
  await Mydata.findById(req.params.id).then((result)=>{
    res.render("user/edit",{
      edit:result,
      country:country_list

    })
  }).catch((err)=>{

  })
  
});

app.put('/edit/:id', async(req,res)=>{
  await Mydata.findByIdAndUpdate(req.params.id , req.body).then(()=>{
    res.redirect("/")
  }).catch(()=>{
    console.log("data is not updated")
  })
})



app.get("/view/:id", async(req, res) => {
  await Mydata.findById(req.params.id).then((result)=>{
    res.render("user/view",{
      view:result,
      moment:moment
    })
  }).catch((err)=>{
    console.log("not view")
  });
    
});    
app.delete("/deleted/:id", async(req, res) => {
  await Mydata.findByIdAndDelete(req.params.id).then(()=>{
    res.redirect("/")
  }).catch((err)=>{
    console.log("not deleted")
  })  
});    

app.post("/search",async(req,res)=>{
  const searchText = req.body.searchText.trim()
  await Mydata.find({$or:[{firstname:String(searchText)},{lastname:String(searchText) }]}).then((result)=>{
    res.render("user/search",{
      search:result,
      moment:moment
    })
  }).catch(()=>{
    console.log("search is not")
  })
})



app.listen(3000, () => {
  console.log("prot 3000");
});
