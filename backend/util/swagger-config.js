const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

module.exports = function(req, res, next) {

	/**************** SWAGGER-JSDOC ****************/
	// swagger definition
	var swaggerDefinition = {
		info: {
		title: 'Node Swagger API',
		version: '1.0.0',
		description: 'Simple Accounting RESTful API with Swagger',
		},
		host: 'localhost:3000',
		basePath: '/',
	};
	
	// options for the swagger docs
	var options = {
		// import swaggerDefinitions
		swaggerDefinition: swaggerDefinition,
		// path to the API docs
		apis: [__dirname + '/../routes/*.js']
	};
	
	// initialize swagger-jsdoc
	var swaggerSpec = swaggerJSDoc(options);

	// serve swagger
	req.app.get('/swagger.json', function(req, res) {
		res.setHeader('Content-Type', 'application/json');
		res.send(swaggerSpec);
	});


	/************************ SWAGGER-UI-EXPRESS ********************/
	const FILE_OR_URL = 'URL';

	if(FILE_OR_URL === 'FILE') {
		//Use swagger.json static file
		const swaggerDocument = require('./swagger.json');
		req.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	} else if (FILE_OR_URL === 'URL') {
		//Use dynamic swagger.json URL
		url = "http://localhost:3000/swagger.json";
		req.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup('','','','','',url));
	}

	next();

}