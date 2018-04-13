app.controller( "votingsCtrl", function( $scope, loginService, votingsService ){
    $scope.isShowBtn = function(){
        return loginService.isLoginTenantCommitteeMemberMethod();
    }

    votingsService.loadVotingsMethod().then( function( votings ){
        $scope.votings = votings;
    }, function( votings ){
        alert( "Error:" );/*todo: to cangethat*/ 
    });
});