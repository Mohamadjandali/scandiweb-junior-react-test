import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { APIContext } from '../../Context';
import './categories.css';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 0,
    };
    this.handleClass = this.handleClass.bind(this);
  }

  handleClass(currentIndex) {
    this.setState({ toggle: currentIndex });
  }

  render() {
    const { toggle } = this.state;
    return (
      <div className="categories-list">
        <APIContext.Consumer>
          {({ categories }) => {
            return categories.map(({ name }, index) => (
              <span
                key={name}
                className={toggle === index ? 'underline-overlay' : ''}
                onClick={() => this.handleClass(index)}
              >
                <NavLink to={`/${name}`}>{name}</NavLink>
              </span>
            ));
          }}
        </APIContext.Consumer>
      </div>
    );
  }
}
