//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//mongodb://<dbuser>:<dbpassword>@ds139949.mlab.com:39949/physiciansaffinance

//Define a schema
var Schema = mongoose.Schema;

var PhysicianSchema = new Schema({
    Physician_First_Name : String,
    Physician_Middle_Name : String,
    Physician_Last_Name : String,
    Physician_Name_Suffix: String,
    Recipient_Primary_Business_Street_Address_Line1: String,
    Recipient_Primary_Business_Street_Address_Line2: String,
    Recipient_City: String,
    Recipient_State: String,
    Recipient_Zip_Code: String,
    Recipient_Country: String
});

var summarisedPhysicianSchema = new Schema({
    name: String,
    address: String
});
var Physician = mongoose.model('Physician', PhysicianSchema, 'test_col');


var summarisedPhysicianData = [];
Physician.find({}, function (err, physicians) {
    if (err) return handleError(err);
    // 'athletes' contains the list of athletes that match the criteria.
    console.log(physicians.length);

    physicians.forEach(ele => {
        summarisedPhysicianData.push({
            name: ele.Physician_Name_Suffix + ' ' + ele.Physician_First_Name+ ' '+ ele.Physician_Middle_Name + ' ' + ele.Physician_Last_Name,
            address: ele.Recipient_Primary_Business_Street_Address_Line1+ ', ' +ele.Recipient_Primary_Business_Street_Address_Line2+ ', '+ele.Recipient_City + ', '+ele.Recipient_State+ ', '+ele.Recipient_Zip_Code+ ', '+ele.Recipient_Country
        })
        console.log('1');
    });


//Set up default mongoose connection
var onlinemongoDB = 'mongodb://root:<dbpassword>@ds139949.mlab.com:39949/physiciansaffinance';
//var onlinemongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(onlinemongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
var summarisedPhysician = mongoose.model('summarisedPhysician', summarisedPhysicianSchema, 'physicians');

    summarisedPhysician.insertMany(summarisedPhysicianData)  
    .then((result) => {
            console.log("result ", result);
    })
    .catch(err => {
            console.error("error ", err);
    });
  })
  .skip(40000)
  .limit(10000);


//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));