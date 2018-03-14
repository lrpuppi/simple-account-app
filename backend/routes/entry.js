var express = require('express');
var router = express.Router();
var svcEntry = require('../service/entry');

const path = "/api/entries";

/*-------------------- Model Entry ---------------------*/

/**
 * @swagger
 * definitions:
 *   Entry:
 *     type: object
 *     required: 
 *       - id
 *     properties:
 *       id:
 *         type: int
 *       payment_date: 
 *         type: date
 *       due_date: 
 *         type: date
 *       description:
 *         type: string
 *       type:
 *         type: string
 *       value:
 *         type: number
 *       entry_id:
 *         type: int
 */

/*-------------------- RESTful Lançamentos ---------------------*/

/**
 * @swagger
 * /api/entries:
 *   get:
 *     tags:
 *       - Entries
 *     description: Returns all entries
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of entries
 *         schema:
 *           $ref: '#/definitions/Entry'
 */
router.get(`${path}`, function(req, res){//GET ALL
	svcEntry.getEntries(function(data){
		res.send(data);
	});
});

/**
 * @swagger
 * /api/entries/{id}:
 *   get:
 *     tags:
 *       - Entries
 *     description: Returns a single entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Entry's id
 *         in: entry id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single entry
 *         schema:
 *           $ref: '#/definitions/Entry'
 */
router.get(`${path}/:id`, function(req,res){//GET One
	var id = req.params.id;
	svcEntry.getEntry(function(data) {
		res.send(data);
	}, id);
});

/**
 * @swagger
 * /api/entries:
 *   post:
 *     tags:
 *       - Entries
 *     description: Creates a new entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: entry
 *         description: Entry object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Entry'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post(`${path}`, function(req,res){//POST
	var entry = req.body;

	svcEntry.addEntry(function(data) {
		res.send(data);
	}, 
		entry ); //insert req.body 
});

/**
 * @swagger
 * /api/entries/{id}:
 *   put:
 *     tags: 
 *       - Entries
 *     description: Updates a single entry
 *     produces: 
 *       - application/json
 *     parameters:
 *       - id: any
 *         description: Id for the Entry resource
 *     schema:
 *         $ref: '#/definitions/Entry'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put(`${path}/:id`, function(req,res){//PUT
	var entry = req.body;
	entry.id = req.params.id;

	console.log(entry);

	svcEntry.updEntry(
		function(data) {
			res.send(data);
		}, entry
	);
});

/**
 * @swagger
 * /api/entries/{id}:
 *   delete:
 *     tags:
 *       - Entries
 *     description: Deletes a single entry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Entry's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete(`${path}/:id`, function(req,res){//DELETE
	var id = req.params.id;
	svcEntry.delEntry(function(data) {
		res.send(data);
	}, id);
});

module.exports = router;