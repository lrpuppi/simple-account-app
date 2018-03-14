var express = require('express');
var router = express.Router();
var svcPerson = require('../service/person');

const path = "/api/persons";

/*-------------------- Model Person ---------------------*/

/**
 * @swagger
 * definitions:
 *   Person:
 *     type: object
 *     required:
 *       - id
 *       - name
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 */

/*-------------------- RESTful Persons ---------------------*/

/**
 * @swagger
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: Returns all persons
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of persons
 *         schema:
 *           $ref: '#/definitions/Person'
 */
router.get(`${path}`, function(req,res){//GET All
	svcPerson.getPersons(data=>{
	 	res.send(data);
	});
});

/**
 * @swagger
 * /api/persons/{id}:
 *   get:
 *     tags:
 *       - Persons
 *     description: Returns a single person
 *     produces:
 *       - application/jsonmodule.exports = function(req, res, next) {
 *     parameters:
 *       - name: id
 *         description: Person's id
 *         in: person id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single person
 *         schema:
 *           $ref: '#/definitions/Person'
 */
router.get(`${path}/:id`, function(req,res){//GET One
	var id = req.params.id;
	svcPerson.getPerson(function(data) {
		res.send(data);
	}, id);
});

/**
 * @swagger
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: Creates a new person
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: person
 *         description: Person object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Person'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post(`${path}`, function(req,res){//POST
	var person = {name: req.body.name};

	svcPerson.addPerson(function(data) {
		res.send(data);
	}, person );
});

/**
 * @swagger
 * /api/persons/{id}:
 *   put:
 *     tags: 
 *       - Persons
 *     description: Updates a single person
 *     produces: 
 *       - application/json
 *     parameters:
 *       - id: any
 *         description: Id for the Person resource
 *     schema:
 *         $ref: '#/definitions/Person'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(`${path}/:id`, function(req,res){//PUT
	var person = {id: req.params.id,
				  name: req.body.name};

    svcPerson.updPerson(function(data) {
		res.send(data);
	}, person);
});


/**
 * @swagger
 * /api/persons/{id}:
 *   delete:
 *     tags:
 *       - Persons
 *     description: Deletes a single person
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Person's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(`${path}/:id`, function(req,res){//DELETE
	var id = req.params.id;
	svcPerson.delPerson(function(data) {
		res.send(data);
	}, id);
});


module.exports = router;