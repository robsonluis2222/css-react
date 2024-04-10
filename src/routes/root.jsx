import './root.css';
import React, { useState, useEffect } from 'react';

function Root() {
    const [time, setTime] = useState(null);
    const [rain, setRain] = useState(null);
    const [temperature, setTemp] = useState(null);
    const [final, setFinal] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    let carroMoto = true;
    let newArray = [];

    function verificarMaiorQueQuarenta(array) {
        carroMoto = array.some(elemento => elemento > 28);
        if(carroMoto === true){
            return setFinal("CARRO");
        } else if (carroMoto === false){
            return setFinal("MOTO");
        } else{
          return setFinal("Não definido");
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-26.9078&longitude=-48.6619&hourly=precipitation_probability&timezone=GMT&forecast_days=1');
            const temp = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-26.9078&longitude=-48.6619&current=temperature_2m&timezone=GMT&forecast_days=1');
            if (!response.ok) {
              throw new Error('Erro ao buscar os dados');
            }
            if (!temp.ok) {
                throw new Error('Erro ao buscar os dados');
              }
            const jsonTemp = await temp.json();
            setTemp(jsonTemp.current.temperature_2m);
            const jsonData = await response.json();
            setTime(jsonData.hourly.time);
            setRain(jsonData.hourly.precipitation_probability);
            newArray.push(jsonData.hourly.precipitation_probability[7]);
            newArray.push(jsonData.hourly.precipitation_probability[8]);
            newArray.push(jsonData.hourly.precipitation_probability[9]);
            newArray.push(jsonData.hourly.precipitation_probability[17]);
            newArray.push(jsonData.hourly.precipitation_probability[18]);
            newArray.push(jsonData.hourly.precipitation_probability[19]);
            console.log("newarray" + newArray);
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
            verificarMaiorQueQuarenta(newArray);
          } catch (error) {
            setError(error);
            setIsLoading(false);
          }
        };
        fetchData();
    }, []);

    if(isLoading){
        return <h1>loading</h1>
    }
    if(error){
        return <div>Erro: {error.message}</div>;
    }

    return (
      <>
        <div className="pai">
            <h2>Weather - Car or Motocycle</h2>
            <div className='weather-div'>
                <div className='element' id='p'>
                    <div className='content-element' id="cp">current temperature</div>
                    <div className='temp-div'>
                        <span className='temperature'>{temperature} ºC</span>
                    </div>
                </div>

                <div className='element' id='s'>
                    <div className='content-element' id="cs">chance of Rain</div>
                    <div className='escop'>
                        <div className='rain-div-p'>
                            <span>7 AM</span>
                            <span>8 AM</span>
                            <span>9 AM</span>
                            <span>7 PM</span>
                            <span>8 PM</span>
                            <span>9 PM</span>
                        </div>
                        <div className='rain-div-s'>
                            <span>{rain[7]}%</span>
                            <span>{rain[8]}%</span>
                            <span>{rain[9]}%</span>
                            <span>{rain[17]}%</span>
                            <span>{rain[18]}%</span>
                            <span>{rain[19]}%</span>
                        </div>
                    </div>
                </div>

                <div className='element' id='t'>
                    <div className='content-element' id="ct">Car or Motocycle</div>
                    <div className='m-c-div'>
                        <span className='m-c'>{final}</span>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }



export default Root;