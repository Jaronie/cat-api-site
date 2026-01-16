/*
    This file contains all JavaScript code
    for interacting with the remove Web API
    provided by https://thecatapi.com/.

    Author: Jaron Bautista
    File: script.js
    Date: 12/04/23
 */
window.onload = () => {

    let button = document.getElementById("breed-info");
    let bottomSection = document.querySelector("#bottom");
    button.onclick = catBreed;

    let url = `https://api.thecatapi.com/v1/breeds/`;
    let config = {
        method: "get",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_03d7HArg3QPh5kRIq3nocUD0V4QKAXXAxRpQNCipnysL7m26JuZ75VoKdTGKaxbb"

        }


    }

;




//breeds
    function catBreed() {

        //breed details
        let name = document.querySelector("#name");
        let desc = document.querySelector("#description");
        let orig = document.querySelector("#origin");
        let life_s = document.querySelector("#life-span");
        let child_f = document.querySelector("#child-friendly");
        let dog_f = document.querySelector("#dog-friendly");
        let energyLevel = document.querySelector("#energy-level");
        let socialNeeds = document.querySelector("#social-needs");
        let wiki = document.querySelector("#wiki");

        //breed data (retrieving id, renaming all necessary elements)
        let select = document.querySelector("#breeds");
        let select_value = select.value;
        console.log(select_value);


        //config/request using fetch (breeds)
        let url = `https://api.thecatapi.com/v1/breeds/${select_value}`;
        let config = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_03d7HArg3QPh5kRIq3nocUD0V4QKAXXAxRpQNCipnysL7m26JuZ75VoKdTGKaxbb"

            }

        }
        fetch(url, config).then(function (response) {

            //json conversion
            return response.json();
        }).then(function (data) {
            console.log(data)
            console.log(url + " url is good");

        //renaming elements
            name.innerHTML = data.name;
            desc.innerHTML = data.description;
            orig.innerHTML = data.origin;
            life_s.innerHTML = data.life_span;

            //if statements for friendly levels (child)
            if (data.child_f < 3) {
                child_f.innerHTML = `not very friendly (${data.child_friendly})`;
            }
            if (data.dog_friendly > 3) {
                child_f.innerHTML = `very friendly (${data.child_friendly})`;
            }
            else{
                child_f.innerHTML = `friendly (${data.child_friendly})`;
            }
            //dog friendly
            if (data.dog_friendly < 3) {
                dog_f.innerHTML = dog_f.innerHTML = `not very friendly (${data.dog_friendly})`
            }
            if (data.dog_friendly > 3) {
                dog_f.innerHTML = dog_f.innerHTML = `very friendly (${data.dog_friendly})`
            }
            else{
                dog_f.innerHTML = dog_f.innerHTML = `friendly (${data.dog_friendly})`
            }
            //energy level
            if (data.energy_level < 3) {
                energyLevel.innerHTML = dog_f.innerHTML = `not very energetic (${data.energy_level})`
            }
            if (data.dog_friendly > 3) {
                energyLevel.innerHTML = dog_f.innerHTML = `very energetic (${data.energy_level})`
            }
            else{
                energyLevel.innerHTML = dog_f.innerHTML = `energetic (${data.energy_level})`
            }
            //social needs
            if (data.social_needs < 3) {
                socialNeeds.innerHTML = dog_f.innerHTML = `not much friends (${data.energy_level})`
            }
            if (data.social_needs > 3) {
                socialNeeds.innerHTML = dog_f.innerHTML = `has lots of friends (${data.energy_level})`
            }
            else{
                socialNeeds.innerHTML = dog_f.innerHTML = `has friends (${data.energy_level})`
            }
            wiki.href = data.wikipedia_url;
            wiki.innerHTML = data.name;
        });

        //removes last set of elements (images) in the bottom section
        while (bottomSection.firstChild){
            bottomSection.removeChild(bottomSection.firstChild);
        }

        getImage();
    }

    function getImage(){
        let select = document.querySelector("#breeds");
        let select_value = select.value;

        //config/request using fetch (breeds)
        let url = ` https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${select_value}`;
        let config = {
            method: "get",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "live_03d7HArg3QPh5kRIq3nocUD0V4QKAXXAxRpQNCipnysL7m26JuZ75VoKdTGKaxbb"

            }

        }

        fetch(url, config).then(function (response) {

            //json conversion
            return response.json();
        }).then(function (data) {
            console.log(data)
            console.log(url + " url is good");
            displayImage(data);
        })




    }
    //creates images w/ urls
    function displayImage(catImg) {

        //creating img tags
        for (let i = 0; i < catImg.length; i++) {

            let urlArray = catImg[i].url;

            let img = document.createElement("img");
            let anchor = document.createElement("a");

            anchor.appendChild(img);
            bottomSection.appendChild(anchor);

            anchor.href = urlArray;
            img.src = urlArray;
        }


    }




}








