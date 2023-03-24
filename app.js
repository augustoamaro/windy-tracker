const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Insira sua chave de API da OpenWeatherMap
const API_KEY = 'c1f4a71849b74a349e4230029232403';

app.get('/weather/:latitude/:longitude', async (req, res) => {
	try {
		const { latitude, longitude } = req.params;
		const weatherData = await fetchWeatherData(latitude, longitude, API_KEY);

		res.json({
			city: weatherData.location.name,
			temp: weatherData.current.temp_c,
			wind_direction: weatherData.current.wind_dir,
			wind_speed: weatherData.current.wind_kph,
			gust_kph: weatherData.current.gust_kph || 'N/A',
		});
	} catch (error) {
		res.status(500).json({ message: 'An error occurred', error });
	}
});

async function fetchWeatherData(latitude, longitude, API_KEY) {
	const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;
	const response = await axios.get(url);
	console.log(response)
	return response.data;
}

app.listen(port, () => {
	console.log(`Weather API listening at http://localhost:${port}`);
});