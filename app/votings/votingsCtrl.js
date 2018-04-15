app.controller( "votingsCtrl", function( $scope, loginService, votingsService ){
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

    votingsService.loadVotingsMethod().then( function( votings ){
        $scope.votings = votings;
    }, function( votings ){
        alert( "Error:" );/*todo: to cangethat*/ 
    });
});