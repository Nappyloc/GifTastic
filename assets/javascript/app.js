

// on page load loop through topics create buttons
var topics = [ 'Chuck Norris', 'Arnold', 'Jean Claude', 'Stalone', 'Statham', 'Snipes', 'Bruce Willis', 'Seagal' ]
$( document ).ready( function ()
{
    for ( let b = 0; b < topics.length; b++ )
    {
        var but = $( '<button>' ).text( topics[ b ] ).attr( 'class', "btn btn-dark click list-group-item list-group-item-action" ).attr( 'data-search', topics[ b ] ).attr( "type", "button" );
        $( '#buttonDiv' ).append( but );

    }


} )


// Display results upon button click

$( document ).on( 'click', '.click', function ()
{
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
            var gifDiv = $( '<div>' ).attr( 'class', 'd-inline-flex p-2' )

            var gifCard = $( '<div>' );
            gifCard.attr( 'class', 'card w-50' );

            var rating = results[ d ].rating;
            var body = $( '<div>' ).attr( 'class', 'card-body' )
            var p = $( '<p>' ).text( 'Rating: ' + rating ).attr( "class", "card-text" );
            var giph = $( "<img>" );
            giph.attr( 'class', 'card-img-top moveMe' );
            giph.attr( 'data-still', results[ d ].images.original_still.url );
            giph.attr( 'data-move', results[ d ].images.original.url )
            giph.attr( 'data-state', 'still' );
            giph.attr( "src", results[ d ].images.fixed_width_still.url );
            body.append( p )
            gifCard.append( giph, body );
            gifDiv.append( gifCard )
            $( '#resultsDiv' ).prepend( gifDiv );


        }


    } )


} )






// Click on image function to start and stop animation

$( document ).on( 'click', '.moveMe', function ()
{

    let state = $( this ).attr( 'data-state' );


    //    Check state  and animate or stop animation

    if ( state === 'still' )
    {
        $( this ).attr( 'data-state', 'move' );
        let moveURL = $( this ).attr( 'data-move' );
        $( this ).attr( 'src', moveURL );

    } else //( state === 'move' )
    {
        $( this ).attr( 'data-state', 'still' );
        let stillURL = $( this ).attr( 'data-still' );
        $( this ).attr( 'src', stillURL );

    }



} )






// // Push Search topic into the topics array

$( '#search' ).on( 'click', function ()
{
    event.preventDefault();
    let searchTopic = $( '#input' ).val();

    if ( searchTopic === "" )
    {
        alert( "Please enter a valid search" )
    } else
    {





        // @ts-ignore
        topics.push( searchTopic );

        $( '#buttonDiv' ).empty();
        for ( let nt = 0; nt < topics.length; nt++ )
        {


            let but = $( '<button>' ).text( topics[ nt ] ).attr( 'class', "btn btn-dark click" ).attr( 'data-search', topics[ nt ] ).attr( "type", "button" );
            $( '#buttonDiv' ).append( but );


        }


    }
    $( '#input' )


} )

