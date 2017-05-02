import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';

@observer
export default class PropsObserver extends Component {

  static propTypes = {
    propsForChildren: PropTypes.objectOrObservableObject.isRequired,
  };

  render() {
    const { propsForChildren } = this.props;
    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          return React.cloneElement(child, Object.assign({}, propsForChildren, child.props));
        })}
      </div>
    );
  }
}
