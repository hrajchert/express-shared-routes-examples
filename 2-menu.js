// Loading dependencies
var express = require('express'),
    app = express(),
    ECT = require('ect'),
    path = require('path'),
    RouteManager = require('express-shared-routes').RouteManager;

// Configure view engine
var ectRenderer = ECT({root: __dirname + '/views',ext: '.ect',watch: true});
app.engine('.ect', ectRenderer.render);

// Setup static files
app.use(express.static(path.join(__dirname, 'public')));

// ************************
// *       Routes         *
// ************************
// Note that in a real project, this would be organized different

// Creating the route manager
var routes = new RouteManager ({injectToLocals: 'route'});

// Expose the route manager to the views
app.all('*', function (req,res,next) {
    res.locals.routes = routes;
    next();
});

// Simplest way to add a named route. The object literal is the route, we reference it using
// the name, and re is the express compatible regular expression that handles the route
routes.get({name: "hello-all", re: '/hello'}, function(req, res){
    res.render('example2/hello-all.ect');
});

// Example of a middleware that can get stuff from database or in this
// case, modify the request
var getMyData = function(req, res, next) {
    req.msg = req.params.name.toUpperCase();
    next();
};

// This route shows how to call a list of middleware before invoking the handler
routes.get({
    name: "hello-person",
    re: '/:name',
    parent: routes.getRoute('hello-all'),
    mw: [getMyData],
    handler: function(req, res){
        res.render('example2/hello-person.ect',{msg: req.msg});
    }
});

// The routes only exists in the routes object, we add them to express by invoking the following
routes.applyRoutes(app);


app.listen(3000);
console.log('Listening on port 3000');