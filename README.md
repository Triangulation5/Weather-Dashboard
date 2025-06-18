# Weather Dashboard

A simple Flask web application that displays current weather and a 5-day forecast for any city using the OpenWeather API.

## Features

- Search for current weather by city
- View 5-day weather forecast
- Responsive UI (customize in `static/css/style.css`)
- Powered by [OpenWeather API](https://openweathermap.org/api)

## API Endpoints

### `GET /weather`

Fetches current weather and 5-day forecast for a given city.

**Query Parameters:**

- `city` (string, optional): City name (default: London)
- `units` (string, optional): `metric` or `imperial` (default: metric)

**Response:**

- `success` (bool): Whether the request was successful
- `current` (object): Current weather data (if successful)
- `forecast` (array): 5-day forecast data (if successful)
- `error` (string): Error message (if unsuccessful)

**Example:**

```
GET /weather?city=Paris&units=metric
```

**Sample Response:**

```json
{
  "success": true,
  "current": {
    "city": "Paris",
    "temperature": { "celsius": 21.5, "fahrenheit": 70.7 },
    "humidity": 60,
    "wind_speed": 3.5,
    "description": "clear sky",
    "icon": "01d"
  },
  "forecast": [
    {
      "date": "2025-06-18",
      "temperature": { "celsius": 22.1, "fahrenheit": 71.8 },
      "description": "few clouds",
      "icon": "02d"
    }
    // ...more days...
  ]
}
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Weather-Dashboard.git
cd Weather-Dashboard
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Copy the example environment file and fill in your own keys:

```bash
cp .env.example .env
```

Edit `.env` and set your `SECRET_KEY` and `OPENWEATHER_API_KEY`.

### 4. Run the app

```bash
python app.py
```

The app will be available at [http://localhost:5000](http://localhost:5000)

## Project Structure

```
Weather-Dashboard/
├── app.py                # Main Flask app
├── config.py             # Configuration (loads .env)
├── requirements.txt      # Python dependencies
├── static/
│   ├── css/
│   │   └── style.css     # Styles
│   └── js/
│       └── main.js       # Client-side JS
├── templates/
│   ├── base.html         # Base template
│   └── index.html        # Main page
├── .env.example          # Example environment file
└── README.md             # This file
```

## Security

- **Never commit your real `.env` file or API keys.**
- The `.env` file is in `.gitignore` by default.

## License

MIT
