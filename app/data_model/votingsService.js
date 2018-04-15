app.factory( "votingsService", function( $http, $q, votesService ){
    var votings          = [];
    var counter          = 3; /*todo: to change this that it will be read from json and not hard coded*/
    var loadVotingsFlag  = false;
    
    function Voting( id, title, details, endDate, votes )
    {
        this.id                = id;
        this.title             = title;
        this.details           = details;
        this.endDate           = new Date( endDate );
        this.votes             = votes;
        this.getId             = function(){ return this.id; }
        this.getTitle          = function(){ return this.title; }
        this.setTitle          = function( title ){ this.title = title; }
        this.getDetails        = function(){ return this.details; }
        this.setDetails        = function( details ){ this.details = details; }
        this.getEndDate        = function(){ return this.endDate; }
        this.setEndDate        = function( endDate ){ this.endDate = endDate; }
        this.getVotes          = function(){ return this.votes; }
        this.setVotes          = function( votes ){ this.votes = votes; }
        this.addVoteToVoting   = function( vote )
        {
            this.votes.push( vote );
        }
        this.copyVotesArr = function( votes )
        {
            this.votes = votesService.cloneVotesArrMethod( votes );  
        }
        this.isTenantVotedOnVoting = function( voterStr )
        {
            var i   = 0;
            var res = false;

            for( i = 0; i < this.votes.length; i++ )
            {
                if( voterStr === this.votes[i].getVotedBy() )
                {
                    res = true;
                    break;
                }
            }

            return res;
        }
        this.getVotedOptByTenant = function( voterStr )
        {
            var i           = 0;
            var votedOptStr = "";

            for( i = 0; i < this.votes.length; i++ )
            {
                if( voterStr === this.votes[i].getVotedBy() )
                {
                    votedOptStr = this.votes[i].getVoteVal();
                    break;
                } 
            }

            return votedOptStr;
        }
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

                //We cannot do here votings = [] because the outside already hold actors and if we do that we change the pointer. For example two collectors that use this service. The first collector call to this function and get an array of actors. Then the second collector call to this function and do messages = [] and by this give a new pointer to messages so the first collector still looked on the old pointer of messages.
                //so to empty the array instead of doing votings = [] do actors.splice( 0, messages.length )

                votings.splice( 0, votings.length );

                for( i = 0; i < response.data.length; i++ ){
                    votings.push( new Voting( parseInt( response.data[i].votingId ), response.data[i].title, response.data[i].details, response.data[i].endDate, votesService.cloneVotesArrMethod( response.data[i].votes ) ) );
                }
        
                asyncLoad.resolve( votings );
            }, function( response ){
                //on failure
                loadVotingsFlag = false;

                alert( "Error:" + response );/*todo: to change that*/
                asyncLoad.reject( votings ); 
            }); 
        }

        return asyncLoad.promise;
    }

    function addVoteToVotingFunc( voting, voteBy, voteOpt )
    {
        var votes = voting.getVotes();

        votesService.addVoteToVotesArrMethod( votes, voteBy, voteOpt );
    }

    return{
        loadVotingsMethod: loadVotingsFunc,
        addVoteToVotingMethod: addVoteToVotingFunc
    };
});