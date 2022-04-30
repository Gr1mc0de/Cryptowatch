import React, {useState,useContext} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight} from '@fortawesome/free-solid-svg-icons';
import {DarkMode} from '../../context/DarkMode';
import {Currency,MarketData} from '../../context/Currency';

export default function MarketTrends(props) {
  const {darkMode,setDarkMode} = useContext(DarkMode);
  const {currency,setCurrency} = useContext(Currency);
  const {marketData,setMarketData} = useContext(MarketData);
  const [page,setPage] = useState(0);
  const changePage = ({selected})=>{
    setPage(selected);
  }
  const displayCrypto = marketData.slice(page * 25, page * 25 + 25).map(crypto=>{
    return (
      <tr className='tableRow'>
        <td className='rank'>{crypto.rank}</td>
        <td><img src={crypto.logo_url}/> {crypto.name} <span>({crypto.currency})</span></td>
        <td>{currency.symbol}{crypto.price}</td>
        <td className={crypto.price_change > 0 ? 'up' : 'down'}>{crypto.price_change}%</td>
        <td>{currency.symbol}{crypto.market_cap}</td>
      </tr>
    );
  });
  return (
    <main className={darkMode ? 'MarketTrends darkMarketTrends' : 'MarketTrends'}>
      <table>
        <tr>
          <th><h3>Rank</h3></th>
          <th><h3>Name</h3></th>
          <th><h3>Last Price</h3></th>
          <th><h3>24H Change</h3></th>
          <th><h3>Market Cap</h3></th>
        </tr>
        {displayCrypto}
      </table>
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={4}
        onPageChange={changePage}
        containerClassName={darkMode ? 'pageNav darkPageNav' : 'pageNav'}
        activeClassName={darkMode ? 'active activeDark' : 'active'}
        disabledClassName={'navDisabled'}
      />
    </main>
  );
}
