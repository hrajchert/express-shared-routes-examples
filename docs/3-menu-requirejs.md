# Menu Example With RequireJS

This example shows you how to use the library with RequireJS. It buils on top of the [Menu Example](2-menu.md) by just adding the necesary code to use RequireJS.

It is recommended that you read the [Menu Example](2-menu.md) first.

### File Structure

This are the files needed to make this example. The <b>bolded links</b> highlight the difference between the second and third example.

* [3-menu-requirejs.js](../3-menu-requirejs.js)
* public
   * js
      * routeManager.min.js
      * <b>require.js</b>
      * <b>[example3-requirejs.js](../public/js/example3-requirejs.js)</b>
* views
   * example3
      * [_route-info.ect](../views/example3/_route-info.ect)
      * [hello-all.ect](../views/example3/hello-all.ect)
      * [hello-person.ect](../views/example3/hello-person.ect)
      * <b>[layout.ect](../views/example3/layout.ect)</b>

The file `require.js` is the actual library downloaded from the site. We moved the client side logic out of the [layout.ect](../views/example3/layout.ect), and into [example3-requirejs.js](../public/js/example3-requirejs.js), with the proper configuration.

### What's different?

In the layout we've removed the client side logic of the button, but still need to export the routes, so we've changed the initial `<script>` tag with this:

```rhtml
<script type="text/javascript">
// Export the routes as a global variable.
var exported_routes = <%- JSON.stringify(@routes.exportRoutes()) %>;
</script>
```

The `exported_routes` is a map of the routes, remember that each route is an <i>Object Literal</i>. We may add the option to fetch the routes from an AJAX call later.

At the bottom we include RequireJS, indicating that it should open [example3-requirejs.js](../public/js/example3-requirejs.js) on load.

```rhtml
<script data-main="js/example3-requirejs" src="js/require.js"></script>
```

That main file contains the RequireJS configuration and the logic to greet somebody in the client side.

```js
require.config({
    baseUrl: "/js",
    paths: {
        RouteManager: 'routeManager.min',
  }
});

require(["RouteManager"], function(RouteManager) {
    var routes = new RouteManager(exported_routes);
    // the same logic of the second example
    // ...
});
```

It's <b>very important</b> that you use <b>RouteManager</b> as the library name because it was named like that when constructing it using UMD.

And thats it.

Tadam!