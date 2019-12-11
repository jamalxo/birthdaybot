var Discord = require('discord.io');
var auth = require('./auth.json');
<<<<<<< HEAD
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
=======
const https = require('https');
const cron = require('cron');


function Person(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}

var persons = [
    new Person("Jabbz", new Date('January 13, 1997')),
    new Person("Gunnar", new Date('January 14, 1997')),
    new Person("Biryu", new Date('January 18, 1995'))
];


>>>>>>> changed to birthday bot
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            case 'info':
                bot.sendMessage({
                    to: channelID,
                    message: 'Use !addBirthday "Name MM-DD-YYYY" to add a birthday'
                });

                break;
            case 'addBirthday':
                bot.sendMessage({
                    to: channelID,
                    message: 'Doesnt work yet lol'
                });
                break;
            case 'birthdayToday':
                sendBirthday()
                break;
            case 'nextBirthday':
                sendNextBirthday()
                break;
            case 'commands':
                bot.sendMessage({
                    to: channelID,
                    message: '!addBirthday !birthdayToday !nextBirthday'
                });
                break;
            case '':
        }
    }
});

let scheduledMessage = new cron.CronJob('0 14 *	* *', () => {
    sendBirthday()
});

function sendBirthday() {
    let channels = bot.channels;

    var today = new Date();

    const results = persons.filter(person => (person.birthday.getMonth() === today.getMonth() && person.birthday.getDate() === today.getDate()));
    console.log(results)
    if (results.length > 0) {
        for (channel in channels) {
            results.forEach(function (entry) {
                bot.sendMessage({
                    to: channel, //"628292888849154049",
                    message: entry.name + " has his/her birthday today. Congratulate them :)"
                })
            });
        }
    } else {
        for (channel in channels) {
            bot.sendMessage({
                to: channel, //"628292888849154049",
                message: 'No one has a birthday today :('
            })
        }
    }
}

function sendNextBirthday() {
    let channels = bot.channels;

    var today = new Date();

    const nextBirthdays = persons.map(
        person => {
            console.log(person.birthday.getMonth())
            if (person.birthday.getMonth() < today.getMonth()) {
                person.birthday.setFullYear(today.getFullYear() + 1)
                return person
            } else if (person.birthday.getMonth() == today.getMonth()) {
                if (person.birthday.getDate() <= today.getDate()) {
                    person.birthday.setFullYear(today.getFullYear() + 1)
                    return person
                } else {
                    person.birthday.setFullYear(today.getFullYear())
                    return person
                }
            } else {
                person.birthday.setFullYear(today.getFullYear())
            }
        }
    )

    nextBirthdays.sort(function (a, b) {
        return (a.birthday - today) - (b.birthday - today)
    });

    //for (channel in channels) {
        bot.sendMessage({
            to: "620252940086542338",//channel, //"628292888849154049",
            message: "**" + nextBirthdays[0].name + "** has his/her birthday next :partying_face: :partying_face: :partying_face:. At: " + nextBirthdays[0].birthday.toLocaleDateString()
        })
    //}
}

// When you want to start it, use:
scheduledMessage.start()