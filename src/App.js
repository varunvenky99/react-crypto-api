import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Coin from "./Coin";
import Spinner from "react-spinkit";

function App() {
  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (coins.length > 0) {
      setLoading(false);
    }
  }, [coins]);

  console.log(loading);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  if (loading) {
    return (
      <div className="spinner">
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </div>
    );
  } else {
    return (
      <div className="coin-app">
        <div className="coin-search">
          <h1 className="coin-text">Seach a currency</h1>
          <form>
            <input
              type="text"
              className="coin-input"
              placeholder="Search"
              onChange={handleChange}
            />
          </form>
        </div>

        {filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => {
            return (
              <Coin
                key={coin.id}
                name={coin.name}
                price={coin.current_price}
                image={coin.image}
                symbol={coin.symbol}
                volume={coin.total_volume}
                priceChange={coin.price_change_percentage_24h}
                marketcap={coin.market_cap}
              />
            );
          })
        ) : (
          <h2>No search results found</h2>
        )}
      </div>
    );
  }
}

export default App;
