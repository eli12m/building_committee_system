app.controller( "votingsCtrl", function( $scope, loginService, votingsService ){
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

    votingsService.loadVotingsMethod().then( function( votings ){
        $scope.votings = votings;
    }, function( votings ){
        alert( "Error:" );/*todo: to cangethat*/ 
    });
});