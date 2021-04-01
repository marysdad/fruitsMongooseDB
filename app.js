//jshint sversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({ //this is table schema for the DB
  name: {
    type: String,
    required: [true,'why are not giving it a name?']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//this is a model to create indivual fruits js documets to insert into the DB
const Fruit = mongoose.model("Fruit", fruitSchema); // first paramete "Fruit" is the came of the table mongoose changes it to a plural

//this is inserts new fruit data into 'fruits collection/table'
//this comes from the above model and schema.
const fruit = new Fruit({
  name:"not a fruit",
  rating: 5,
  review:"its just about ok"
});

//fruit.save();


const personSchema = new mongoose.Schema({
  name:String,
  age:Number,
  favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person",personSchema);

const pineApple = new Fruit({
  name:"Pineapple",
  rating: 9,
  review:"I love its taste"
});

const avacodo = new Fruit({
  name:"Avacodo",
  rating:10,
  review:" its very healthy"
});

avacodo.save();

Person.updateOne({name: "Kaki"},{favouriteFruit:avacodo},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated the document.")
  }
});



//pineApple.save();

// const person = new Person({
//   name:"Aisha",
//   age: 5,
//   favouriteFruit: pineApple
// });


//person.save();

// const orange = new Fruit({
//   name:"Orange",
//   rating:4,
//   review:"Love it in chocolate"
// });
//
// const banana = new Fruit({
//   name:"Banana",
//   rating:20,
//   review:"Best fruit"
// });


// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully save all the fruits to fruitsDB")
//   }


Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();

    fruits.forEach(function(fruit){ //this is a loop that loops through fruit array to only get the fruit name
      console.log(fruit.name)
    });

  }
});


//
// Person.deleteOne( {review:"scoreI love its taste"},function(err){
//
//   if(err){
//     console.log(err);
//   }else{
//     console.log("successfully deleted the rating 5");
//   }
// });
