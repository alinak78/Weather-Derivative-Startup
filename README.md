# Perfect Day Demo App  
Weather-Aware Booking + Dynamic Rescheduling Checkout Prototype

Perfect Day is a prototype that embeds weather intelligence directly into outdoor activity booking flows (golf demo), allowing users to:

- Book tee times  
- See rain risk at checkout  
- Receive live weather-based rescheduling suggestions  
- Add Weather Protection Guarantee  
- Simulate dynamic pricing and booking optimization

---

# Project Structure

```bash
perfect-day-demo/
│
├── frontend/
│   ├── index.html
│   ├── tee_time_booking_page.html
│   ├── checkout_reschedule__page.html
│   ├── manage_booking.html
│   └── dynamic_quote.html
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── README.md
│
└── assets/
```

---

# Features

## Frontend Demo Flow

### Home Page
Product landing page:

- User interview insights
- Product explanation
- Demo navigation

Open:

```bash
frontend/index.html
```

---

## Tee Time Search

Mock golf booking marketplace.

Users:

- Browse tee times
- Start booking flow
- Continue to checkout

File:

```bash
tee_time_booking_page.html
```

---

## Checkout Demo

Includes:

- Weather risk at checkout
- Live API-powered rescheduling
- Weather Protection Guarantee checkbox
- Dynamic total recalculation
- Order summary updates

File:

```bash
checkout_reschedule__page.html
```

---

## Manage Booking

Post-booking management:

- Change reservation
- Trigger rescheduling
- Simulate customer portal

File:

```bash
manage_booking.html
```

---

## Dynamic Quote

Interactive protection pricing page.

File:

```bash
dynamic_quote.html
```

---

# Backend Setup

Go to backend:

```bash
cd backend
```

Install packages:

```bash
npm install
```

Dependencies:

```bash
npm install express cors
```

---

## Run API Server

```bash
node server.js
```

Server starts:

```bash
Perfect Day backend running at http://localhost:3001
```

---

# API Routes

## Root Health Check

Visit:

```text
http://localhost:3001
```

Expected:

```text
Perfect Day backend is running. Try /api/weather-options
```

---

## Weather Rescheduling API

Visit:

```text
http://localhost:3001/api/weather-options
```

or

```text
http://localhost:3001/api/weather-options?selectedTime=2026-04-23T18:21
```

Returns:

```json
{
 "selected": {
   "rainProbability":51,
   "temperatureF":71
 },
 "recommendations":[
   {
      "teeTime":"6:39 PM",
      "rainProbability":12,
      "experienceScore":91
   }
 ]
}
```

---

# Weather Scoring Logic

Recommendations ranked using:

- Rain probability
- Precipitation
- Wind speed
- Temperature comfort
- Experience score

Example:

```text
Score = 100
- rain penalty
- wind penalty
- precipitation penalty
- temperature deviation penalty
```

Higher score = better tee time.

---

# Weather Data Source

Powered by:

Open-Meteo

https://open-meteo.com

Uses:

```text
temperature_2m
precipitation_probability
precipitation
wind_speed_10m
```

---

# Frontend Setup

No framework required.

Open directly:

```bash
open index.html
```

or use local server:

Python:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

---

# Full Demo Flow

Step 1

Start backend:

```bash
cd backend
node server.js
```

Step 2

Start frontend:

```bash
cd frontend
python -m http.server 8000
```

Step 3

Visit:

```text
http://localhost:8000
```

---

# Demo User Journey

1 Select Tee Time

2 Continue To Checkout

3 See:

```text
51% rain probability
Would you like better rescheduling options?
```

4 Click:

```text
See Options
```

Backend returns ranked alternatives.

5 Select new time or keep booking.

6 Optional:

Check:

```text
Perfect Day Guarantee (+$9)
```

Order total updates automatically.

---

# Ports

Frontend:

```text
localhost:8000
```

Backend:

```text
localhost:3001
```

If changing backend port edit:

```javascript
const PORT = 3001;
```

and update fetch URL:

```javascript
http://localhost:3001/api/weather-options
```

---

# Troubleshooting

## Cannot GET /

Add in server.js:

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

## Weather Values Null

If you see:

```json
"rainProbability": null
```

Selected tee time is outside forecast window.

Use dynamic dates or today's date.

---

## Port in Use

Change:

```javascript
const PORT=3002
```

Run:

```bash
node server.js
```

Visit:

```text
http://localhost:3002/api/weather-options
```

---

# Tech Stack

Frontend

- HTML
- CSS
- Vanilla JavaScript

Backend

- Node.js
- Express
- Open-Meteo API

---

# Prototype Concepts Demonstrated

- Weather-aware checkout recommendations
- Embedded booking protection
- Dynamic ancillary pricing
- Automated rescheduling assistant
- Experience optimization vs refund insurance

---

# Future Extensions

Potential next steps:

- Stripe checkout integration
- Real tee time inventory APIs
- Parametric pricing engine
- Booking platform plugins
- Multi-activity weather scoring
- ML personalization for rebooking

---

# Authors

Perfect Day Demo Prototype  
Cornell Tech Product Studio Concept

