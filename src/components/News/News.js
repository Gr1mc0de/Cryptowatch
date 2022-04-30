import React, {useState,useContext} from 'react';
import ReactPaginate from 'react-paginate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGlobe} from '@fortawesome/free-solid-svg-icons';
import {DarkMode} from '../../context/DarkMode';

export default function News(props) {
  const {darkMode,setDarkMode} = useContext(DarkMode);
  const [page,setPage] = useState(0);
  const changePage = ({selected}) => {
    setPage(selected);
  }
  const displayNews = props.NewsData.slice(page * 5, page * 5 + 5).map(article=>{
    return (
      <a href={article.link} target='_blank' className={darkMode ? 'NewsArticle darkNewsArticle' : 'NewsArticle'}>
        <div className='articleImage'>
          <img src={article.media}/>
        </div>
        <div className='articleText'>
          <div>
            <h2>{article.title}</h2>
            <p className='summary'>{article.summary}</p>
          </div>
          <p>Read more at <span className='blue'>{article.clean_url}</span></p>
        </div>
        <FontAwesomeIcon icon={faGlobe} className='globe'/>
      </a>
    );
  });
  return (
    <main className='News'>
      {displayNews}
      <br/>
      <ReactPaginate
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={5}
        onPageChange={changePage}
        containerClassName={darkMode ? 'pageNav darkPageNav' : 'pageNav'}
        activeClassName={darkMode ? 'active activeDark' : 'active'}
        disabledClassName={'navDisabled'}
      />
    </main>
  );
}
