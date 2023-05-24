const input = document.getElementById("search");
const button = document.getElementById("btn");
const temperature = document.querySelector(".weather1");
const city = document.querySelector(".weather2 p");
const time = document.querySelector(".weather2 span");
const img = document.querySelector(".weather3 img");
const condition = document.querySelector(".weather3 span");


let target = "Lucknow"
const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=0a741b218e99406c99d34902232405&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;
    updataDom(temp_c, name, localtime, text, icon);
  } catch {
    alert("Error fetching weather data. Please try again later!!")
  }
};

const updataDom = (temp, name, localtime, text, emoji) => {
  temperature.innerHTML = temp + "°C";
  city.innerHTML = name;
  condition.innerHTML = text;
  img.src = emoji;
  const date = localtime.split(" ")[0];
  const exactTime = localtime.split(" ")[1];
  const day = func_day(new Date(date).getDay());
  time.innerHTML = `${exactTime} - ${day} ${date}`;
};

fetchData(target);

function func_day(num) {
  switch (num) {
    case 0:
      return "Sunday";

    case 1:
      return "Monday";

    case 2:
      return "Tuesday";

    case 3:
      return "Wednesday";

    case 4:
      return "Thursday";

    case 5:
      return "Friday";

    case 6:
      return "Saturdat";

    default:
      return "Don't Know";
  }
}

button.addEventListener("click", (e) => {
    e.preventDefault();
    target = input.value;
    fetchData(target);
    input.value = ""
});