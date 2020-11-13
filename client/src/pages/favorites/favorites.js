import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HikeCard from '../../components/hike/hike_card/index';

import Results from '../results';

const Favorites = () => {

    return(
        <div>
            <Results />
        </div>
    )
}

export default Favorites;