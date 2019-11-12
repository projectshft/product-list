import React, { Component } from "react";
import { Pagination } from 'react-bootstrap';

class NextPage extends Component {
    render() {

        return (
            <div className="nextPage">
                <nav aria-label="...">
                    <ul className="pagination pagination-sm">
                        <li className="page-item active" aria-current="page">
                            <span className="page-link">
                                1
                         <span className="sr-only">(current)</span>
                            </span>
                        </li>
                        <Pagination className="page-item"><a className="page-link" href="#">2</a></Pagination>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                        <li className="page-item"><a className="page-link" href="#">6</a></li>
                        <li className="page-item"><a className="page-link" href="#">7</a></li>
                        <li className="page-item"><a className="page-link" href="#">8</a></li>
                        <li className="page-item"><a className="page-link" href="#">9</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default NextPage;