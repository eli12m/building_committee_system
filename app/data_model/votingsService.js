app.factory( "votingsService", function( $http, $q ){
    var votings          = [];
    var counter          = 3; /*todo: to change this that it will be read from json and not hard coded*/
    var loadVotingsFlag  = false;
    
    function Voting( id, title, details, endDate )
    {
        this.id                = id;
        this.title             = title;
        this.details           = details;
        this.endDate           = new Date( endDate );
        this.getId             = function(){ return this.id; }
        this.getTitle          = function(){ return this.title; }
        this.setTitle          = function( title ){ this.title = title; }
        this.getDetails        = function(){ return this.details; }
        this.setDetails        = function( details ){ this.details = details; }
        this.getEndDate        = function(){ return this.endDate; }
        this.setEndDate        = function( endDate ){ this.endDate = endDate; }
    }

    function loadVotingsFunc()
    {
        var asyncLoad = $q.defer();

        if( loadVotingsFlag )
        {
            asyncLoad.resolve( votings );
        }
        else
        {
            loadVotingsFlag = true;

            $http.get( "/app/votings/votings.json" ).then( function( response ){
                //on success
                var i = 0;

                //We cannot do here messages = [] because the outside already hold actors and if we do that we change the pointer. For example two collectors that use this service. The first collector call to this function and get an array of actors. Then the second collector call to this function and do messages = [] and by this give a new pointer to messages so the first collector still looked on the old pointer of messages.
                //so to empty the array instead of doing messages = [] do actors.splice( 0, messages.length )

                votings.splice( 0, votings.length );

                for( i = 0; i < response.data.length; i++ ){
                    votings.push( new Voting( parseInt( response.data[i].votingId ), response.data[i].title, response.data[i].details, response.data[i].endDate ) );
                }
        
                asyncLoad.resolve( votings );
            }, function( response ){
                //on failure
                loadVotingsFlag = false;

                alert( "Error:" + response );
                asyncLoad.reject( votings ); 
            }); 
        }

        return asyncLoad.promise;
    }

    return{
        loadVotingsMethod: loadVotingsFunc
    };
});