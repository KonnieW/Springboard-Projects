from logging import exception
from flask import Flask, request, render_template, flash
from forex_python.converter import CurrencyRates, CurrencyCodes, Decimal

app = Flask(__name__)
app.config["SECRET_KEY"] = "secretssss"

CR = CurrencyRates()
CC = CurrencyCodes()


@app.route('/')
def convert():
    return render_template('converter.html')


@app.route('/result', methods=['POST', 'GET'])
def result():
    try:
        request.method == 'POST'
        CF = request.form.get('CF').upper()
        CT = request.form.get('CT').upper()
        amt = request.form.get('amt')

        rate = CR.convert(CF, CT, Decimal(amt))
        rounded_rate = round(rate, 2)
        symbol = CC.get_symbol(CT)
        convert = {'CF': CF, 'CT': CT, 'amt': amt, 'rate': rounded_rate, 'symbol': symbol}
        return render_template("result.html", convert = convert)
    
    except:
        flash("Not a valid amount/code! Please input valid amount/currency codes!") 
        return render_template("converter.html")
