# Standard library imports
import os

# Third-party imports
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Configuration class for the Flask application."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY')
    # Default city
    DEFAULT_CITY = 'London'
    # Units can be 'metric' or 'imperial'
    DEFAULT_UNITS = 'metric'