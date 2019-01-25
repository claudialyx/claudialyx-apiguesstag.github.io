// must display these in buttons
keywords=["sports", "food", "bags", "animals"] 
total = ["sports", "food", "bags", "animals", "plant", "transportation", "oprah", "landscape", "kuala lumpur", "architecture"]



const list = document.getElementById("list-data")
const index = Math.floor(Math.random()*total.length)
const tagName = total[index];
const button = document.getElementsByClassName("button")
console.log(tagName)
const optionsGiven = [tagName];

// to use tumblr API library
function getTaggedPhotos(tagName){
fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=QHZK2YBrUJtI1EnvVQW8LL4aZWo5FWTRZ6CMPFfM1UEBhaCrie')
    .then(function(response){
        return response.json(); // convert the raw response into json
        
    })
    .then (function(result){
        console.log(result); // console log the json so we can view it
        
        list.innerHTML = "";

        const items = result.response;

        for(let i = 0; i < items.length; i++){
            const item = items[i];

            if(item.photos != undefined){ //why !=undefined?
                const altSizes = item.photos[0].alt_sizes
                const imgSrc = altSizes[altSizes.length-2].url;

                const img = document.createElement("img");
                img.src = imgSrc;

                const li = document.createElement("li");
                li.appendChild(img);
                // li.innerHTML = imgSrc;

                list.appendChild(li);
            }
        }
    })
}
getTaggedPhotos(tagName)
setup();

// additional keys to be added
function setup (){
    for (let i = 0; optionsGiven.length < 4; i++){
        let tagToAdd = tagName;
        while (optionsGiven.includes(tagToAdd)){
            tagToAdd = total[Math.floor(Math.random()*total.length)]
        }
        optionsGiven.push(tagToAdd);
    }

    // to sort the options
    optionsGiven.sort(
        function() { 
            return 0.5 - Math.random() 
        }
    )
    // to make button clickable
    for(let i = 0; i < optionsGiven.length; i++){
        button[i].innerHTML = optionsGiven[i];
        button[i].onclick = function(event){ 
            const buttonClicked = event.target 
            console.log(buttonClicked)
            //check if button clicked matches keyword, if yes - proceed
            if(button[i].innerHTML != tagName){
                alert ("The correct answer is " + tagName + " .")
                window.location.reload(true);
            }
            else if (button[i].innerHTML == tagName){
                window.location.reload(true);
            
            }
        }
    }
}


