import 'aframe';
import {Animation, Entity} from 'aframe-react';
import React from 'react';
import { translate, rand, vLog, objToArr,
  massToRadius } from '../Helpers/Helpers';
import { getNetAccel } from '../Helpers/AccelerationLogic';
import Nothing from '../Simulation/Step'

class Dancer extends React.Component {
  constructor(props) {
    super(props);
    this.mass = props.mass || rand(2, 1000);
  }

  render() {
    console.log('props:', this.props);
    return (
      <a-sphere color={this.props.color} radius={massToRadius(this.mass)}
        class='dancer' mass={this.mass} step
        velocity={this.props.velocity.join(' ')}
        position={this.props.position.join(' ')}
      />
    );
  }
}

module.exports = Dancer;
