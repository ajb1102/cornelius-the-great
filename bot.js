var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function insult() {
var collumn1= [
"artless",
"bawdy",
"beslubbering",
"bootless",
"churlish",
"cockered",
"clouted",
"craven",
"currish",
"dankish",
"dissembling",
"droning",
"errant",
"fawning",
"fobbing",
"froward",
"frothy",
"gleeking",
"goatish",
"gorbellied",
"impertinent",
"infectious",
"jarring",
"loggerheaded",
"lumpish",
"mammering",
"mangled",
"mewling",
"paunchy",
"pribbling",
"puking",
"puny",
"qualling",
"rank",
"reeky",
"roguish",
"ruttish",
"saucy",
"spleeny",
"spongy",
"surly",
"tottering",
"unmuzzled",
"vain",
"venomed",
"villainous",
"warped",
"wayward",
"weedy",
"yeasty"
];
 var c1 = collumn1[Math.floor(Math.random() * collumn1.length)];

	var collumn2= [
"base-court",
"bat-fowling",
"beef-witted",
"beetle-headed",
"boil-brained",
"clapper-clawed",
"clay-brained",
"common-kissing",
"crook-pated",
"dismal-dreaming",
"dizzy-eyed",
"doghearted",
"dread-bolted",
"earth-vexing",
"elf-skinned",
"fat-kidneyed",
"fen-sucked",
"flap-mouthed",
"fly-bitten",
"folly-fallen",
"fool-born",
"full-gorged",
"guts-griping",
"half-faced",
"hasty-witted",
"hedge-born",
"hell-hated",
"idle-headed",
"ill-breeding",
"ill-nurtured",
"knotty-pated",
"milk-livered",
"motley-minded",
"onion-eyed",
"plume-plucked",
"pottle-deep",
"pox-marked",
"reeling-ripe",
"rough-hewn",
"rude-growing",
"rump-fed",
"shard-borne",
"sheep-biting",
"spur-galled",
"swag-bellied",
"tardy-gaited",
"tickle-brained",
"toad-spotted",
"unchin-snouted",
"weather-bitten"
];
 var c2 = collumn2[Math.floor(Math.random() * collumn2.length)];

/////////////////

var collumn3= [
"apple-john",
"baggage",
"barnacle",
"bladder",
"boar-pig",
"bugbear",
"bum-bailey",
"canker-blossom",
"clack-dish",
"clotpole",
"coxcomb",
"codpiece",
"death-token",
"dewberry",
"flap-dragon",
"flax-wench",
"flirt-gill",
"foot-licker",
"fustilarian",
"giglet",
"gudgeon",
"haggard",
"harpy",
"hedge-pig",
"horn-beast",
"hugger-mugger",
"joithead",
"lewdster",
"lout",
"maggot-pie",
"malt-worm",
"mammet",
"measle",
"minnow",
"miscreant",
"moldwarp",
"mumble-news",
"nut-hook",
"pigeon-egg",
"pignut",
"puttock",
"pumpion",
"ratsbane",
"scut",
"skainsmate",
"strumpet",
"varlot",
"vassal",
"whey-face",
"wagtail"
];
 var c3 = collumn3[Math.floor(Math.random() * collumn3.length)];

var insults = "Shut up you " + c1 + " " + c2 + " " + c3 + "!";
	return insults;
}
	
}

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
