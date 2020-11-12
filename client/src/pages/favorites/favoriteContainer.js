import React, { useEffect } from 'react';
import Results from '../results';
import Navbar from '../../components/navbar';
import Favorites from './favorites';

import './style.css';

import findFavorites from '../../actions/favorites';
import { connect } from 'react-redux';

const  FavoriteContainer = (props) => {

    //call findFavorites action to get favorites and set the store
    //must put in useEffect hook to ensure it only runs once
    useEffect(() => {
        props.findFavorites(props.id)
    }, [])

    return (<div>
                <div className='row'>
                    <Navbar page='favorites'/>
                </div>
                {/* {!props.isLoading &&
                <div className='favorites index-card-bg'>
                    <div className='col s8 offset-s2'>
                        <Results type='favorite-hikes'/>
                    </div>
                </div>} */}
                {!props.isLoading && <Favorites />}
            </div>) 
        
}

const mapDispatchToProps = dispatch => {
    return {
        findFavorites: (id) => dispatch(findFavorites(id))
    }
}

const mapStateToProps = state => ({
    id: state.auth.user.id,
    isLoading: state.search.isLoading
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (FavoriteContainer);