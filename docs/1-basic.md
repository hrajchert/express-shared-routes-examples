# Basic Example

This is a very basic example use of [Express Shared Routes](https://github.com/hrajchert/express-shared-routes), and its intended to show how to bootstrap the library and explain the core elements.

The example creates a handler that responds to the following route `/hello/:name`. Once accessed, it will greet the person
by `:name`, and show you a link to greet somebody else.

To see more examples go [here](../README.md)

#### Install
Installing is quite simple, just run the following in your project's root folder.

```
npm install express-shared-routes --save
```


#### The code

Before reading the explanation, we recommend to take a look at the [code](../1-basic.js) (it's only 19 lines of code).

Ok, so lets go down to business. First we need to require the libraries and instantiate express.

```js
var express = require('express');
var app = express();
var RouteManager = require('express-shared-routes').RouteManager;
```

Then we instantiate the <b>RouteManager</b>. This object will contain all the routes we define.

```js
var routes = new RouteManager();
```

The routes are defined very similar like express does. Instead of calling `app.VERB(path,callback)`, we call `routes.VERB(route,callback)`. Where `VERB` can be `get`, `post` or `put`.

```js
routes.get({name: "named-hello", re: '/hello/:name'}, function(req, res){
    ...
});
```

The route is an <i>object literal</i> that <b>must</b> contain at least a `name` and a express regular expression `re`.

Inside the route, we are going to greet the current person and create a link to greet <i>Handsome</i>
```js
routes.get({name: "named-hello", re: '/hello/:name'}, function(req, res){
    // Soft coded link
    var href = routes.getLink ('named-hello', {name: 'Handsome'});

    var response = "Hello " + req.param('name');
    response += " <a href='"+ href + "'>Link</a>";
    res.send(response);
});
```

In the first line of the handler we create a `href` to greet <i>Handsome</i>, in this case `/hello/Handsome`. To do so, we ask  the <b>RouteManager</b> to
get us the link for the route named `named-hello` and we pass an object with the property `name`. That property is needed because
the route is defined with the placeholder `:name`.

If we ended the example here, our route wouldn't be added. Thats because the library tries to be unobtrusive. So far all we have done is to mark our intention to add the routes, to actually add them into express we need to call this

```js
routes.applyRoutes(app);
```

Which will call app.VERB for all routes defined, just like you would.

#### A note on the RouteManager internals
The <b>RouteManager</b> saves the <b>Routes</b> in two data structures:

* A map which key is the name of the route
* A list that preserves the order of inclusion

The map is for fast access of the routes when calling stuff like `routes.getLink`. The map is also used to export the routes to the client side (see the [second example](2-menu.md)).

The list is stored only for the `routes.applyRoutes`, so we can insert the routes in the same order they where defined.