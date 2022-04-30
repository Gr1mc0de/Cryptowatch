import React, {useContext} from 'react';
import {DarkMode} from '../../context/DarkMode';

export default function Footer() {
    const {darkMode,setDarkMode} = useContext(DarkMode);
    return (
        <footer className={darkMode ? 'Footer DarkFooter' : 'Footer'}>
            <p>Crypto market cap & pricing data provided by <a href='https://nomics.com' target='_blank'>Nomics</a></p>
            <p>News fetched from the <a href='https://newscatcherapi.com/' target='_blank'>&lt;/newscatcher&gt;</a> Free News API</p>
            <p>Website created by <a href='https://github.com/Gr1mc0de' target='_blank'>Grimc0de</a></p>
        </footer>
    );
}
