import React from 'react';
import Results from '../results';
import Navbar from '../../components/navbar';

import './style.css'

function FavoriteContainer() {
    return <div>
        <div className='row'>
            <Navbar page='favorites'/>
        </div>
        <div className='favorites index-card-bg'>
            <div className='col s8 offset-s2'>
                <Results type='favorite-hikes'/>
            </div>
        </div>
    </div> 
}

export default FavoriteContainer;