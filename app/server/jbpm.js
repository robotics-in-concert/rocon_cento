var auth = "krisv:krisv"
var server_address = process.env.DROOLS_URL;
var default_url = server_address+'/drools-guvnor/rest/packages';
Meteor.methods({
    drools_url : function(){
        console.log('[DROOLS_URL]',server_address);
        return server_address;
    },
    drools_get : function(call_url){
        url = default_url+call_url;
        console.log('[GET]', url);
        var result = Meteor.http.call("GET", 
                                      url,
                                      {auth:auth,
                                       headers:{"content-type":"application/json"}, 
                                      });
        return result;
    },
    drools_post : function(call_url,call_header,call_data){
        header = {"Content-Type":"application/octet-stream",}
        console.log("call_header: ",call_header);
        for(i = 0 ; i < Object.keys(call_header).length; i++){
            var key = Object.keys(call_header)[i];
            header[key] = call_header[key];
        }
        
        url = default_url+call_url;
        console.log('[POST]', url);
        
        var result = Meteor.http.call("POST", 
                                      url,
                                      {auth:auth,
                                       headers:header, 
                                       content:call_data
                                      });
        return result;
    },
    drools_put : function(){
        url = default_url+call_url;
        console.log('[POST]', url);
    },
    drools_delete : function(call_url, call_auth, data){   

        url = default_url+call_url;
        console.log('[DELETE]', url);
        
        var result = Meteor.http.call("DELETE", 
                                      url,
                                      {auth:auth,
                                      });
        return result;
    }
});
