
// Will house information relevant to the user and the hiking trail
// Will perform tasks relevant to building a packing list

const tempForGloves = 3,
      tempForWarmHat = 5,
      tempForWarmCoat = 2,
      tempForWarmPants = 0,
      tempForShorts = 25,
      popForWaterproofShoes = 50,
      popForJacket = 40,
      popForPants = 70,
      cloudCoverageForSuncare = ["sunny", "fair", "mostly sunny"],
      highWindLevel = 25;

const requiredItems = [
    "2L+ Water",
    "Meal",
    "Snacks & extra food",
    "Map",
    "Compass",
    "First aid kit",
    "Knife/multitool",
    "Lighter/firestarter",
    "Flashlight/headlamp",
    "Backpack"
]

const optionalItems = [
    "Bug spray",
    "Toilet paper",
    "GPS",
    "Lip balm",
    "Blister treatment",
    "Camera",

]

class HikingProfile {

    constructor() {
        // Ask for
        this.gender = null;
        this.username = null;
        this.hikingLocation = null;
        this.date = null;
        this.trailType = null;
        this.requiredItems = requiredItems;
        this.optionalItems = optionalItems;
        // Generated
        this.generatedCorrectly = false;
        this.weather = null;
        this.clouds = null;
        this.pop = null;
        this.wind = null;
        this.minFeelsLike = null;
        this.maxFeelsLike = null;
        this.packingList = [];
    }

    resetGeneratedFields() {
        this.generatedCorrectly = false;
        this.weather = null;
        this.clouds = null;
        this.pop = null;
        this.wind = null;
        this.minFeelsLike = null;
        this.maxFeelsLike = null;
        this.packingList = [];
    }

    // Take location as [city, state], [city, country], zip code or lat/long coord
    // Date as YYYY-MM-DD
    // Updates class fields to reflect the weather at the target location & date
    generateWeatherInfo() {
        this.resetGeneratedFields();
        var loc = this.hikingLocation;
        var url = ["https://aerisweather1.p.rapidapi.com/forecasts/",
            loc,
            "?&format=json&filter=daynight&limit=14&fields=periods.dateTimeISO,periods.weather,",
            "periods.maxFeelslikeC,periods.pop,periods.minFeelslikeC,periods.windSpeedMaxKPH",
            "&client_id=CLIENT_ID&client_secret=CLIENT_SECRET"].join('');
        //url = "./StaticWeather.json"; //Testing with local json
        var targetDate = this.date+"T07:00";

        fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "6410c7d05cmsh7ac6db65b556335p1da092jsna484b7bebcdf",
                "x-rapidapi-host": "aerisweather1.p.rapidapi.com"
            }
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data)//Log the json response
            if (data.success == true && data.error == null) {
                console.log("Successful JSON");
                var periods = data.response[0].periods;
                // Iterate through each weather period searching for the target date
                // Once target date is found, set class fields
                for(var i = 0; i < periods.length; i++) {
                    var period = periods[i];
                    var periodDate = period.dateTimeISO.substring(0,16);
                    if(periodDate == targetDate) {
                        console.log(period);//Log the period to console
                        this.weather = period.weather;
                        if(this.weather.includes(" with")) {
                            this.clouds = this.weather.substring(0, this.weather.indexOf(" with"));
                        } else {
                            this.clouds = this.weather;
                        }
                        this.clouds = this.clouds.toLowerCase();
                        this.pop = period.pop;
                        this.wind = period.windSpeedMaxKPH;
                        this.minFeelsLike = period.minFeelslikeC;
                        this.maxFeelsLike = period.maxFeelslikeC;
                        this.generatedCorrectly = true;
                    }
                }
            }
          })
        .catch(err => {
            console.error(err);
        });

    }

    // Generates a list of items to pack and stores it in a class field
    generatePackingList() {
        // Shoes
        var shoes;
        if (this.trailType == "Rocky") {
            shoes = "Hiking boots";
        } else if (this.trailType == "Smooth") {
            shoes = "Hiking shoes";
        }
        if (this.pop >= popForWaterproofShoes) {
            shoes += " (water resistant)"
        }
        this.packingList.push(shoes);
        
        // Tops
        this.packingList.push("Short sleeve tee");
        this.packingList.push("Long sleeve tee");
        this.packingList.push("Lightweight jacket/fleece");
        if(this.wind >= highWindLevel && !(this.minFeelsLike <= tempForWarmCoat)
            && this.pop < popForJacket) {
            this.packingList.push("Windbreaker");
        }
        if(this.minFeelsLike <= tempForWarmCoat) {
            this.packingList.push("Warm jacket");
        }

        // Rainwear
        if(this.pop >= popForJacket) {
            this.packingList.push("Waterproof jacket");
        }
        if(this.pop >= popForPants) {
            this.packingList.push("Waterproof pants");
        }

        // Bottoms
        if(this.minFeelsLike <= tempForWarmPants) {
            this.packingList.push("Warm pants");
        } else if(this.maxFeelsLike >= tempForShorts) {
            this.packingList.push("Pants/shorts");
        } else {
            this.packingList.push("Pants");
        }

        // Hat
        if(this.minFeelsLike <= tempForWarmHat) {
            this.packingList.push("Warm hat");
        } else if(cloudCoverageForSuncare.includes(this.clouds)) {
            this.packingList.push("Sun hat");
        }

        // Gloves/gaiter
        if(this.minFeelsLike <= tempForGloves) {
            this.packingList.push("Gloves/mittens");
            this.packingList.push("Gaiter/scarf");
        }

        // Sun Care
        if(cloudCoverageForSuncare.includes(this.clouds)) {
            this.packingList.push("Sun glasses");
            this.packingList.push("Sunscreen");
        }
    }

    // Converts an array into string that's a bulleted list
    arrayToBulletList(arr) {
        var str = "• "+arr[0]+" •\n";
        for(var i = 1; i < arr.length; i++) {
            str += arr[i]+" •\n";
        }
        return str;
    }
    
    // Returns the custom packing list as a bulleted list (string)
    getCustomListString() {
        this.generatePackingList();
        return this.arrayToBulletList(this.packingList);
    }

    // Returns the required items as a series of bullets
    getRequiredListString() {
        return this.arrayToBulletList(this.requiredItems);
    }

    // Returns the optional items as a series of bullets
    getOptionalListString() {
        return this.arrayToBulletList(this.optionalItems);
    }

    // Returns info about the weather as a string
    getWeatherString() {
        var minC = this.minFeelsLike;
        var minF = this.celciusToFarenheit(minC);
        var maxC = this.maxFeelsLike;
        var maxF = this.celciusToFarenheit(maxC);
        var str = "It's forecast to be "+this.weather.toLowerCase()
        +", with a min feels like temp of "+minC+"C/"+minF+"F, "
        +"and a max feels like temp of "+maxC+"C/"+maxF+"F";
        return str;
    }

    celciusToFarenheit(celcius) {
        return Math.round((celcius * (9/5)) + 32);
    }

}

export default HikingProfile;