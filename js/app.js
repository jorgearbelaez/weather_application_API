//selectores

const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //validar entradas

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Todos los campos son obligatorios");

    return;
  }
  // si pasa la validacion consultamos a la api
  consultarAPI(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
  const appId = "74d21a40e6d963ce323ea36aa070d9ac";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  // mosrar spinner
  spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      console.log(datos);
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("Ciudad no encontrada");
        return;
      }

      //imprime la respuesta en el html

      mostrarClima(datos);
    });
}
function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min, feels_like, humidity },
    wind: { speed },
  } = datos;

  const centigrados = tempCentigrados(temp);
  const max = tempCentigrados(temp_max);
  const min = tempCentigrados(temp_min);
  const tempSensacion = tempCentigrados(feels_like);

  const ciudad = document.createElement("p");
  ciudad.textContent = ` Clima en  ${name} `;
  ciudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add("font-bold", "text-xl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min: ${min} &#8451;`;
  tempMin.classList.add("font-bold", "text-xl");

  const sensacion = document.createElement("p");
  sensacion.innerHTML = `Sensacion: ${tempSensacion} &#8451;`;
  sensacion.classList.add("font-bold", "text-xl");

  const humedad = document.createElement("p");
  humedad.innerHTML = `Humedad: ${humidity} %`;
  humedad.classList.add("font-bold", "text-xl");

  const velocidadViento = document.createElement("p");
  velocidadViento.innerHTML = `Velocidad Viento: ${speed} MPH;`;
  velocidadViento.classList.add("font-bold", "text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(ciudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(tempMin);
  resultadoDiv.appendChild(sensacion);
  resultadoDiv.appendChild(humedad);
  resultadoDiv.appendChild(velocidadViento);

  resultado.appendChild(resultadoDiv);
}
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
function tempCentigrados(temp) {
  return parseInt(temp - 273.15);
}

function mostrarError(mensaje) {
  const alert = document.querySelector(".alert");

  if (!alert) {
    const mensajeError = document.createElement("div");
    mensajeError.classList.add(
      "bg-white",
      "border-red-400",
      "rounded",
      "text-red-700",
      "text-center",
      "font-bold",
      "p-3",
      "mt-5",
      "text-xl",
      "alert"
    );
    mensajeError.textContent = mensaje;

    formulario.appendChild(mensajeError);

    setTimeout(() => {
      mensajeError.remove();
    }, 4000);
  }
}

function spinner() {
  limpiarHTML();

  const divSpinner = document.createElement("div");

  divSpinner.classList.add("sk-chase", "mx-auto");

  divSpinner.innerHTML = `
  
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  <div class="sk-chase-dot"></div>
  
  `;
  resultado.appendChild(divSpinner);
}
