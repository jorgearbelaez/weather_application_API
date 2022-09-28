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

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
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
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = temp - 273.15;

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);

  resultado.appendChild(resultadoDiv);
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
