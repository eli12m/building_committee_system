app.factory( "votingsService", function(){
    var votings          = [];
    var counter          = 3; /*todo: to change this that it will be read from json and not hard coded*/
    var loadVotingsFlag  = false;
    
    function Voting( id, title, details)
    {
        this.id                = id;
        this.title             = title;
        this.details           = details;
        /*todo: end date*/
    }
});