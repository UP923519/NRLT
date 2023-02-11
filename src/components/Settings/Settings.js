import React from 'react';
import { Link } from 'react-router-dom';

class List extends React.Component {
    render() {
        return (
            <div>
                <h2>Settings</h2>
                <p>Accessibility Options</p>
                <ul>
                    <li><Link to="/react">Toggle Font Size</Link></li>
                </ul>
            </div>
        );
    }
}

export default List;