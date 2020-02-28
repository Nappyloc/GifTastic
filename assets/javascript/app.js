


var topics = [ 'crabby patty', 'spongebob', 'patrick', 'squidward' ]
for ( let i = 0; i < topics.length; i++ )
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + i + "&api_key=SIzTkCeV8ao2iGwLRXzhrwanEImChuJP&limit=10";
$.ajax( {
    url: queryURL,
    method: "GET"
} ).then( function ( response )
{
    var results = response.data
    debugger;
    for ( let g = 0; g < results.length; g++ )
    {



        var gifDiv = $( '<div>' )

        var rating = results[ g ].rating

        var p = $( '<p>' ).text( 'Rating: ' + rating )
        var giph = $( "<img>" )
        giph.attr( "src", results[ g ].images.fixed_height.url )
        gifDiv.append( p, giph )
        $( '#resultsDiv' ).append( gifDiv );

    }

} );

