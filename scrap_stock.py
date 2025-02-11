from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/scrape-stock-data', methods=['GET'])
def scrape_stock_data():
    try:
        # Replace with the actual URL you want to scrape
        url = "https://finance.yahoo.com/quote/AAPL/"
        response = requests.get(url)
        response.raise_for_status()

        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract data (adjust this based on the website's structure)
        stock_data = []
        for row in soup.select('table.stocks tr'):
            cells = row.find_all('td')
            if len(cells) == 5:  # Adjust based on the number of columns
                stock_data.append({
                    "name": cells[0].text.strip(),
                    "currentPrice": cells[1].text.strip(),
                    "openPrice": cells[2].text.strip(),
                    "highPrice": cells[3].text.strip(),
                    "lowPrice": cells[4].text.strip(),
                })

        return jsonify(stock_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)