const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

const COURSE = {
  name: "Clearview Park Golf Course",
  latitude: 40.7887,
  longitude: -73.8376,
  timezone: "America/New_York"
};

function buildDemoTeeTimes() {
  const today = new Date();
  const pad = n => String(n).padStart(2, "0");

  function datePlus(days, time) {
    const d = new Date(today);
    d.setDate(today.getDate() + days);

    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1);
    const dd = pad(d.getDate());

    return `${yyyy}-${mm}-${dd}T${time}`;
  }

  return [
    datePlus(0, "18:21"),
    datePlus(0, "18:30"),
    datePlus(0, "18:39"),
    datePlus(0, "18:48"),
    datePlus(1, "07:12"),
    datePlus(1, "08:30"),
    datePlus(1, "17:45")
  ];
}

function getDefaultSelectedTime() {
  return buildDemoTeeTimes()[0];
}

function parseHourKey(dateString) {
  return dateString.slice(0, 13) + ":00";
}

function fahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function scoreTeeTime(weather) {
  const rainRisk = weather.precipitationProbability ?? 0;
  const precip = weather.precipitation ?? 0;
  const wind = weather.windSpeed ?? 0;
  const tempF = fahrenheit(weather.temperature ?? 18);

  let score = 100;

  score -= rainRisk * 0.65;
  score -= precip * 8;
  score -= Math.max(0, wind - 10) * 1.4;
  score -= Math.abs(tempF - 72) * 0.45;

  return Math.max(0, Math.round(score));
}

function recommendationLabel(score, rainRisk) {
  if (rainRisk >= 45) return "High rain risk";
  if (score >= 85) return "Best match";
  if (score >= 75) return "Good option";
  return "Backup option";
}

async function fetchWeatherForecast() {
  const params = new URLSearchParams({
    latitude: COURSE.latitude,
    longitude: COURSE.longitude,
    timezone: COURSE.timezone,
    forecast_days: "3",
    hourly: [
      "temperature_2m",
      "precipitation_probability",
      "precipitation",
      "wind_speed_10m"
    ].join(",")
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather API failed: ${response.status}`);
  }

  return response.json();
}

function buildHourlyMap(apiData) {
  const hourly = apiData.hourly;
  const map = {};

  hourly.time.forEach((time, index) => {
    map[time] = {
      time,
      temperature: hourly.temperature_2m[index],
      precipitationProbability: hourly.precipitation_probability[index],
      precipitation: hourly.precipitation[index],
      windSpeed: hourly.wind_speed_10m[index]
    };
  });

  return map;
}

app.get("/", (req, res) => {
  res.send(
    "Perfect Day backend is running. Try /api/weather-options"
  );
});

app.get("/api/weather-options", async (req, res) => {
  try {
    const selectedTime = req.query.selectedTime || getDefaultSelectedTime();
    const availableTeeTimes = buildDemoTeeTimes();

    const forecast = await fetchWeatherForecast();
    const hourlyMap = buildHourlyMap(forecast);

    const selectedHour = parseHourKey(selectedTime);
    const selectedWeather = hourlyMap[selectedHour];

    const options = availableTeeTimes
      .filter(time => time !== selectedTime)
      .map(time => {
        const hourKey = parseHourKey(time);
        const weather = hourlyMap[hourKey];

        if (!weather) return null;

        const score = scoreTeeTime(weather);

        return {
          teeTime: time,
          course: COURSE.name,
          rainProbability: weather.precipitationProbability,
          precipitation: weather.precipitation,
          windSpeed: weather.windSpeed,
          temperatureF: fahrenheit(weather.temperature),
          experienceScore: score,
          label: recommendationLabel(
            score,
            weather.precipitationProbability
          )
        };
      })
      .filter(Boolean)
      .sort((a, b) => b.experienceScore - a.experienceScore);

    res.json({
      selected: {
        teeTime: selectedTime,
        course: COURSE.name,
        rainProbability: selectedWeather?.precipitationProbability ?? null,
        precipitation: selectedWeather?.precipitation ?? null,
        windSpeed: selectedWeather?.windSpeed ?? null,
        temperatureF: selectedWeather
          ? fahrenheit(selectedWeather.temperature)
          : null,
        experienceScore: selectedWeather
          ? scoreTeeTime(selectedWeather)
          : null
      },
      recommendations: options.slice(0, 3)
    });
  } catch (error) {
    res.status(500).json({
      error: "Unable to fetch weather-based recommendations",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Perfect Day backend running at http://localhost:${PORT}`);
});