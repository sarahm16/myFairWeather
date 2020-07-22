import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import HikeCard from '../components/results/hike_card/index';
import Alert from '../components/alert';
import API from '../utils/API';

class Results extends Component  {
    constructor() {
        super();
        this.state = {
            trails: [],
            noTrails: false,
            loading: true,
            page: '',
            pageNumber: 1
        }
    }

    componentDidMount() {
        //this.setState({trails: this.props.trails})
        let id = this.props.auth.user.id

        //function that sets state of component with results of api call
        let useResults = (trailList, page) => {
            if(trailList == '' || trailList.length === 0) {
                this.setState({
                    page: page, //need page to determine which alert will be used for no results
                    noTrails: true, //alerts user that no trails were found
                    loading: false //removes loading bar
                })
            } else {this.setState({ trails: trailList, loading: false })}
        }

        switch (this.props.type) {
            case 'search-results':
                useResults(this.props.trails, 'search-results');
            break;
            case 'favorite-hikes':
                //api call to favorites database, finds all hikes correlated with user id
                API.displayFavorites(id)
                    .then(res => {
                        useResults(res.data, 'favorites')
                    })
                break;
            case 'completed-hikes':
                //api call to completed database, finds all hikes correlated with user id
                API.displayCompleted(id)
                    .then(res => {useResults(res.data, 'completed');
                })
                break;       
            default:
                break;
        }
    }

    nextPage = () => {
        let nextPage = this.state.pageNumber + 1;
        this.setState({pageNumber: nextPage})
    }

    render() {
        let trails = this.state.trails.slice(this.state.pageNumber, this.state.pageNumber * 10)
        
        return(
            <div>
                {/* materialize loading bar for when hikes are loading */}
                {this.state.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div> }
                {/* map the array of trails, create hikecard component for each trail */}
                {trails.map(trail => {
                    return <HikeCard type={this.props.type}
                    id={trail.id}
                    key={trail.id}
                    name={trail.name}
                    difficulty={trail.difficulty}
                    location={trail.location}
                    completedId={trail._id}
                    summary={trail.summary} 
                    latitude ={trail.latitude}
                    longitude = {trail.longitude}
                    userComment = {trail.userComment}
                    high={trail.high}
                    ascent={trail.ascent}
                    imgMedium={trail.imgMedium}
                    length={trail.length}
                    day={trail.day}
                    />
                })}
                {this.props.type === 'search-results' && <button className='load-more btn waves-effect waves-light hoverable blue accent-3' onClick={this.nextPage}>Load More Hikes</button>}
                {/* Alert user when no trails are found. Alert text changes depending on which results are being displayed */}
                {this.state.noTrails &&  <Alert page={this.state.page}/>}
            </div>
        )
    }
}

Results.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps
  )(Results);