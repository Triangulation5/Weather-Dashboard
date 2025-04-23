from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')
app.config['OPENWEATHER_API_KEY'] = os.getenv('OPENWEATHER_API_KEY')
app.config['DEFAULT_CITY'] = 'London'
app.config['DEFAULT_UNITS'] = 'metric'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/weather')
def get_weather():
    city = request.args.get('city', app.config['DEFAULT_CITY'])
    
    # Current weather
    current_weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={app.config['OPENWEATHER_API_KEY']}"
    # 5-day forecast
    forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?q={city}&appid={app.config['OPENWEATHER_API_KEY']}"
    
    try:
        current_response = requests.get(current_weather_url)
        forecast_response = requests.get(forecast_url)
        
        if current_response.status_code == 200 and forecast_response.status_code == 200:
            current_data = current_response.json()
            forecast_data = forecast_response.json()
            
            # Process current weather
            temp_k = current_data['main']['temp']
            temp_c = round(temp_k - 273.15, 1)
            temp_f = round((temp_k - 273.15) * 9/5 + 32, 1)
            
            current_weather = {
                'city': current_data['name'],
                'temperature': {
                    'celsius': temp_c,
                    'fahrenheit': temp_f
                },
                'humidity': current_data['main']['humidity'],
                'wind_speed': current_data['wind']['speed'],
                'description': current_data['weather'][0]['description'],
                'icon': current_data['weather'][0]['icon']
            }
            
            return jsonify({
                'current': current_weather,
                'forecast': forecast_data['list'],
                'success': True
            })
            
        return jsonify({
            'success': False,
            'error': 'Failed to fetch weather data'
        }), 400
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)