

// on page load loop through topics create buttons
var topics = [ 'Chuck Norris', 'Arnold', 'Jean Claude', 'Stalone', 'Statham', 'Snipes', 'Bruce Willis', 'Seagal' ]
$( document ).ready( function ()
{
    for ( let b = 0; b < topics.length; b++ )
    {
        var but = $( '<button>' ).text( topics[ b ] ).attr( 'class', "btn btn-primary click" ).attr( 'data-search', topics[ b ] );
        $( '#buttonDiv' ).append( but );



        // on button click call the ajax to return the clicked topic info

    }
    $( '.click' ).on( 'click', function ()
    {
        $( '#resultsDiv' ).empty();
        let search = $( this ).attr( 'data-search' );
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=SIzTkCeV8ao2iGwLRXzhrwanEImChuJP&limit=10";

        $.ajax( {
            url: queryURL,
            method: "GET"
        } ).then( function ( response )
        {
            debugger;


            var results = response.data
            for ( let d = 0; d < results.length; d++ )
            {

                // Create gifDiv and set the attributes to call it and animate later
                var gifDiv = $( '<div>' );

                var rating = results[ d ].rating;

                var p = $( '<p>' ).text( 'Rating: ' + rating );
                var giph = $( "<img>" ).attr( 'class', 'moveMe' ).attr( 'data-still', results[ d ].images.original_still.url ).attr( 'data-move', results[ d ].images.original.url ).attr( 'data-state', 'still' );
                giph.attr( "src", results[ d ].images.fixed_width_still.url );
                gifDiv.append( p, giph );
                $( '#resultsDiv' ).prepend( gifDiv );



                // Click on image function to start and stop animation

                $( '.moveMe' ).on( 'click', function ()
                {
                    let state = $( this ).attr( 'data-state' );
                    console.log( 'state:', +   state );


                    //    Check state  and animate or stop animation

                    if ( state === 'still' )
                    {
                        $( this ).attr( 'data-state', 'move' );
                        let moveURL = $( this ).attr( 'data-move' );
                        $( this ).attr( 'src', moveURL );
                    }




                    if ( state === 'move' )
                    {
                        $( this ).attr( 'data-state', 'still' );
                        let stillURL = $( this ).attr( 'data-still' );
                        $( this ).attr( 'src', stillURL );
                    }



                } )









            }
        } )




    } )






} )


















// // Create Search Button from Search Input

















// on search
// take the value push it into topics, create button, make ajax call