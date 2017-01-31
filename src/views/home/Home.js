import React, {Component} from 'react';

import {HomeContainer} from 'container';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <HomeContainer/>
            </div>
        );
    }
}

export default Home;