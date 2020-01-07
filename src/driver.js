const HTTPS = require('https'),
			config = require('./config.js');
      
function driver(items)
{
  
return items[Math.floor(Math.random()*items.length)];
     
}

var items = [Andy, Max, Christine, Amy, Zack, Aidan, Henry];
console.log(random_item(items));
}
exports.driver = items;
