#targetengine 'Sample Script Menu Action'
 
var newMenuTitle = "Sample Script Menu Action";
 
// Create the Script Menu Action (SMA)
var newMenu = app.scriptMenuActions.add(newMenuTitle);
 
// Add an Event Listener
newMenu.addEventListener(
    /*event type*/   'onInvoke',
    /*event handler*/ function(){alert('Hello World!');}
    );
 
// Create a new menu item in the Help submenu
var mnu = app.menus.item("$ID/Main").submenus.item("$ID/&Eki");
mnu.menuItems.add(newMenu);