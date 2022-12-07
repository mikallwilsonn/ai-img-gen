// --
// Dependencies
const express =  require( 'express' );
const dotenv = require( 'dotenv' ).config();
const path = require( 'path' );


// --
// Setup
const app = express();
const port = process.env.PORT || 5000;

app.use( express.json() );
app.use( express.urlencoded({ extended: false }));


// Static directory
app.use( express.static( path.join( __dirname, 'public' )));


// Routes
app.use( '/openai', require( './routes/openaiRoutes' ));


// Start Server
app.listen(( port ), () => {
    console.log( `✅ Server is running on port: ${ port }` );
});