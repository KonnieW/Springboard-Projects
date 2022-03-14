"""Tests for currency converter."""

from unittest import TestCase
from app import app
from forex_python.converter import CurrencyRates, CurrencyCodes


class TestConverter(TestCase):
    
    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True


    def test_converter_shows(self):
        """Make sure the main page shows up and displays the HTML form."""
        
        with self.client:
            res = self.client.get("/")
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Convert Currencies</h1>', html)


    # def test_conversion(self):
    #     """Test conversion."""

    #     with self.client:
    #         res = self.client.post('/result', data={'amt':'1'})
    #         self.assertIn(b'1.00', res.data)
    #         self.assertEqual(res.status_code, 200)