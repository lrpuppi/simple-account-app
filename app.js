const __BE_REL_PATH = "./backend";	//Relative system path to backend
const __FE_REL_PATH = "./frontend";	//Relative system path to frontend
const __NG_REL_PATH = "/frontend";	//Relative URL path to frontend

var express = require("express");
var bodyParser = require("body-parser");
var db = require(__BE_REL_PATH + "/util/database.js");
var app = express();
var routerPersons = require(__BE_REL_PATH + "/routes/person");
var routeEntries = require(__BE_REL_PATH + "/routes/entry");
var swaggerConfig = require(__BE_REL_PATH + "/util/swagger-config");

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

db.createDatabase();

// Routes must be defined after body parser
app.use(routerPersons);		// Persons API
app.use(routeEntries);		// Entries API
app.use(swaggerConfig);		// Swagger API Docs

app.use(__NG_REL_PATH, express.static(__dirname + "/frontend/app")); //Set resources as static

app.listen(3000, function(){
	console.log("server started!");
});

app.get("/", function(req,res){
	res.redirect(__NG_REL_PATH + "/index.html");
});

/* Express EJS views REMOVED */
