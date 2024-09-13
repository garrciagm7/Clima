document.querySelector(".busca").addEventListener("submit", async (event) => {
  event.preventDefault();

  let input = document.querySelector("#searchInput").value;

  if (input !== "") {
    showWarning("Carregando...");
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    input
  )}&appid=8981a6a4c8bad8ca0cc328b4b9e73dfb&units=metric&lang=pt_br`;

  let results = await fetch(url);
  let json = await results.json();

  if (json.cod === 200) {
    showInfo({
      name: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      windAngle: json.wind.deg,
    });
  } else {
    showWarning("Não encontramos esta localização");
  }

  console.log(json);
});

function showInfo(json) {
  showWarning("");

  document.querySelector(".resultado").style.display = "block";

  document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>°C</sup>`;
  document.querySelector(
    ".ventoInfo"
  ).innerHTML = `${json.windSpeed} <span>Km/h</span>`;

  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );

  document.querySelector(".ventoPonto").style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".resultado").style.display = "none";
}

function showWarning(msg) {
  document.querySelector(".aviso").innerHTML = msg;
}
