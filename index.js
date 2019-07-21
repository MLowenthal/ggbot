const Discord = require('discord.js');
const config = require('./config.json');
const colors = require('colors');
const smashgg = require('smashgg.js');
const client = new Discord.Client();
smashgg.initialize(config.ggtoken)
smashgg.setLogLevel('debug');
const {Tournament, Event, GGSet, Player, Phase, PhaseGroup} = smashgg;
//----------------------------------------------


var count = 0;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  ;
})

client.on('message', msg => {
		if (msg.author.bot){return;}//make sure bot doesnt respond to itself or another bot
		if(msg.content.indexOf(config.prefix) !== 0){return;} //make sure the command starts with the prefix
		
		
		if (msg.content.includes('https://smash.gg/tournament')) { //check for tournament url
			var user_input = msg.content.split(",")
		 
			if(user_input.length < 2){msg.reply('There are not enough inputs'); return;} // accounts for if someone doesnt put in enough inputs
		 
			//TODO have the bot tell you what inputs are missing 
		 
			var tag = user_input[0];
			var tournament_url = user_input[1];
			var tournament_inputs = tournament_url.split('/');
			
		 
		 //checks for valid tourney URL
			if(tournament_inputs.length < 5){msg.reply('Please enter the smash.gg tournament link that includes the tournament name'); return;}
			if(tournament_inputs[4] == ""){msg.reply('Please enter the smash.gg tournament link that includes the tournament name'); return;}
		 
			//set values for current queries tournamnent 
			let tournament_slug = tournament_inputs[4];
			let event_slug = tournament_inputs[6]; //TODO check this, what if no event slug

			//set values for event if present
			if(event_slug !== null && event_slug !== ""){
				let current_event_string = event_slug;
					(async function(){
						let queried_event = await Event.get(tournament_slug, current_event_string)
						console.log(queried_event);
						return true;
					})()
					
					
					//once we get the event, get incomplete sets, and then you can just search
					// for the first instance of the gamer tag
				
				
				/*
				let event_competitors = queried_event.getEntrants();
				for (var l in event_competitors){
					console.log(l + " tag");
				}
				*/
			}
			//TODO build out assumptions if the game type isn't provided in the URL	
		} 
		else{
			msg.reply('That is not a valid smash.gg tournament link')
			return true;
		}
})
client.login(config.token)