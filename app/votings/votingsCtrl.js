app.controller( "votingsCtrl", function( $scope, loginService ){
    $scope.isShowBtn = function(){
        return loginService.isLoginTenantCommitteeMemberMethod();
    }
});