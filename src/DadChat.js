import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import DadChatSupport from './DadChatSupport';
import HikingProfile from './HikingProfile';


// { // Custom component
          //   id: "test",
          //   component: (
          //     <div style={{fontFamily: "Serif", fontStyle: "italic"}}>This is an example component</div>
          //   ),
          //   trigger: 'test2'
          // },

class DadChat extends Component{
  
  constructor(props) {
    super(props)
    this.dadChatSupport = new DadChatSupport();
    this.hikingProfile = new HikingProfile();
  }

  render() {
    return(
      <ChatBot
        headerTitle={'Dad'}
        hideBotAvatar={true}
        hideUserAvatar={true}
        userDelay={150}
        botDelay={1000}
        steps={[
          {
            id: '1',
            message: 'Damnit, I\'m not wearing my contacts. Which one of my kids are you?',
            trigger: 'gender',
          },
          {
            id: 'gender', // Determine gender
            options: [
              { value: "son", label: 'Your son', trigger: () => {
                this.hikingProfile.gender = "son";
                return '2'
              } },
              { value: "daughter", label: 'Your daughter', trigger: () => {
                this.hikingProfile.gender = "daughter";
                return '2'
              } },
              { value: "kid", label: 'Your child', trigger: () => {
                this.hikingProfile.gender = "kid";
                return '2'
              } },
            ],
          },
          {
            id: '2',
            message: 'Of course! Wait, err... uhh... what\'s your name again?',
            trigger: 'name',
          },
          {
            id: 'name', // Determine name
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: (last) => {
              this.hikingProfile.username = last.previousValue;
              return "I can\'t believe I forgot your name! Don't tell your mom about this..."},
            delay: 1100,
            trigger: 'tell-mom-options',
          },
          {
            id: 'tell-mom-options',
            options: [
              { value: "tell joke", label: 'Only if you tell me a joke', trigger: 'hear-joke'},
              { value: "tell mom", label: 'I\'m telling Mom', trigger: 'tell-mom'},
              { value: "go hiking", label: 'Only if we can go hiking together', trigger: 'hiking-yes'},
            ],
          },
          {
            id: 'hear-joke',
            message: () => {return "I'm so glad you wanted to hear a joke "+this.hikingProfile.username+"!"},
            trigger: 'joke1'
          },
          {
            id: 'joke1',
            message: () => {return this.dadChatSupport.randomJoke("laugh1", "no-laughing-options")},
            delay: 1500, 
            trigger: () => {return this.dadChatSupport.nextStep} 
          },
          {
            id: 'laugh1',
            message: () => {
              var randInt = Math.floor(Math.random() * this.dadChatSupport.laughingToSelf.length);
              return this.dadChatSupport.laughingToSelf[randInt]
            },
            delay: 2000,
            trigger: 'no-laughing'
          },
          {
            id: 'no-laughing',
            message: "...why aren't you laughing?",
            delay: 1500,
            trigger: 'no-laughing-options'
          },
          {
            id: 'no-laughing-options',
            options: [
              { value: "hate", label: "I hate you", trigger: "hate-you"},
              { value: "hike", label: "I'd rather go hiking with you than listen to you", trigger: "hiking-yes"},
              { value: "again", label: "It just wasn't funny, tell me another one", trigger: "joke1"}
            ]
          },
          {
            id: "hate-you",
            message: "Dad's have feelings too y'know",
            delay: 2000,
            trigger: 'hurt-dad'
          },
          {
            id: "hurt-dad",
            options: [
              { value: "apology", label: "I'm sorry Dad", trigger: "apology-response"}
            ],
          },
          {
            id: "apology-response",
            message: "Hi 'sorry Dad', I'm regular Dad",
            trigger: 'hiking-question'
          },
          {
            id: 'tell-mom',
            message: "Hi 'telling Mom', I'm Dad",
            trigger: 'hiking-question'
          },
          {///////////////////// Ask about Hiking ////////////////////
            id: 'hiking-question',
            message: "It's been a while since we've spent some quality time together, kiddo. How about we go hiking soon?",
            delay: 1400,
            trigger: "hiking-answer"
          },
          {
            id: "hiking-answer",
            options: [
              { value: "yes", label: "It really has been a long time, sounds like a great idea", trigger: "hiking-yes"},
              { value: "no", label: "I'd rather not, you haven't been a great father to me", trigger: "hiking-no"}
            ]
          },
          {
            id: 'hiking-no',
            message: "I'm literally a chatbot made for a Hackathon about beans. Let me repeat myself...",
            trigger: "hiking-question"
          },
          { ///////////////////// Confirmed Hiking //////////////////////
            id: 'hiking-yes',
            message: () => {return "Sweet! I can't wait to go hiking with my "+this.hikingProfile.gender},
            trigger: "location?"
          },
          {
            id: "location?",
            message: "Where abouts did you wanna go?",
            trigger: "location-tips"
          },
          {
            id: "location-tips",
            component: (
              <div style={{fontFamily: "Georgia", textAlign:"center", color:"#4a4a4a"}}>
                Please enter the location as [city, state], [city, country], zip code or lat/long coord
              </div>
            ),
            delay: 150,
            trigger: "user-location"
          },
          {
            id: "user-location",
            user: true,
            trigger: "location-response"
          },
          {
            id: "location-response",
            message: (last) => {
              this.hikingProfile.hikingLocation = last.previousValue;
              var randInt = Math.floor(Math.random() * this.dadChatSupport.locationResponse.length);
              return this.dadChatSupport.locationResponse[randInt]
            },
            trigger: "trail-question"
          },
          {
            id: "trail-question",
            message: () => {
              var randInt = Math.floor(Math.random() * this.dadChatSupport.painPhrase.length);
              return "You know what kind of trail it is? "+this.dadChatSupport.painPhrase[randInt]+" so I gotta pick the right shoes"
            },
            trigger: "trail-options"
          },
          {
            id: "trail-options",
            options: [
              { value: "rocky", label: "Rocky", trigger: "rocky-trail"},
              { value: "smooth", label: "Smooth", trigger: "smooth-trail"}
            ]
          },
          {
            id: "rocky-trail",
            message: () => {
              this.hikingProfile.trailType = "Rocky";
              return "And when did you wanna go?"
            },
            trigger: "date-details"
          },
          {
            id: "smooth-trail",
            message: () => {
              this.hikingProfile.trailType = "Smooth";
              return "And when did you wanna go?"
            },
            trigger: "date-details"
          },
          {
            id: "date-details",
            component: (
              <div style={{fontFamily: "Georgia", textAlign:"center", color:"#4a4a4a"}}>
                Please enter the date of hike (within 7 days of today) in this format: <div style={{ fontWeight: 'bold' }}>YYYY-MM-DD</div>
              </div>
            ),
            delay: 150,
            trigger: "date"
          },
          {
            id: "date",
            user: true,
            validator: (value) => {
              try {
                parseInt(value.substring(0,4));
                parseInt(value.substring(6, 8));
                parseInt(value.substring(10));
              } catch(error) {
                return "Make sure it's YYYY-MM-DD";
              }
              this.hikingProfile.date = value;
              return true
            },
            trigger: "packing-list"
          },/////////////////////End Collecting Important Info///////////////////
          {
            id: "packing-list",
            message: "I can make you a packing list if you want? I always gotta make one for myself",
            trigger: "packing-list-options"
          },
          {
            id: "packing-list-options",
            options: [
              { value: "yes", label: "Sure thing!", trigger: "yes-packing-list"},
              { value: "no", label: "I think I can do it myself", trigger: "no-packing-list"}
            ]
          },
          {
            id: 'are-you-sure-options',
            options: [
              { value: "yes", label: "I'm sure", trigger: 'no-packing-list'},
              { value: "no", label: "On second thought...", trigger: 'yes-packing-list'},
            ],
          },
          {
            id: 'no-packing-list',
            message: () => {return this.dadChatSupport.randomAffirming("are-you-sure-options", "yes-packing-list")},
            delay: 750, 
            trigger: () => {return this.dadChatSupport.nextStep} 
          },
          {
            id: "yes-packing-list",
            message: () => {
              this.hikingProfile.generateWeatherInfo();
              return "Alright! Here it is, everything should be included"
            },
            trigger: "clothing-title"
          },///////////////////////Packing Lists//////////////////////////
          {
            id: "clothing-title",
            message: () => {
              if (this.hikingProfile.generatedCorrectly) {
                this.dadChatSupport.nextStep = "clothing";
                return "Clothes and Accessories"
              } else {
                this.dadChatSupport.nextStep = "location?";
                return "Hmmm, I can't seem to find that place. Let's try again "+this.hikingProfile.gender
              }
            },
            delay: 1200,
            trigger: () => {return this.dadChatSupport.nextStep}
          },
          {
            id: "clothing",
            message: () => {
              // console.log(this.hikingProfile.weather);
              // console.log(this.hikingProfile.clouds);
              // console.log(this.hikingProfile.maxFeelsLike);
              // console.log(this.hikingProfile.minFeelsLike);
              // console.log(this.hikingProfile.pop);
              return this.hikingProfile.getCustomListString()
            },
            trigger: "extra-items-title"
          },
          {
            id: "extra-items-title",
            message: "Extra Items",
            delay: 2000,
            trigger: "extra-items"
          },
          {
            id: "extra-items",
            message: () => {return this.hikingProfile.getRequiredListString()},
            trigger: "optional-items-title"
          },
          {
            id: "optional-items-title",
            message: "Optional Items",
            delay: 2000,
            trigger: "optional-items"
          },
          {
            id: "optional-items",
            message: () => {return this.hikingProfile.getOptionalListString()},
            trigger: "weather-title"
          },
          {
            id: "weather-title",
            message: "Weather",
            delay: 2000,
            trigger: "weather"
          },
          {
            id: "weather",
            message: () => {return this.hikingProfile.getWeatherString()},
            trigger: "make-new-list"
          },
          {
            id: "make-new-list",
            message: "These are all loose suggestions not me telling you how to dress. Don't want a repeat of last halloween. If you want I can make you a new list, just need a new time, place, and trail type!",
            delay: 3000,
            trigger: "new-list-options"
          },
          {
            id: "new-list-options",
            options: [
              { value: "yes", label:"Yeah, I do need a new list", trigger:"location?"},
              { value: "no", label:"Nah, I'm alright", trigger: "sorted"}
            ]
          },
          {
            id: "sorted",
            message: "Now that your list is sorted, you wanna hear a joke?",
            trigger: "joke2-options"
          },
          {
            id: "joke2-options",
            options: [
              { value: "yes", label: "Sure", trigger: "joke2"},
              { value: "no", label: "Nah", trigger: "done"}
            ]
          },
          {
            id: 'joke2',
            message: () => {return this.dadChatSupport.randomJoke("laugh2", "joke2-again-options")},
            delay: 1500, 
            trigger: () => {return this.dadChatSupport.nextStep} 
          },
          {
            id: 'laugh2',
            message: () => {
              var randInt = Math.floor(Math.random() * this.dadChatSupport.laughingToSelf.length);
              return this.dadChatSupport.laughingToSelf[randInt]
            },
            delay: 2000,
            trigger: 'joke2-again'
          },
          {
            id: 'joke2-again',
            message: "Wanna hear another?",
            delay: 1500,
            trigger: 'joke2-again-options'
          },
          {
            id: 'joke2-again-options',
            options: [
              { value: "no", label: "No more jokes for me", trigger: "done"},
              { value: "yes", label: "Keep em coming", trigger: "joke2"}
            ]
          },
          {
            id: "done",
            message: "Well alright then. We should make sure to tell your mom or your friends the plans about the hike",
            trigger: "done2"
          },
          {
            id: "done2",
            message: "I'm really looking forward to it",
            trigger: "ending"
          },
          {
            id: "ending",
            options: [
              {value: "end", label: "Me too", trigger: ""},
            ],
            trigger: "fin"
          },
          {
            id: "fin",
            message: "I'll see you then!",
            end: true
          }

        ]}
      />
    )
  }
}

export default DadChat;