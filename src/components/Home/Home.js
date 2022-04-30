import React, {useState,useEffect,useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartSimple,faGlobe} from '@fortawesome/free-solid-svg-icons';
import {DarkMode} from '../../context/DarkMode';
import {Currency,MarketData,TopTrending} from '../../context/Currency';

export default function Home(props) {
  const {darkMode,setDarkMode} = useContext(DarkMode);
  const {currency,setCurrency} = useContext(Currency);
  const {marketData,setMarketData} = useContext(MarketData);
  const {topTrending,setTopTrending} = useContext(TopTrending);
  const [CryptoResult,setCryptoResult] = useState(<div></div>);
  useEffect(()=>{
    setCryptoResult(<div></div>);
  },[]);
  const searchCrypto = (e)=>{
    const CryptoList = [];
    for (var i = 0; i < 100; i++) {
      CryptoList.push(marketData[i].name.toLowerCase());
      CryptoList.push(marketData[i].currency.toLowerCase());
    }
    const Crypto = marketData.filter(crypto=>crypto.name.toLowerCase().includes(e.target.value.toLowerCase()) || crypto.currency.toLowerCase().includes(e.target.value.toLowerCase()));
    if (e.target.value === '' || !CryptoList.includes(e.target.value.toLowerCase())) {
      setCryptoResult(<div className='unsupported'><em>Please enter supported currency</em></div>);
    } else {
      setCryptoResult(
        <div className='CryptoResult'>
          <div><img src={Crypto[0].logo_url}/> <h2>{Crypto[0].name}</h2> <span>({Crypto[0].currency})</span></div>
          <div>&#8226;Last price: <span>{currency.symbol}{Crypto[0].price}</span></div>
          <div>&#8226;24h Change: <span className={Crypto[0].price_change > 0 ? 'up' : 'down'}>{Crypto[0].price_change}%</span></div>
          <div>&#8226;Market Cap: <span>{currency.symbol}{Crypto[0].market_cap}</span></div>
        </div>
      );
    }
  }
  return (
    <main>
      <div className={darkMode ? 'search DarkSearch' : 'search'}>
        <div className='CryptoSearch'>
          <h1>Search currency for market data</h1>
          <input placeholder='ex. Ethereum / ETH' onChange={searchCrypto}/>
          {CryptoResult}
        </div>
      </div>
      <h1 className={darkMode ? 'trendingHeading darkTrendingHeading' : 'trendingHeading'}><FontAwesomeIcon icon={faChartSimple}/> <em>Top Trending</em></h1>
      <div className={darkMode ? 'TopTrending darkTopTrending' : 'TopTrending'}>
        <table>
          <tr>
            <th><h3>Name</h3></th>
            <th><h3>Last Price</h3></th>
            <th><h3>24H Change</h3></th>
            <th><h3>Market Cap</h3></th>
          </tr>
          {
            topTrending.map(crypto=>{
              return (
                <tr className='tableRow'>
                  <td><img src={crypto.logo_url}/> <h3>{crypto.name}</h3> <span>({crypto.currency})</span></td>
                  <td>{currency.symbol}{crypto.price}</td>
                  <td className={crypto.price_change > 0 ? 'up' : 'down'}>{crypto.price_change}%</td>
                  <td>{currency.symbol}{crypto.market_cap}</td>
                </tr>
              );
            })
          }
        </table>
      </div>
      <div className='topNewsMain'>
        <h1 className={darkMode ? 'NewsHeading darkNewsHeading' : 'NewsHeading'}><FontAwesomeIcon icon={faGlobe}/> <em>Top News</em></h1>
        <div className='topNews'>
          {
            props.TopNews.map(article=>{
              return (
                <a href={article.link} target='_blank' className={darkMode ? 'article darkArticle' : 'article'}>
                  <div>
                    <div className='imageDiv'>
                      <img src={article.media}/>
                    </div>
                    <h2>{article.title}</h2>
                    <p className='summary'>{article.summary}</p>
                  </div>
                  <p className='more'>Read more at <span className='blue'>{article.clean_url}</span></p>
                </a>
              );
            })
          }
        </div>
      </div>
    </main>
  );
}
