import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import HikeCard from '../components/hike/hike_card/index';
import Alert from '../components/alert';
import API from '../utils/API';

class Results extends Component  {
    constructor() {
        super();
        this.state = {
            trails: [],
            noTrails: false,
            loading: false,
            page: '',
            pageNumber: 1
        }
    }

    componentDidMount() {
        //this.setState({trails: this.props.trails})
        //let id = this.props.auth.user.id

        // switch (this.props.type) {
        //     case 'completed-hikes':
        //         //api call to completed database, finds all hikes correlated with user id
        //         API.displayCompleted(id)
        //             .then(res => {
        //                 console.log(res.data);
        //                 //useResults(res.data, 'completed');
        //         })
        //         break;       
        //     default:
        //         break;
        // }
        console.log(this.props.results)

        this.setState({
            trails: this.props.results.slice(0, 10)
        })
    }

    nextPage = () => {
        let nextPage = this.state.pageNumber + 1;
        //console.log(this.props.results)
        let trails = this.props.results.slice(this.state.pageNumber * 10, this.state.pageNumber * 10 + 10)
        this.setState({
            pageNumber: nextPage,
            trails: trails
        })
    }

    render() {
        //let trails = this.props.results.trails.slice(this.state.pageNumber, this.state.pageNumber * 10)
        
        return(
            <div>
                {/* materialize loading bar for when hikes are loading */}
                {this.state.loading &&
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div> }
                {/* map the array of trails, create hikecard component for each trail */}
                {this.state.trails.map(trail => {
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
                    userImage = {trail.userImage}
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
    auth: state.auth,
    search: state.search,
    results: state.search.results
  });
  
  export default connect(
    mapStateToProps
  )(Results);