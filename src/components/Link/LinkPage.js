import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
    render() {
        return (
            <div>
                <h2>Energy Monitor</h2>
                <p>Please choose an energy plan from the list below</p>
                <ul>
                    <li><Link to="/react">Renewable Unlimited</Link></li>
                </ul>
            </div>
        );
    }
}

export default List;