// --
// Dependencies
const { Configuration, OpenAIApi } = require( 'openai' );


// Config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi( configuration );


// --
// Controller Functions
const generateImage = async ( req, res ) => {
    const { prompt, size } = req.body;

    const imageSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.createImage({
            prompt,
            n: 1, 
            size: imageSize
        });

        const imageUrl = response.data.data[0].url;

        return res.status( 200 ).send({
            success: true, 
            message: 'The image was successfully created.',
            data: imageUrl
        });

    } catch ( error ) {
        console.error( error );

        return res.status( 400 ).send({ 
            success: false,
            message: 'The image could no be generated.',
            error 
        })
    }
}


// Exports
module.exports = { generateImage };