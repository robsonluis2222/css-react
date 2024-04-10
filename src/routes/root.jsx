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
        return (
            <div class="load-element">
              <svg class="pl" viewBox="0 0 160 160" width="160px" height="160px" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#000"></stop>
                  <stop offset="100%" stop-color="#fff"></stop>
                </linearGradient>
                <mask id="mask1">
                  <rect x="0" y="0" width="160" height="160" fill="url(#grad)"></rect>
                </mask>
                <mask id="mask2">
                  <rect x="28" y="28" width="104" height="104" fill="url(#grad)"></rect>
                </mask>
              </defs>
              
              <g>
                <g class="pl__ring-rotate">
                  <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(223,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
                </g>
              </g>
              <g mask="url(#mask1)">
                <g class="pl__ring-rotate">
                  <circle class="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(193,90%,55%)" stroke-width="16" stroke-dasharray="452.39 452.39" stroke-dashoffset="452" stroke-linecap="round" transform="rotate(-45,80,80)"></circle>
                </g>
              </g>
              
              <g>
                <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
                </g>
              </g>
              <g mask="url(#mask1)">
                <g stroke-width="4" stroke-dasharray="12 12" stroke-dashoffset="12" stroke-linecap="round" transform="translate(80,80)">
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
                  <polyline class="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
                </g>
              </g>
              
              <g>
                <g transform="translate(64,28)">
                  <g class="pl__arrows" transform="rotate(45,16,52)">
                    <path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                    <path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
                  </g>
                </g>
              </g>
              <g mask="url(#mask2)">
                <g transform="translate(64,28)">
                  <g class="pl__arrows" transform="rotate(45,16,52)">
                    <path fill="hsl(333,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
                    <path fill="hsl(223,90%,80%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          );
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