# Interview Bot, An interview practice platform

![Search](https://github.com/mike4344/Interview-Bot/blob/main/react-app/public/robotsplash.gif?raw=true)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Stock Profile and Chart (MVP #3)
When a user selects a stock from the search bar or clicks a link from the holdings table or watchlist, they will be brought to a stock profile page (see image below; Robinhunt left, Robinhood right). The stock page renders a line chart using a LightWeight chart line series template that I styled to look like Robinhood's. This chart loads historical 1min time-series data from AlphaAdvantage first, and then opens a websocket from Finnhub API for the selected stock in order to receive real-time pricing updates as orders are placed. Below the chart lives the company profile information and financial stats from AlphaVantage for the selected stock.

![Stock Chart](https://github.com/eramsay20/robinhunt/blob/main/assets/completed/stock_page_chart_info.png?raw=true)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### News Feed & Watchlists (Bonus #1, #2)
The news feed and watchlists rendered on the portfolio page are the first two bonus features I was able to implement. The news feed makes an API call to Finnhub that fetches the latest 100 market news stories available from Finnhub and filters them to show the latest 5 instead. The watchlist on the right half of the screen shows a list of watchlist items that contain a link to the watchlist item's stock page and displays its current price whenever the page is refreshed.

Users can also click the plus button in the top right corner of the watchlist component to open a hidden form allowing the user to create a new watchlist. Likewise, a user can click the 'Remove List' button at the bottom of the container to delete whichever list is currently selected from the dropdown select field above the watchlist items.

![News & Watchlist](https://github.com/eramsay20/robinhunt/blob/main/assets/completed/news_watchlists.png?raw=true)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### Order Execution & Watchlist Updates (Bonus #3)
Another key bonus feature was the order execution component on the stock profile page. The right side of the screen displays an order summary form that allows users to buy or sell shares of the selected stock. The user selects an order type (buy vs sell), enters the number of shares they wish to purchase or sell, and then sees the estimated cost or return value for the given order type which updates in real-time as the price socket info is added to the chart. Once a positive quantity of shares has been provided and the estimated cost/value figure displayed is greater than zero, a user clicks a 'Review Order' button and can view a confirmation message summarizing the trade details before clicking either 'Confirm' or 'Cancel'.

Assuming the user has either enough funds to purchase the shares, they will be allow to click confirm and purchase shares. A similar validation check is performed for sell orders, but instead checks that the user has enough shares to satisfy the order. When confirmed, an 'order complete!' animation appears in place of the confirmation text and then redirects the user back to the portfolio page after ~3 seconds to see their order now reflected in their holdings summary and their new cash balance updated.

Below the order form lives an 'Update Watchlists' button, which when clicked reveals a hidden form with buttons to add or remove the stock from a selected watchlist.

![Orders](https://github.com/eramsay20/robinhunt/blob/main/assets/completed/order_exec_watchlist.png?raw=true)


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

### History Transaction Ledger (Bonus #4)
The last bonus feature added was a history tab to help fill white space in the nav bar and make it easier for users to see a record of their trades. When clicked from the nav bar, the user is brought to a History page that shows their name and a ledger of trade transactions. Each ledger item shows details for a given trade, including the stock, order type, execution time and total amount spent or gained as a result.

![History](https://github.com/eramsay20/robinhunt/blob/main/assets/completed/history.png?raw=true)


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

For more info about what went into to making this project, checkout the full planning documentation links outlined in the project wiki page, [here!](https://github.com/eramsay20/robinhunt/wiki).
