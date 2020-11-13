import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HikeCard from '../../components/hike/hike_card/index';

import Results from '../results';

const Favorites = (props) => {

    //let trails = props.results;

    return(
        <div>
            <Results />
        </div>
    )

    // return <div>
    //     {trails.map(trail => {
    //         return <HikeCard
    //         id={trail.id}
    //         key={trail.id}
    //         name={trail.name}
    //         difficulty={trail.difficulty}
    //         location={trail.location}
    //         completedId={trail._id}
    //         summary={trail.summary} 
    //         latitude ={trail.latitude}
    //         longitude = {trail.longitude}
    //         userComment = {trail.userComment}
    //         userImage = {trail.userImage}
    //         high={trail.high}
    //         ascent={trail.ascent}
    //         imgMedium={trail.imgMedium}
    //         length={trail.length}
    //         day={trail.day}
    //         />
    //     })} </div>
}

const mapStateToProps = state => ({
    results: state.search.results
})

export default connect(
    mapStateToProps
)
(Favorites);