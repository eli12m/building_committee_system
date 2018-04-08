app.factory( "messagesService", function( dateService ){
    var messages = [];
    var message1 = null;
    var message2 = null;
    var message3 = null;
    var counter  = 0;

    function Message( title, creationDate, img, details, priority )
    {
        counter++;

        this.id                = counter;
        this.title             = title;
        this.creationDate      = new Date( creationDate );
        this.img               = img;
        this.details           = details;
        this.priority          = priority;
        this.getId             = function(){ return this.id; }
        this.getCreationDate   = function(){ return this.creationDate; }
        this.getImg            = function(){ return this.img; }
        this.setImg            = function( img ){ this.img = img; }
        this.getPriority       = function(){ return this.priority; }
        this.setPriority       = function( priority ){ this.priority = priority;}
        this.getTitle          = function(){ return this.title; }
        this.setTitle          = function( title ){ this.title = title; }
        this.getDetails        = function(){ return this.details; }
        this.setDetails        = function( details ){ this.details = details; }
        this.isTitleIncludeStr = function( str )
        {  
            var title = this.getTitle();

            return title.toUpperCase().includes( str.toUpperCase() );
        }
        this.isDetailsIncludeStr = function( str )
        {
            var details = this.getDetails();

            return details.toUpperCase().includes( str.toUpperCase() );
        }
    }

    function rmvMessageFunc( message )
    {
        var id         = message.getId();
        var i          = 0;
        var idx_to_rmv = -1;

        for( i = 0; i < messages.length; i++ )
        {
            if( id === messages[i].getId() )
            {
                idx_to_rmv = i;
                break;
            }
        }

        if( idx_to_rmv > -1 )
        {
            messages.splice( idx_to_rmv, 1 );  
        }
    }

    function crtNewMessageFunc( messageTitle, messageDetails, messagePriority, messageImage )
    {
        var newMsg   = null;
        var todayStr = "";
        
        todayStr = dateService.getCurDateyyyymmddMethod();

        newMsg = new Message( messageTitle, todayStr, messageImage, messageDetails, messagePriority );

        messages.push( newMsg );
    }

    function updMessageFunc( message, messageTitle, messageDetails, messagePriority, messageImage )
    {
        if( message != null )
        {
            message.setTitle( messageTitle );
            message.setDetails( messageDetails );
            message.setPriority( messagePriority );
            message.setImg( messageImage );
        }
    }

    message1 = new Message( "New classes in the gym", "2018-03-14", "/assets/images/messages/gym.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Information" );
    message2 = new Message( "Dont step on the grass!", "2018-02-01", "/assets/images/messages/grass.jpeg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Important" );
    message3 = new Message( "Closing the pool for maintanence", "2018-01-08", "/assets/images/messages/pool.jpg", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "Information" );

    messages.push( message1 );
    messages.push( message2 );
    messages.push( message3 );

    return{
        messagesProp: messages,
        rmvMessageMethod: rmvMessageFunc,
        createNewMessageMethod: crtNewMessageFunc,
        updateMessageMethod: updMessageFunc
    };
});