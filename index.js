const userTab = document.querySelector('.user-tab');
const searchTab = document.querySelector('.search-tab');
const userWetherContainer = document.querySelector('.weather-container');
const grantAccessContainer = document.querySelector('.grant-location-container');
const searchForm = document.querySelector('.search-form');
const loadingScreen = document.querySelector('.loading-container');

const API_KEY = "ee093931af6a04ebc772c5923bb7cc70";

// if(!sessionStorage.getItem('user-coordinates')){
//     grantAccessContainer.classList.add('active');
// }else{
//     getfromSessionStorage();
//     // fetchUserWetherInfo(coordinates);
// }
getfromSessionStorage();
let currentTab = userTab;
currentTab.classList.add('current-tab');

userTab.addEventListener('click', () => {
    switchTab(userTab);
})

searchTab.addEventListener('click', () => {
    switchTab(searchTab);
})

function switchTab(clickedTab) {
    if (clickedTab !== currentTab) {
        currentTab.classList.remove('current-tab');
        currentTab = clickedTab;
        currentTab.classList.add('current-tab');

        if (!searchForm.classList.contains('active')) {
            //it means searh tab pe clixk hua hai
            //hide grant access container and userWether container
            grantAccessContainer.classList.remove('active');
            userWetherContainer.classList.remove('active');
            searchForm.classList.add('active');
        } else {
            //it meanse Your tab pe click hua hai
            //hide form container
            searchForm.classList.remove('active');
            //show user wether container
            // if()
            userWetherContainer.classList.remove('active');
            //ab main yourwether section me aaya hu to mujhe check karna padega local storage me coordinates pade hain ya nhi
            getfromSessionStorage();
        }
    }
}

//getfromSessionStorage
function getfromSessionStorage() {
    const localCoordinates = sessionStorage.getItem('user-coordinates');

    if (localCoordinates) {
        //mil gaye
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWetherInfo(coordinates);
    } else {
        //nhi mile
        grantAccessContainer.classList.add('active');
    }
}

//fetchUserWetherInfo
async function fetchUserWetherInfo(coordinates) {
    const { lat, lon } = coordinates;
    //make grant access container invisible
    grantAccessContainer.classList.remove('active');
    //before doing api call lets make loade visible
    loadingScreen.classList.add('active');
    //do api call
    try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data = await result.json();
        //now remove loader screen
        loadingScreen.classList.remove('active');
        userWetherContainer.classList.add('active');
        //now render the data in the UI
        renderWetherInfo(data);
    } catch (err) {
        console.log(err);
    }

}

//renderWetherInfo function

function renderWetherInfo(data) {
    //firstly we have to fetch the elements
    const cityName = document.querySelector('.city-name');
    const countryIcon = document.querySelector('.country-icon');
    const desc = document.querySelector('.mausam');
    const wetherIcon = document.querySelector('.mausam-img');
    const temp = document.querySelector('.temp');
    const windSpeed = document.querySelector('.wind-speed-value');
    const humidity = document.querySelector('.humidity-value');
    const cloudy = document.querySelector('.cloudy-value');

    cityName.innerText = data?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    desc.innerText = data?.weather?.[0]?.description;
    wetherIcon.src = `https://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temp.innerText = (parseInt(data?.main?.temp)-273.15).toFixed(2)+ '°C';
    windSpeed.innerText = data?.wind?.speed +'m/s';
    humidity.innerText =data?.main?.humidity +'%';
    cloudy.innerText = data?.clouds?.all +'%';

}

const grantAccessButton = document.querySelector('#grant-access-btn');
grantAccessButton.addEventListener('click',getLocation);

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        //no geolocation availabe
        alert("No geo location available");
    }
}

function showPosition(position){
    const userCoordinates = {
        lat:position.coords.latitude,
        lon:position.coords.longitude
    }
    sessionStorage.setItem('user-coordinates',JSON.stringify(userCoordinates));
    fetchUserWetherInfo(userCoordinates);
}


const citySearch = document.querySelector('#search-id');
console.log(citySearch);
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName = citySearch.value;
    console.log(cityName);
    if(cityName==="")
        return;
    else
        fetchWeatherInfoCity(cityName);
})

async function fetchWeatherInfoCity(city){
    loadingScreen.classList.add('active');
    userWetherContainer.classList.remove('active');
    grantAccessContainer.classList.remove('active');

    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const data = await res.json();
        loadingScreen.classList.remove('active');
        userWetherContainer.classList.add('active');
        renderWetherInfo(data);
    }catch(err){
        console.log(err);
    }
}
