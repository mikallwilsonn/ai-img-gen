// --
// Dependencies
const express = require( 'express' );
const router = express.Router();


// Controllers
const openaiController = require( '../controllers/openaiController' );


// --
// Routes
router.post( '/generateImage', openaiController.generateImage );


// Export
module.exports = router;