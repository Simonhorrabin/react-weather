import React, {useState} from 'react';
import axios from 'axios';

function App() {

    const [data,setData] = useState({})
    const [location, setLocation] = useState('')


   const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=90ccaf76a1c136daef345d47598c58e1`

   const searchLocation = (event) => {
    if (event.key === 'Enter') {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        setLocation('')
    }
   }

    return(
        <div className="app">
            <div className="search">
                <input 
                value={location}
                onChange={event => setLocation(event.target.value)}
                onKeyPress={searchLocation}
                placeholder='Enter Location'
                type="text"></input>
            </div>
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>{data.name}</p>
                    </div>
                    <div className="temp">
                        {data.main ? <h1>{data.main.temp}°F</h1> : null}
                    </div>
                    <div className="description">
                        {data.weather ? <p>{data.weather[0].main}</p> : null} 
                    </div>
                    <div className="bottom">
                        <div className="feels">
                            {data.main ? <p className='bold'>{data.main.feels_like}°F</p> : null}
                            <p>
                                Feels like
                            </p>
                           
                        </div>
                        <div className="humidity">
                            {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                           
                            <p>Humidity</p>
                        </div>
                        <div className="wind">
                            {data.wind ? <p className='bold'>{data.wind.speed}</p> : null}
                         
                           <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;