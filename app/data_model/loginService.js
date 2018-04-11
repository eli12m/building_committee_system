app.factory( "loginService", function( $http, $q, tenantsService ){

    var activeTenant = null;

    function setActiveTenantFunc( tenantObj )
    {
        activeTenant = tenantObj;
    }
    
    return{
        setActiveTenantMethod: setActiveTenantFunc
    };
});