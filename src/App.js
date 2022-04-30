import React, {useState,useEffect} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import MarketTrends from './components/MarketTrends/MarketTrends';
import News from './components/News/News';
import Register from './components/Register/Register';
import Footer from './components/Footer/Footer';
import Tower from './components/i/tower.png'
import Knight from './components/i/knight.png'
import {DarkMode} from './context/DarkMode';
import {Currency,MarketData,TopTrending} from './context/Currency';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

export default function App() {
  const [darkMode,setDarkMode] = useState(false);
  const [currency,setCurrency] = useState({
    convert: 'EUR',
    header: '| EUR |',
    symbol: '€'
  });
  const NomicsAPIKey = 'Nomics API Key';
  const [marketData,setMarketData] = useState([]);
  const [topTrending,setTopTrending] = useState([]);
  const FreeNewsOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
      'X-RapidAPI-Key': 'Free News API Key'
    }
  }
  const [NewsData,setNewsData] = useState([]);
  const [TopNews,setTopNews] = useState([]);
  useEffect(()=>{
    fetch(`https://api.nomics.com/v1/currencies/ticker?key=${NomicsAPIKey}&interval=1d&convert=${currency.convert}&per-page=100&page=1`)
    .then(response => response.json())
    .then(data=>{
      const allCurrencies = [];
      for (var i = 0; i < 100; i++) {
        allCurrencies.push({
          rank: data[i].rank,
          logo_url: data[i].logo_url,
          name: data[i].name,
          currency: data[i].currency,
          price: data[i].price,
          price_change: data[i]['1d'].price_change_pct,
          market_cap: data[i].market_cap
        });
      }
      setMarketData(allCurrencies);
      const topCurrencies = [];
      for (var i = 0; i < 7; i++) {
        topCurrencies.push({
          rank: data[i].rank,
          logo_url: data[i].logo_url,
          name: data[i].name,
          currency: data[i].currency,
          price: data[i].price,
          price_change: data[i]['1d'].price_change_pct,
          market_cap: data[i].market_cap
        });
      }
      setTopTrending(topCurrencies);
    });
    fetch('https://free-news.p.rapidapi.com/v1/search?q=cryptocurrency||crypto||nfts&lang=en&page=1&page_size=25',FreeNewsOptions)
    .then(response => response.json())
    .then(data=>{
      const allArticles = [];
      for (var i = 0; i < 25; i++) {
        allArticles.push({
          media: data.articles[i].media,
          title: data.articles[i].title,
          summary: data.articles[i].summary,
          author: data.articles[i].author,
          link: data.articles[i].link,
          clean_url: data.articles[i].clean_url
        });
      }
      setNewsData(allArticles);
      const topArticles = [];
      for (var i = 0; i < 4; i++) {
        topArticles.push({
          media: data.articles[i].media,
          title: data.articles[i].title,
          summary: data.articles[i].summary,
          link: data.articles[i].link,
          clean_url: data.articles[i].clean_url
        });
      }
      setTopNews(topArticles);
    });
  },[]);
  return (
    <div>
      <BrowserRouter>
        <DarkMode.Provider value={{darkMode,setDarkMode}}>
          <Currency.Provider value={{currency,setCurrency}}>
            <MarketData.Provider value={{marketData,setMarketData}}>
              <TopTrending.Provider value={{topTrending,setTopTrending}}>
                <Header Tower={Tower} NomicsAPIKey={NomicsAPIKey}/>
                <Routes>
                  <Route path='/' element={<Home TopNews={TopNews}/>}/>
                  <Route path='/trends' element={<MarketTrends/>}/>
                  <Route path='/news' element={<News NewsData={NewsData}/>}/>
                  <Route path='/register' element={<Register Knight={Knight}/>}/>
                </Routes>
                <Footer/>
              </TopTrending.Provider>
            </MarketData.Provider>
          </Currency.Provider>
        </DarkMode.Provider>
      </BrowserRouter>
    </div>
  );
}
