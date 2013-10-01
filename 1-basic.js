// Loading dependencies
var express = require('express');
var app = express();
var RouteManager = require('express-shared-routes').RouteManager;

var routes = new RouteManager();

routes.get({name: "named-hello", re: '/hello/:name'}, function(req, res){
    // Soft coded link
    var href = routes.getLink ('named-hello', {name: 'Handsome'});

    var response = "Hello " + req.param('name');
    response += " <a href='"+ href + "'>Link</a>";
    res.send(response);
});

routes.applyRoutes(app);

app.listen(3000);