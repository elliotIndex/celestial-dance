import 'aframe';
import {Animation, Entity} from 'aframe-react';
import React from 'react';
import { translate, rand, vLog, objToArr, getR,
  massToRadius, filterClose, vectorToString } from '../Helpers/Helpers';
import { getNetAccel } from '../Helpers/AccelerationLogic';

class Force {
  constructor(body1, body2) {
    this.body1 = body1; // super(body1)? super(body1, body2)?
    this.body2 = body2;
    this.vector = new THREE.Vector3();
  }

  update() {
    // get the displacement vector
    const displacement = getR(this.body1, this.body2);
    const distance = Math.max(displacement.length(), MIN_DISTANCE);
    // F_g = G * m1 * m2 * Rvector / r^3
    this.vector.copy(
      displacement.multiplyScalar(
        GRAVITY * body1.mass * body2.mass / MATH.pow(distance, 3)
      )
    );
  }

  apply(dt) {
    // a = F/m
    const accel1 = new THREE.Vector3().copy(this.vector).multiplyScalar(1/body1.mass);
    const accel2 = new THREE.Vector3().copy(this.vector).multiplyScalar(-1/body2.mass);
    // body.velocity += a*dt
    body1.velocity.add(accel1, dt);
    body2.velocity.add(accel2, dt);
  }

  applyOpposite(body, dt) {
    apply(body, dt * -1);
  }
}

// const interact = (body1, body2) => {
//   const force = new Force(body1, body2);
//   force.apply(body1);
//   force.applyOpposite(body2);
// }

AFRAME.registerComponent('step', {
  schema: {
    forces: { default: [] },
  },

  init: function () {
    const dancers = this.el.sceneEl.querySelectorAll('.dancer');
    // make forces between each pair of dancers
    dancers.forEach((dancer, index) => {
      dancer.velocity = new THREE.Vector3();
      dancer.mass = +this.el.attributes.radius.value;
      dancer.id = index;
    });
    for (var i = 0; i < dancers.length; i++) {
      for (var j = i + 1; j < dancers.length; j++) {
        this.data.forces.push(new Force(dancers[i], dancers[j]));
      }
    }
    // give each dancer a velocity, mass
  },

  tick: function (t) {
    for (var i = 0; i < window.forces.length; i++) {
      this.data.forces[i].update();
    }
    const dancers = this.el.sceneEl.querySelectorAll('.dancer');
    // for (var i = 0; i < dancers.length; i++) {
    //   for (var j = i + 1; j < dancers.length; j++) {
    //     interact(dancers[i], dancers[j]);
    //   }
    // }
    // separate loop to update positions after all force calcs are done
    for (var i = 0; i < dancers.length; i++) {
      move(dancers[i]);
    }

    // const thisDancer = {
    //   mass: +this.el.attributes.mass.value,
    //   radius: +this.el.attributes.radius.value,
    //   position: this.el.object3D.position,
    // }
    // let velocity = new THREE.Vector3().fromArray(
    //   this.el.attributes.velocity.value.split(' ').map(i => +i)
    // );
    // let otherDancers = objToArr(this.el.sceneEl.querySelectorAll('.dancer'))
    //   .filter(dancer => dancer !== this.el)
    //   .map(dancer => ({
    //     mass: +dancer.attributes.mass.value,
    //     radius: +dancer.attributes.radius.value,
    //     position: dancer.object3D.position,
    //   }));
    // const netAccel = getNetAccel(thisDancer, otherDancers);
    // velocity = velocity.add(netAccel.multiplyScalar(t/1000)); // addScaledVector doesn't work. lol
    // this.el.setAttribute('velocity', vectorToString(velocity));
    // translate(this.el.object3D, velocity.multiplyScalar(t/10000));
  }
});

module.exports = 'hi';
