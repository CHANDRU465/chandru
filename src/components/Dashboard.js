import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/dashboard.css';



const Dashboard = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { city: City, country: Country } = useParams();

  const handleGetWeather = async () => {
    setLoading(true);
    if (!city || !country) {
      alert('Please enter both city and country');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/history/energy?city=${city}&country=${country}&start_date=2024-03-03&end_date=2024-03-10&threshold=63&units=I&key=b5c2f8b961b14fea91eb7d9eb0b8d10d&tp=daily`
      );
      const { data } = response.data;
      if (data && data.length > 0) {
        const { temp, clouds, wind_spd, date } = data[3];
        setWeatherData({ temp, clouds, wind_speed: wind_spd, date });
        localStorage.setItem('city', city);
        localStorage.setItem('country', country);
        localStorage.setItem('hasEnteredCityCountry', true);
        navigate(`/weather/${city}/${country}`);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    if (City && Country) {
      const fetchWeatherData = async () => {
        try {
          const response = await axios.get(
            `https://api.weatherbit.io/v2.0/history/energy?city=${City}&country=${Country}&start_date=2024-03-03&end_date=2024-03-10&threshold=63&units=I&key=b5c2f8b961b14fea91eb7d9eb0b8d10d&tp=daily`
          );
          const { data } = response.data;
          if (data && data.length > 0) {
            const { temp, clouds, wind_spd } = data[0];
            setWeatherData({ temp, clouds, wind_speed: wind_spd });
          }
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };
      fetchWeatherData();
    }
  }, [City, Country]);

  return (

<div className='weather-container'>
<div className='weather-background'></div>
     <div className='weather'>
           <h1 className='one'>WEATHER APP</h1>
      <Container className='Container'>
        <Grid container spacing={2} alignItems="center" className='Grid-container'>
          <Grid item xs={12} sm={6} className='Grid-item'>
            <TextField

              fullWidth
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
             
            />
          </Grid>
          <Grid item xs={12} sm={6} className='Grid-item'>
            <TextField
              fullWidth
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
             
            />
          </Grid>
          <Grid item xs={12} className='Grid-item'>
            <div>
              <Button className='button' variant="contained" onClick={handleGetWeather}>
                Get Weather
              </Button>
              {loading && <div className="loader"></div>}
            </div>
          </Grid>
        </Grid>

        {weatherData && (
          <div className='Modal'>
            <table className='WeatherTable'>
              <tbody>
                <tr>
                  <td><Typography className='Label' variant='h6'>City:</Typography></td>
                  <td><Typography className='Value' variant='h6'>{city}</Typography></td>
                </tr>
                <tr>
                  <td><Typography className='Label' variant='h6'>Country:</Typography></td>
                  <td><Typography className='Value' variant='h6'>{country}</Typography></td>
                </tr>
                <tr>
                  <td><Typography className='Label' variant="body1">Temperature:</Typography></td>
                  <td><Typography className='Value' variant="body1">{weatherData.temp}</Typography></td>
                </tr>
                <tr>
                  <td><Typography className='Label' variant="body1">Clouds:</Typography></td>
                  <td><Typography className='Value' variant="body1">{weatherData.clouds}</Typography></td>
                </tr>
                <tr>
                  <td><Typography className='Label' variant="body1">Wind Speed:</Typography></td>
                  <td><Typography className='Value' variant="body1">{weatherData.wind_speed}</Typography></td>
                </tr>
                {/* Add more rows for additional weather data if needed */}
              </tbody>
            </table>
          </div>
        )}
      </Container>
    </div>
 </div>
  );
};

export default Dashboard;
