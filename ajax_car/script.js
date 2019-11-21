document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');

    select.addEventListener('change', () => {
        const getCars = () => {
            return new Promise( (resolve, reject) => {
                const request = new XMLHttpRequest();
                request.open('GET', './cars.json');
                request.setRequestHeader('Content-Type', 'application/json');
                request.send();
                request.addEventListener('readystatechange', () => {
                    if(request.readyState !== 4) {
                        return;
                    } else if (request.status === 200) {
                        const data = JSON.parse(request.responseText);
                        data.cars.forEach(item => {
                            if (item.brand === select.value) {
                                const {brand, model, price} = item;
                                resolve({brand, model, price});
                            }
                        });
                    } else {
                        const error = 'Произошла ошибка';
                        reject(error);
                    }
                });
            }); 
        };

        getCars().then(({brand, model, price}) => {
            output.innerHTML = `Тачка ${brand} ${model} <br>
            Цена: ${price}$`;
        })
        .catch((error) => {
            output.innerHTML = error;
        });
    });

});