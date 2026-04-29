# Perfect Day Weather Rescheduling Backend

Backend API for live weather-powered tee time recommendations.

## Start the server

Install dependencies:

```bash
npm install
```

Run backend:

```bash
node server.js
```

You should see:

```bash
Perfect Day backend running at http://localhost:3001
```

---

## Test in browser

Open:

```text
http://localhost:3001
```

You should see:

```text
Perfect Day backend is running. Try /api/weather-options
```

---

## Weather recommendation API

Open:

```text
http://localhost:3001/api/weather-options
```

or with a selected tee time:

```text
http://localhost:3001/api/weather-options?selectedTime=2026-04-23T18:21
```

Example response:

```json
{
  "selected": {
    "teeTime":"2026-04-23T18:21",
    "rainProbability":51,
    "temperatureF":70
  },
  "recommendations":[
    {
      "teeTime":"2026-04-23T18:39",
      "rainProbability":12,
      "experienceScore":91
    }
  ]
}
```

---

## If localhost:3001 shows "Cannot GET /"

Make sure this exists in `server.js`:

```javascript
app.get("/", (req,res)=>{
  res.send(
   "Perfect Day backend is running. Try /api/weather-options"
  );
});
```

Restart:

```bash
node server.js
```

---

## Change Port to 3001

In `server.js` make sure:

```javascript
const PORT = 3001;
```

(If using 3000 instead, update URLs accordingly.)

---

## Connect frontend checkout page

Frontend fetch call:

```javascript
fetch(
"http://localhost:3001/api/weather-options"
)
```

or

```javascript
fetch(
"http://localhost:3001/api/weather-options?selectedTime=2026-04-23T18:21"
)
```

---

## Project structure

```bash
perfect-day-backend/
│
├── server.js
├── package.json
└── README.md
```

---

## Run full demo

1 Start backend

```bash
node server.js
```

2 Open checkout demo in browser

```bash
open index.html
```

3 Click:

- Checkout  
- See Options  
- Weather-ranked tee times load from API

---

## Troubleshooting

### Port already in use

Change:

```javascript
const PORT = 3002;
```

Then visit:

```text
http://localhost:3002/api/weather-options
```

---

### API returns null weather

If you see:

```json
"rainProbability": null
```

your tee time date is outside forecast range.

Use dynamic dates or today’s date.

---

## Data source

Forecasts powered by:

Open-Meteo API  
https://open-meteo.com/