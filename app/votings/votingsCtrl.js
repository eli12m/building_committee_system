app.controller( "votingsCtrl", function( $scope, loginService, votingsService, tenantsService ){    
    /*We did it as object and not a string because the ng-model was updated only in that way when the user select option in the view*/
    $scope.optVoteSelection =  { mode: "In Favor" };/*todo: to change that when it is dynamic*/
    $scope.isShowBtn = function(){
        return loginService.isLoginTenantCommitteeMemberMethod();
    }
    $scope.isDisableBtn = function( voting ){
        var emailActiveTenant = loginService.getActiveTenantMethod().getEmail();
        var res               = false;

        res = voting.isTenantVotedOnVoting( emailActiveTenant );

        return res;
    }
    $scope.isNeedToVote = function( voting ){
        var emailActiveTenant = loginService.getActiveTenantMethod().getEmail();
        var res               = false;

        res = voting.isTenantVotedOnVoting( emailActiveTenant );

        return !res;
    }
    $scope.getTenantVotedOpt = function( voting ){
        var emailActiveTenant = loginService.getActiveTenantMethod().getEmail();
        var voteOptStr        = "";

        voteOptStr = voting.getVotedOptByTenant( emailActiveTenant );

        return voteOptStr;
    }
    $scope.subTenantVoteOpt = function( voting ){
        var emailActiveTenant = loginService.getActiveTenantMethod().getEmail();
        var selectedVoteOpt   = "";

        selectedVoteOpt = $scope.optVoteSelection.mode;

        votingsService.addVoteToVotingMethod( voting, emailActiveTenant, selectedVoteOpt );
    }
    $scope.getResultsVotesPrecentageObj = function( voting ){
        var numTenantsVoteFirstOpt    = voting.getVotesOpt( "In Favor" );
        var numTenantsVoteSecondOpt   = voting.getVotesOpt( "Against" );
        var resultsVotesPrecentageObj = {};

        resultsVotesPrecentageObj.type = "PieChart";
        resultsVotesPrecentageObj.data = {
            "cols": [ {id: "i", label: "In Favor/Against", type: "string"},
                      {id: "v", label: "Votes", type: "number"} ],
            "rows": [ {c: [{v:"In Favor"}, {v:numTenantsVoteFirstOpt}]}, {c: [{v:"Against"}, {v:numTenantsVoteSecondOpt}]}]
        };

        resultsVotesPrecentageObj.options = {
            'title': 'In Favor/Against'
        };

        return resultsVotesPrecentageObj;
    }
    $scope.getVotesPrecentageObj = function( voting ){
        var numTenantsVote     = voting.getVotesNum();
        var numTenantsNotVote  = tenantsService.getNumOfTenantsMethod() - numTenantsVote;
        var votesPrecentageObj = {};
        
        votesPrecentageObj.type = "PieChart";
        votesPrecentageObj.data = { 
            "cols": [ {id: "v", label: "Votes/Not Votes", type: "string"},
                      {id: "t", label: "Tenants", type: "number"} ],
            "rows": [ {c: [{v:"Votes"}, {v:numTenantsVote}]}, {c: [{v:"Not Votes"}, {v:numTenantsNotVote}]}]
        };

        votesPrecentageObj.options = {
            'title': 'Votes/Not Votes'
        };

        return votesPrecentageObj;
    }

    /*This is only for check that the graph appear when we do a function.
      Please pay attention that there is a problem with counter var: the counter var is a var that
      defined outside of the func so angular put a watch on it. Now when this func is called a counter is changed so
      we have again a watch on it so the func is called again and again the counter is changed and again there is a watch so we are in endless loop.
      */
   /* $scope.getVotesPrecentageObj = function( voting ){
        counter++;
        var myChartObject = {};
        myChartObject.type = "PieChart";
        myChartObject.data = {"cols": [
            {id: "t", label: "Topping", type: "string"},
            {id: "s", label: "Slices", type: "number"}
        ], "rows": [
            {c: [
                {v: "Mushrooms"},
                {v: 3},
            ]},
            {c: [
                {v: "Olives"},
                {v: *//*counter*//*}*///counter /*voting.votes.length*//*}
            /*]},
            {c: [
                {v: "Zucchini"},
                {v: 1},
            ]},
            {c: [
                {v: "Pepperoni"},
                {v: 2},
            ]}
        ]};*/

/* myChartObject.data.rows.push({
            c: [
                {v: options[i]},
                {v}
            ]
        })*/

       /* myChartObject.options = {
            'title': 'How Much Pizza I Ate Last Night'
        };

        return myChartObject;
    }*/


    votingsService.loadVotingsMethod().then( function( votings ){
        $scope.votings = votings;
    }, function( votings ){
        alert( "Error:" );/*todo: to cangethat*/ 
    });
    tenantsService.loadTenantsMethod().then( function( tenants ){
        /*$scope.tenants = tenants;*//*I dont have to do $scope.tenants = tenants; that I will have a listener and then the func getVotesPrecentageObj() will be called because it use $scope.tenants because my way work also and this is because that the func getVotesPrecentageObj() is called every time there is some event in the scope like click on button even that it doesnt change anything so the func is also called after the load.*/
    }, function( tenants ){
        alert( "Error:" ); /*todo: to cangethat*/
    });
});