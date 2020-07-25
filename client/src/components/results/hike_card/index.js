import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import API from '../../../utils/API';
import Weather from '../../../utils/weather';
import Modal from '../../../pages/completed/modal';
import Hike from '../../hike';
import Moment from "moment";

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
        this.props.type === 'completed-hikes' ? imageArray.unshift(this.props.imgMedium) : imageArray = [this.props.imgMedium];
        
        let ratings = ['green', 'greenBlue', 'blue', 'blueBlack', 'black'];
        let difficulty = ratings.slice(0, ratings.indexOf(this.props.difficulty)+1)
        
        this.setState({
            difficulty: difficulty,
            imageArray: imageArray
        })
    }

    toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
    }

    nextImage = () => {
        let nextImage = this.state.imageNumber + 1;
        this.setState({imageNumber: nextImage});
    }

    prevImage = () => {
        let prevImage = this.state.imageNumber - 1;
        this.setState({imageNumber: prevImage});
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
        console.log(event.target.value)
        this.setState({ userComment: event.target.value })
    }
    
    addFav = () => {
        API.addFavorite(this.props);
    }

    deleteFav = () => {
        API.deleteFavorite(this.props.id, this.props.auth.user.id);
        window.location.reload();
    }

    handleClick = event => {
        event.preventDefault();
        console.log(event.currentTarget.id)
        switch (event.currentTarget.id) {
            // case "Add-to-favs":
            //     console.log(this.props)
            //     API.addFavorite(this.props);
            //     break;
            // case "Mark-complete":
            //     this.toggleModal()
            //     break;
            // case 'delete-favorite':
            //     API.deleteFavorite(this.props.id, this.props.auth.user.id)
            //     window.location.reload()
            //     break;
            case "More-Info":
                let forecastData =[]
                API.getWeather(this.props)
                .then(res =>{
                    for ( let i = 4; i < 40; i=i+8) {
                        forecastData.push(res.data.list[i]);
                    }
                    this.setState({forecast: forecastData});
                    return;
                }).then(() =>{
                    let bestTemp = Weather.getBestDay(this.state.forecast);
                    return bestTemp;
                })
                .then((bestTemp)=>{
                    let bestWeather = Weather.bestWeather(bestTemp);
                    return bestWeather;
                })
                .then((res)=>{
                    let sorted = Weather.weatherSort(res);
                    let bestWeather;
                    if(sorted.constructor === Array){
                        bestWeather = sorted;
                    } else{
                        bestWeather = [sorted];
                    }
                    this.setState({
                        bestDay: bestWeather,
                    })
                    return;
                }).then(()=>{
                    this.setState({show_more: true});
                    return;
                })
                .catch(function (error) {
                        console.log(error);
                })   
                break;
            case 'Less-Info':
                this.setState({show_more: false});
                break;
            case 'submit-complete':
                let completedHike = [this.props];
                completedHike.push({'userComment': this.state.userComment, 'Date': null, userImage: this.state.userImage})
                console.log(completedHike)
                this.toggleModal();
                API.addComplete(completedHike)
                break;
            case 'delete-completed':
                API.deleteCompleted(this.props.day, this.props.userComment);
                window.location.reload(false)
                break;
            // case 'cancel-submit':
            //     this.toggleModal();
            //     break;

            default:
                console.log(event.currentTarget);
                break;
        }
    }
    
render () {
    return (
        <div className="row">
            <Modal
                show={this.state.showModal}
                closeCallback={(e) => this.handleClick(e)}
                cancelCallback={this.toggleModal}
                onChangeCallback={(e) => this.onChange(e)}
                selectPhotoCallback={(e) => this.selectPhoto(e)}
                customClass="custom_modal_class"
                commentText={this.state.userComment}
            />
            <div className="col s12 m12 l12">
                <div className="card hoverable border">
                        <div className="card-image">
                        {this.props.type =='completed-hikes' && <div className='date'>Completed: {Moment(this.props.day).format("MMM Do YYYY")}</div>}
                        {this.props.type !=='completed-hikes' && <div className='location'>
                                <i className="material-icons">location_on</i> {this.props.location}
                        </div>}
                            {this.props.imgMedium !== '' && <img src={this.state.imageArray[this.state.imageNumber]} alt="hike"/>}
                            {this.props.imgMedium === '' && 
                            <img src='https://live.staticflickr.com/7252/27996230286_73a0ed8a4d_b.jpg' alt = "hike"/>}
                            <div className='hike-name'>
                                <h6 className="card-title bg">{this.props.name}</h6>
                            </div>
                        </div>
                        {this.props.type === 'completed-hikes' && <ul className="pagination">
                            <li className="disabled"><button id='prev' onClick={this.prevImage}><i className="material-icons">chevron_left</i></button></li>
                                {this.state.imageArray.map((image, index) => {
                                    return(<li><a href="#!"><i style={{color: index == this.state.imageNumber ? 'teal' : 'gray'}} className={index == this.state.imageNumber ? 'material-icons material-icons-outlined' : 'material-icons'}>fiber_manual_record</i></a></li>)
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
                    
                    {this.state.show_more && <Hike
                        forecast = {this.state.forecast}
                        bestDay = {this.state.bestDay}
                        summary ={this.props.summary}
                    />}
                    <div className="card-action no-padding">
                        {this.props.type !== 'favorite-hikes' && <button className="btn-large btn-by2" onClick={this.addFav}>Add to Favorites <i className="small material-icons icon-yellow">star</i></button>}

                        {this.props.type !=='completed-hikes' &&<button className="btn-large btn-by2" onClick={this.toggleModal}>Complete <i className="small material-icons icon-green">check</i></button>}

                        {this.props.type == 'favorite-hikes' && <button className="btn-large btn-by2" id="delete-favorite" onClick={this.deleteFav}>Remove <i className="small material-icons icon-red">delete_forever</i></button>}
                        {this.props.type == 'completed-hikes' && <button className="btn-large btn-by2" id="delete-completed" onClick={(e) => this.handleClick(e)}>Remove <i className="small material-icons icon-red">delete_forever</i></button>}

                        {!this.state.show_more && <button id="More-Info" onClick={(e) => this.handleClick(e)}>More Info<i className="small material-icons icon-black">expand_more</i></button>}
                        {this.state.show_more && <button id="Less-Info" onClick={(e) => this.handleClick(e)}>Less Info<i className="small material-icons icon-white">expand_less</i></button>}
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
auth: state.auth
});
  
export default connect(
mapStateToProps
)(HikeCard);