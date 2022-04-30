import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoon,faSun} from '@fortawesome/free-solid-svg-icons';
import {DarkMode} from '../../context/DarkMode';
import {Currency,MarketData,TopTrending} from '../../context/Currency';
import CurrencyData from '../../data/CurrencyData';

export default function Header(props) {
    const {darkMode,setDarkMode} = useContext(DarkMode);
    const {currency,setCurrency} = useContext(Currency);
    const {marketData,setMarketData} = useContext(MarketData);
    const {topTrending,setTopTrending} = useContext(TopTrending);
    const displayLogin = () => {
        document.querySelector('.currencySelektor').classList.remove('currencyDisplay');
        document.querySelector('.Login').classList.toggle('loginDisplay');
    }
    const displayCurrency = () => {
        document.querySelector('.Login').classList.remove('loginDisplay');
        document.querySelector('.currencySelektor').classList.toggle('currencyDisplay');
    }
    const changeCurrency = (index) => {
        setCurrency(CurrencyData[index]);
        fetch(`https://api.nomics.com/v1/currencies/ticker?key=${props.NomicsAPIKey}&interval=1d&convert=${CurrencyData[index].convert}&per-page=100&page=1`)
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
    }
    return (
        <header className={darkMode ? 'Header DarkHeader' : 'Header'}>
            <Link to='/' className='mainHeading'>
                <img src={props.Tower}/>
                <h1>CRYPTOWATCH</h1>
            </Link>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/trends'>Market trends</Link>
                <Link to='/news'>News</Link>
                <Link to='/register'>Register</Link>
                <p onClick={displayLogin}>Login</p>
                <div className={darkMode ? 'Login DarkLogin' : 'Login'}>
                    <input placeholder='Username'/>
                    <input placeholder='Password' type='password'/>
                    <button>Login</button>
                </div>
                <p onClick={displayCurrency}>{currency.header}</p>
                <div className={darkMode ? 'currencySelektor DarkCurrency' : 'currencySelektor'}>
                    {
                        CurrencyData.map(c=>{
                            return (<p onClick={(e)=>{changeCurrency(c.id); displayCurrency()}}>{c.convert} - <strong>{c.symbol}</strong></p>);
                        })
                    }
                </div>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className='moonSun' onClick={()=>setDarkMode(!darkMode)}/>
            </nav>
        </header>
    );
}
