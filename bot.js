var HTTPS = require('https'),
    cool = require('cool-ascii-faces'),
    mention = require('./mention.js'),
    botID = process.env.BOT_ID,
    insult = require('./insult.js');

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
		botRegex = /test$/;
      //botRegex = /^\/cool guy$/; //old parsing for "/cool guy"

  if(request.text && botRegex.test(request.text)) { //tests if text = sample text
    this.res.writeHead(200); //200=all is well, 404=not OK
    postMessage(); //posts message
    this.res.end(); //ends posting message
  } else {
    console.log("don't care");
    this.res.writeHead(200); 
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;


	botResponse = insult();
  //botResponse = cool();
	
	// else if (msg.search(/good boy/i) != -1) { taken from sample
	//	botResponse = 'I AM!';} taken from sample

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
