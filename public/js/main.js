function onSubmit( event ) {
    event.preventDefault();

    document.querySelector( '.msg' ).textContent = '';
    document.querySelector( '#image' ).src = '';

    const prompt = document.querySelector( '#prompt' ).value;
    const size = document.querySelector( '#size' ).value;

    if ( prompt === '' ) {
        alert( 'You must provide a description to generate an image.' );
        return;
    }

    generateImageRequest( prompt, size );
}

async function generateImageRequest( prompt, size ) {
    try {
        toggleSpinner( 'add' );
        const response = await fetch( '/openai/generateImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, size })
        });

        if ( !response.ok ) {
            toggleSpinner( 'remove' );
            throw new Error( 'The image could not be generated.');
        }

        const data = await response.json();

        // console.log( data );

        const imageUrl = data.data;

        document.querySelector( '#image' ).src = imageUrl;
        toggleSpinner( 'remove' );
    } catch ( error ) {
        toggleSpinner( 'remove' );
        console.error( error );
        document.querySelector( '.msg' ).textContent = error;
    }
}


function toggleSpinner( action ) {
    document.querySelector( '.spinner' ).classList[ action ]( 'show' );
}



document.querySelector( '#image-form' ).addEventListener( 'submit', onSubmit );

