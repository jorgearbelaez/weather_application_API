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
    .then((datos) => console.log(datos));
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
