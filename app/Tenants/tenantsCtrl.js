app.controller( "tenantsCtrl", function( $scope ){
    var tenantToDel                              = null;
    var tenantToUpd                              = null;
    $scope.filterMessagesByTitleAndDetailFunc = function( message ){
        var res = false;
        var str = $scope.filterTenantInput;

        res = message.isTitleIncludeStr( str ) || message.isDetailsIncludeStr( str );

        return res;
    };
    $scope.setMessageForRmvFunc = function( message ){
        msgToDel = message;
    };
    $scope.removeMessageFunc = function(){
        if( msgToDel != null )
        {
            messagesService.rmvMessageMethod( msgToDel );

            msgToDel = "";
        }
    }
    $scope.cancelMsgFunc = function(){
        initInputsMessage();
    };
    $scope.createMessageFunc = function(){
        messagesService.createNewMessageMethod( $scope.messageTitleInput, $scope.messageDetailsInput, $scope.messagePriorityInput, $scope.messageImageInput );
        initInputsMessage();
    };
    $scope.fillInputsForUpdFunc = function( message ){
        $scope.messageTitleInput    = message.getTitle();
        $scope.messageDetailsInput  = message.getDetails();
        $scope.messagePriorityInput = message.getPriority();
        $scope.messageImageInput    = message.getImg();
        msgToUpd                    = message;
    };
    $scope.updateMessageFunc = function(){
        messagesService.updateMessageMethod( msgToUpd, $scope.messageTitleInput, $scope.messageDetailsInput, $scope.messagePriorityInput, $scope.messageImageInput );
        initInputsMessage();

        msgToUpd = "";
    };

    $scope.filterInTitleDetailsInput = "";
    $scope.orderByInput              = "creationDate";

    messagesService.loadMessagesMethod().then( function( messages ){
        $scope.messages = messages;
    }, function( messages ){
        alert( "Error:" ); 
    });

    function initInputsMessage(){
        $scope.messageTitleInput         = "";
        $scope.messageDetailsInput       = "";
        $scope.messagePriorityInput      = "Important";
        $scope.messageImageInput         = ""; 
    }

    initInputsMessage();
});