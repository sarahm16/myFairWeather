import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from '../../../utils/API';
import Weather from '../../../utils/weather';
import Modal from '../../../pages/completed/modal';
import Hike from '../index';
//import Moment from "moment";
import Timer from '../../timer/timer';

import './style.css';

class HikeCard extends Component {
    constructor() {
        super();
        this.state = {
            show_more: false,
            forecast: [],
            bestDay: [],
            showModal: false,
            userComment: '',
            userImage: [],
            difficulty: [],
            imageArray: [],
            imageNumber: 0
        }
    }

    componentDidMount() {
        let imageArray = this.props.userImage;

        this.props.page === 'completed' ? imageArray.push(this.props.imgMedium) : imageArray = [this.props.imgMedium];

        let ratings = ['green', 'greenBlue', 'blue', 'blueBlack', 'black'];
        let difficulty = ratings.slice(0, ratings.indexOf(this.props.difficulty)+1)
        
        this.setState({
            difficulty: difficulty,
            imageArray: imageArray
        })

        console.log(this.props.page)
    }

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
    }

    nextImage = () => {
        let { imageNumber, imageArray } = this.state;
        if (imageNumber < imageArray.length -1 ) {
            let nextImage = imageNumber + 1;
            this.setState({imageNumber: nextImage});
        }
    }

    prevImage = () => {
        let { imageNumber } = this.state;
        if (imageNumber > 0) {
            let prevImage = imageNumber - 1;
            this.setState({imageNumber: prevImage});
        }
    }

    selectPhoto = (e) => {
        let userImages = []
        e.preventDefault();
        window.cloudinary.openUploadWidget({
            cloudName: 'sarahm16', 
            uploadPreset: 'gvezom1v'}, (error, result) => { 
            if (!error && result && result.event === "success") { 
              console.log('Done! Here is the image info: ', result.info);
              userImages.push(result.info.url) 
              this.setState({userImage: userImages})
            }
        })
    }

    onChange = event => {
        //console.log(event.target.value)
        this.setState({ userComment: event.target.value })
    }
    
    addFav = () => {
        console.log(this.props)
        API.addFavorite(this.props);
    }

    deleteFav = () => {
        API.deleteFavorite(this.props.id, this.props.auth.user.id);
        window.location.reload();
    }

    deleteCompleted = (event) => {
        event.preventDefault();
        API.deleteCompleted(this.props.day, this.props.userComment);
        window.location.reload(false);
    }

    lessInfo = () => {
        this.setState({show_more: false});
    }

    submitComplete = (event) => {
        console.log(this.state.userImage)
        event.preventDefault();
        let completedHike = [this.props];
        completedHike.push({'userComment': this.state.userComment, 'Date': null, userImage: this.state.userImage})
        this.toggleModal();
        API.addComplete(completedHike)
    }

    moreInfo = () => {
        let forecastData =[]
        API.getWeather(this.props)
        .then(res =>{
            for ( let i = 4; i < 40; i=i+8) {
                forecastData.push(res.data.list[i]);
            }
            this.setState({forecast: forecastData});
            return;

        }).then(()=>{
            this.setState({show_more: true});
            return;
        })
        .catch(function (error) {
                console.log(error);
        })   
    }
    
render () {
    return (
        <div className="row">
            <Modal
                //show={true}
                show={this.state.showModal}
                closeCallback={this.submitComplete}
                cancelCallback={this.toggleModal}
                onChangeCallback={(e) => this.onChange(e)}
                selectPhotoCallback={(e) => this.selectPhoto(e)}
                customClass="custom_modal_class"
                commentText={this.state.userComment}
            />
            <div className="col s12 m12 l12">
                <div className="card hoverable border">
                        <div className="card-image">
                        {this.props.page =='completed' && <div className='date'>Completed: {this.props.day}</div>}
                        {/* {this.props.type =='completed-hikes' && <div className='date'>Completed: {Moment(this.props.day).format("MMM Do YYYY")}</div>} */}
                        {this.props.page !=='completed' && <div className='location'>
                                <i className="material-icons">location_on</i> {this.props.location}
                        </div>}
                            {this.props.imgMedium !== '' && <img src={this.state.imageArray[this.state.imageNumber]} alt="hike"/>}
                            {this.props.imgMedium === '' && 
                            <img src='https://live.staticflickr.com/7252/27996230286_73a0ed8a4d_b.jpg' alt = "hike"/>}
                            <div className='hike-name'>
                                <h6 className="card-title bg">{this.props.name}</h6>
                            </div>
                        </div>
                        {this.props.page === 'completed' && <ul className="pagination">
                            <li className="disabled"><button id='prev' onClick={this.prevImage}><i className="material-icons">chevron_left</i></button></li>
                                {this.state.imageArray.map((image, index) => {
                                    return(<li><a href="#!"><i style={{color: 'teal'}} className={index == this.state.imageNumber ? 'material-icons' : 'material-icons material-icons-outlined'}>fiber_manual_record</i></a></li>)
                                })}
                            <li className="waves-effect"><button id='next' onClick={this.nextImage}><i className="material-icons">chevron_right</i></button></li>
                        </ul>}
                        <div className="card-content">
                            <div className = "info-text">                           
                                <div className="col s6 m6 l6">Length: {this.props.length} miles
                                    <br />
                                    Elevation gain: {this.props.ascent} ft
                                </div>

                                <div className='col s6'>
                                    Diffuculty: 
                                    <br />
                                    {this.state.difficulty.map(mountain => {
                                        return(
                                            <i className="small material-icons icon-yellow" key={Math.random(10)}>terrain</i>
                                        )
                                    })}
                                </div>
                                
                                <div className='row'>
                                    <div className='col s12 m12 l12'>
                                        {this.props.type =='completed-hikes' && <p className='report'>Report: {this.props.userComment}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    {this.state.show_more &&
                     <Hike
                        forecast = {this.state.forecast}
                        //bestDay = {this.state.bestDay}
                        summary ={this.props.summary}
                    />
                    //<Timer />
                    }
                    <div className="card-action no-padding">
                        {this.props.page !== 'favorite' && <button className="btn-large btn-by2" onClick={this.addFav}>Save <i className="small material-icons icon-yellow">star</i></button>}

                        {this.props.page !=='completed' &&<button className="btn-large btn-by2" onClick={this.toggleModal}>Complete <i className="small material-icons icon-green">check</i></button>}

                        {this.props.page == 'favorite' && <button className="btn-large btn-by2" id="delete-favorite" onClick={this.deleteFav}>Remove <i className="small material-icons icon-red">delete_forever</i></button>}
                        {this.props.page == 'completed' && <button className="btn-large btn-by2" id="delete-completed" onClick={this.deleteCompleted}>Remove <i className="small material-icons icon-red">delete_forever</i></button>}

                        {!this.state.show_more && <button id="More-Info" onClick={this.moreInfo}>More Info<i className="small material-icons icon-black">expand_more</i></button>}
                        {this.state.show_more && <button id="Less-Info" onClick={this.lessInfo}>Less Info<i className="small material-icons icon-white">expand_less</i></button>}
                    </div>
                </div>
            </div>
        </div>
    )}
}


HikeCard.propTypes = {
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    auth: state.auth,
    page: state.page
});
  
export default connect(
mapStateToProps
)(HikeCard);