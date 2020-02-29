

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



            var results = response.data
            for ( let d = 0; d < results.length; d++ )
            {

                // Create gifDiv and set the attributes to call it and animate later
                var gifDiv = $( '<div>' );

                var rating = results[ d ].rating;

                var p = $( '<p>' ).text( 'Rating: ' + rating );
                var giph = $( "<img>" );
                giph.attr( 'class', 'moveMe' );
                giph.attr( 'data-still', results[ d ].images.original_still.url );
                giph.attr( 'data-move', results[ d ].images.original.url )
                giph.attr( 'data-state', 'still' );
                giph.attr( "src", results[ d ].images.fixed_width_still.url );
                gifDiv.append( p, giph );
                $( '#resultsDiv' ).prepend( gifDiv );



                // Click on image function to start and stop animation

                $( '.moveMe' ).click( function ( event )
                {
                    event.stopPropagation();
                    let state = $( this ).attr( 'data-state' );
                    console.log( $( this ) );
                    console.log( "original state: ", + state );


                    //    Check state  and animate or stop animation

                    if ( state === 'still' )
                    {
                        $( this ).attr( 'data-state', 'move' );
                        let moveURL = $( this ).attr( 'data-move' );
                        $( this ).attr( 'src', moveURL );
                        console.log( state );
                    } else //( state === 'move' )
                    {
                        $( this ).attr( 'data-state', 'still' );
                        let stillURL = $( this ).attr( 'data-still' );
                        $( this ).attr( 'src', stillURL );
                        console.log( state );
                    }



                } )









            }
        } )




    } )






} )




// // Push Search topic into the topics array

$( '#search' ).on( 'click', function ()
{
    event.preventDefault();
    let searchTopic = $( '#input' ).val();
    console.log( searchTopic );


    topics.push( searchTopic );
    console.log( topics );
    for ( let nt = 0; nt < topics.length; nt++ )
    {


        let but = $( '<button>' ).text( topics[ nt ] ).attr( 'class', "btn btn-primary click" ).attr( 'data-search', topics[ nt ] );
        $( '#buttonDiv' ).empty();
        $( '#buttonDiv' ).append( but );


    }



} )



// Remake buttons from updted array















// on search
// take the value push it into topics, create button, make ajax call