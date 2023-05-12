const respuesta = document.getElementById("respuesta")
const host = 'api.frankfurter.app';
fetch(`https://${host}/currencies`)
    .then(resp => resp.json())
    .then((data) => {
        Object.keys(data).forEach(element => {
            let option = document.createElement("option");
            option.innerText = element;
            option.setAttribute("value", element);
            let optionCopy = option.cloneNode(true)
            document.getElementById("moneda_1").appendChild(option);
            document.getElementById("moneda_2").appendChild(optionCopy);
        });

    });

function convertir() {
    let cantidad = document.getElementById("cantidad").value;
    let moneda_1 = document.getElementById("moneda_1").value;
    let moneda_2 = document.getElementById("moneda_2").value;
    fetch(`https://${host}/latest?amount=${cantidad}&from=${moneda_1}&to=${moneda_2}`)
        .then(resp => resp.json())
        .then((data) => {
            respuesta.innerText = `${cantidad} ${moneda_1} = ${data.rates[moneda_2]} ${moneda_2} `;
        });

}

function comparar() {
    let cantidad = document.getElementById("cantidad").value;
    let moneda_1 = document.getElementById("moneda_1").value;
    let moneda_2 = document.getElementById("moneda_2").value;
    let inicio = document.getElementById("inicio").value
    let fin = document.getElementById("fin").value
    fetch(`https://${host}/${inicio}..${fin}?base=${moneda_1}&to=${moneda_2}&amount=${cantidad}`)
        .then(resp => resp.json())
        .then((data) => {
            console.log(data['rates'])
            console.log(Object.keys(data['rates']))
            console.log(Object.values(data['rates']).map((dict) => dict[moneda_2]))

            var trace1 = [{
                type: 'bar',
                x: Object.keys(data['rates']),
                y: Object.values(data['rates']).map((dict) => dict[moneda_2]),
                marker: {
                    color: 'rgb(0, 138, 251)',
                    line: {
                        width: 1.5
                    }
                }
            }];

            var layout = {
                title: `CONVERSION HISTORICA DE ${moneda_1} A ${moneda_2}`,
                font: { size: 18 },
            };

            var config = { responsive: true }

            Plotly.newPlot('myDiv', trace1, layout, config);
        });
}