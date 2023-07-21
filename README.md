# weather-app
This is a simple Weather App that allows users to check the weather information for their current location or search for weather information of a specific city. The app retrieves weather data from the OpenWeatherMap API and displays it in a user-friendly interface.

## Features
Automatically fetches weather information based on the user's current location (if granted access).
Allows users to search for weather information by city name.
Displays weather details like temperature, weather description, wind speed, humidity, and cloudiness.
Shows a weather icon representing the current weather conditions.
# Technologies Used
HTML
CSS
JavaScript
OpenWeatherMap API
How to Use
Clone the repository to your local machine.
Open the index.html file in your web browser.
When you open the app for the first time, it will prompt you to grant location access to fetch weather information based on your current location. Click the "Grant" button to allow access.
The app will display the weather information for your current location, including temperature, weather description, wind speed, humidity, and cloudiness.
To search for weather information of a specific city, click on the "Search Weather" tab in the app.
Enter the city name in the search input field and click the search button (magnifying glass icon) or press "Enter".
The app will display the weather information for the searched city.
Code Structure
The index.html file contains the main structure of the app, including the HTML elements for weather information display, search form, and loading screen.
The style.css file contains the CSS styling for the app's layout and appearance.
The index.js file contains the JavaScript code that handles user interactions, API calls, and weather information rendering.
API Key
Please note that the app uses an API key to fetch weather information from the OpenWeatherMap API. The API key is stored in the API_KEY variable in the index.js file. If you encounter any issues with the API, you may need to check the validity of the API key.

Limitations
The app relies on the user's geolocation data, which may not always be available or accurate.
Some cities may have similar names, and the app may not always fetch weather information for the intended city due to API limitations or ambiguous city names.

link : http://sensational-rabanadas-ea5bc1.netlify.app/
Thank you for using the Weather App! If you have any questions or feedback, please feel free to contact us.
