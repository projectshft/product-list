
import React, {Component} from 'react';

export default class PageNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    Decrement = () => {
        this.setState({
            page: this.state.page + 1
        })
    }

    Increment = () => {
        this.setState({
            page: this.state.page -1
        })
    }
    
    render() {
        return (
            
            //always add tabindex="-1" on disabled links and use custom JavaScript to fully disable
            <nav aria-label="...">
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <a className="page-link previous" href="#" previous={this.Decrement()}>Previous</a>
                    </li>
                  
                    <li className="page-item">
                        <a className="page-link next" href="#" next={this.Increment()}>Next</a>
                    </li>
                </ul>
            </nav>
        )
    }

}