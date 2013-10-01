require.config({
    baseUrl: "/js",
    paths: {
        RouteManager: 'routeManager.min',
  }
});

require(["RouteManager"], function(RouteManager) {
    var routes = new RouteManager(exported_routes);
    // Handle the say hello onclick event
    var sayHelloButton = document.getElementById("sayHello");
    sayHelloButton.onclick = function() {
        // Get the name of the person to say hello to
        var inputName = document.getElementById("person_name").value;
        // Display the link to say hello!
        alert(routes.getLink('hello-person',{name: inputName}));
        return false;
    };
});