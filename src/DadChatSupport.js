
class DadChatSupport {

    //TODO: Random Joke
    //      Random Exclamation
    //      Other random bits of text as needed
    //      Possibly 

    nextStep = "";
    oneLiners = [
        "Two men walk into a bar, the third one ducked",
        'Two cannibals are eating a clown, one says to the other, \"does this taste funny to you\"',
        "If you spell the words \“Absolutely Nothing\” backwards, you get \“Gnihton Yletulosba,\” which ironically means absolutely nothing",
        'My wife accused me of hating her family after I said "I like your mother-in-law more a lot better than I like mine"',
        "The man who invented velcro died today :( RIP",
        "The pig was covered in ink since he lives in a pen",
        "My winter fat is gone! Now I have spring rolls",
        "Never date a tennis player, love means nothing to them",
        'My wife asked me if I\'ve seen the dog bowl. I said "I didn\'t know he could"',
        "My wife told me to put ketchup on the shopping list. Now I can't see anything",
        "A blind man walks into a bar... and then a table... and then a chair"
    ]

    locationResponse = [
        "Oh, I think I was there back in '84",
        "I think that's where we concieved you. You've grown so much since then"
    ];

    painPhrase = [
        "My sciatica has been flaring up",
        "My knees have been killing me recently"
    ]

    laughingToSelf = [
        "Hahaha, that one just cracks me up",
        "*Wheezes*",
        "*Sneezes violently*",
        "What a knee slapper",
        "Now that's what I call funny!",
        "Heh"
    ]

    affirming = [
        "Are you SURE sure?",
        "Are you 100% certain?",
        "Can I pursuade you to change your mind?"
    ]

    constructor() {
        this.oneLiners = this.shuffle(this.oneLiners);
        this.affirming = this.shuffle(this.affirming);
    }

    randomJoke(successfulJokeStep, unsuccessfulJokeStep) {
        if(this.oneLiners.length == 0) {
            this.nextStep = unsuccessfulJokeStep;
            return "I don't know any more jokes..."
        } else {
            this.nextStep = successfulJokeStep;
            return this.oneLiners.pop();
        }
    }

    randomAffirming(successfulStep, unsuccessfulStep) {
        if(this.affirming.length == 0) {
            this.nextStep = unsuccessfulStep;
            return "Well... I'm gonna make you a packing list anyway"
        } else {
            this.nextStep = successfulStep
            return this.affirming.pop();
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
}

export default DadChatSupport;