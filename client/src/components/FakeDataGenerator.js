import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRandomData } from '../actions/index';
import { Button } from 'react-bootstrap';

const FakeDataGenerator = (props) => {
    return (
        <Button
            variant="info"
            onClick={ (event) => {
                event.preventDefault();
                props.getRandomData(() => {
                    props.history.push('/');
                });

            }}
        >
            Generate Random Data
        </Button>
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getRandomData }, dispatch);
}

export default connect(null, mapDispatchToProps)(FakeDataGenerator);

