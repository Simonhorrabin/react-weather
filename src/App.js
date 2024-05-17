import React, {useState} from 'react';
import axios from 'axios';

function App() {

    const [data,setData] = useState({})
    const [location, setLocation] = useState('')



   const url =`https://api.openweathermap.org/data/2.5/weather?q=charlotte&appid=90ccaf76a1c136daef345d47598c58e1`

   const searchLocation = () => {
    axios.get(url).then((response) => {
        setData(response.data)
        console.log()
    })
   }



    return(
        <div className="app">
            <div className="container">
                <div className="top">
                    <div className="location">
                        <p>Charlotte</p>
                    </div>
                    <div className="temp">
                        <h1>60 F</h1>
                    </div>
                    <div className="description">
                        <p>Sunny</p>
                    </div>
                    <div className="bottom">
                        <div className="feels">
                            <p className='bold'>
                                65 F
                            </p>
                            <p>Feels Like</p>
                        </div>
                        <div className="humidity">
                            <p className='bold'>20%</p>
                            <p>humidity</p>
                        </div>
                        <div className="wind">
                           <p className='bold'>12 mph</p> 
                           <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default App;