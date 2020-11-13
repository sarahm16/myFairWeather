import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Results from '../results';
import Navbar from '../../components/navbar';

import './style.css';

import findCompleted from '../../actions/completed';

function CompletedContainer(props) {

    useEffect(() => {
        props.findCompleted(props.id)
    }, [])

    return <div>
        <div className='row'>
            <Navbar page='completed' />
        </div>    
        <div className='completed index-card-bg'>
            <div className='col s8 offset-s2'>
                {/* <Results type='completed-hikes'/> */}
            </div>
        </div>
    </div>
}

const mapDispatchToProps = dispatch => ({
    findCompleted: (id) => dispatch(findCompleted(id))
})

const mapStateToProps = state => ({
    id: state.auth.user.id
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)
 (CompletedContainer);