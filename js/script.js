"use strict";
const inputRub = document.querySelector('.rub'),
      inputUSD = document.querySelector('.usd');

    function noInternet(url) {
        fetch(url)
        .then(responce => {
            if (!responce.ok) {
                throw new Error(`Error conect to ${url}`);
         }
            return responce.json();
        })
        .then(data=>{
            // курс доллара по умолчанию
            const r = data.current[0].usd;
            inputRub.addEventListener('input',()=>{
                if(!isNaN(+inputRub.value)) {
                    inputUSD.value = (+inputRub.value / +r).toFixed(2); 
                } else {
                    inputUSD.value = 'Что то пошло не так';
                }
            });
        })
        .catch((error) => {
            console.error(error);
        })
    }
    function internetOK(url) {
        fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error conect to ${url}`);
            }
            return response.json();
        })
        .then((json) => {
            // Текущий курс доллара ЦБРФ
            const r = json.cbrf.data[0][json.cbrf.columns.indexOf('CBRF_USD_LAST')];
            inputRub.addEventListener('input',()=>{
                        if(!isNaN(+inputRub.value)) {
                            inputUSD.value = (+inputRub.value / +r).toFixed(2); 
                        } else {
                            inputUSD.value = 'Что то пошло не так';
                        }
                    });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    document.addEventListener('DOMContentLoaded',()=>{
        // try {
        //     setInterval(()=>{
        //         const url = 'https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off',
        //         request = new XMLHttpRequest();
        //         request.open('POST',url,false);
        //         console.log(request);
        //         if (request.status == 0) {
        //             //Есть Интернет соединение
        //             console.log('OK');
        //         } else {
        //             console.log('Noooooooooooooooooo')
        //         }
        // }, 5000);    

        // } catch(e) {
        //     console.log(e);
        // }   

        // fetch()
        // .then(responce=>{
        //     if(!responce.ok) {
        //        
        //     } else {
        //         
        //     }
        // })
        const btn = document.querySelector('button');
        let position = false,
            classValue = btn.classList; 
        classValue.add('greenBtn');
        internetOK('https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off');
        btn.addEventListener('click',()=>{
            if (!btn.classList.contains('redBtn')) {
                inputRub.value='';
                inputUSD.value='';
                noInternet('./js/current.json');
                position = true; //Enabled - OFFLine - RED
                classValue.remove('greenBtn');
                classValue.add('redBtn');
                btn.innerText = 'OFFLine';
            } else {
                    inputRub.value='';
                    inputUSD.value='';
                    internetOK('https://iss.moex.com/iss/statistics/engines/currency/markets/selt/rates.json?iss.meta=off');
                    position = false; //Disabled - ONLine - GREEN
                    classValue.remove('redBtn');
                    classValue.add('greenBtn');
                btn.innerText = 'ONLine';
            }

        });
        
        
        
    })
    
          
    





