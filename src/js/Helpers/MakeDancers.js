import { rand, randColor } from './Helpers';
import { GRAVITY } from './Constants';
const baseSpeed = 11e-1;

const makeDancer = (mass, position, velocity, color = "#22A") => ({
  mass, position, velocity, color
});

const makeRandDancer = () => {
  return makeDancer(
    rand(100, 1000),
    [rand(-10, 10), rand(-10, 10), rand(-50, -30)],
    [rand(-baseSpeed, baseSpeed), rand(-baseSpeed, baseSpeed), rand(-baseSpeed, baseSpeed)],
    randColor()
  );
}

const makeXDancer = () => {};
const makeYDancer = () => {};
const makeZDancer = () => {};

const planeToPosition = {
  x: 1,
  y: 2,
  z: 0,
}
const planeToVelocity = {
  x: 2,
  y: 0,
  z: 1,
}
const makeOrbitalDancer = (dancer, plane, sign) => {
  const mass = rand(0, dancer.mass/100);
  const orbitRadius = rand(0, dancer.mass/100);
  const speed = sign * Math.sqrt(GRAVITY * (mass + dancer.mass) / orbitRadius);
  const position = dancer.position.slice();
  const velocity = [0, 0, 0];
  position[planeToPosition[plane]] += sign * orbitRadius;
  velocity[planeToVelocity[plane]] = speed;
  return makeDancer(mass, position, velocity, randColor());
}
// const makeOrbitalDancer = (dancer, plane, sign = 1) => {
//   const mass = rand(0, dancer.mass/100);
//   const orbitRadius = rand(0, dancer.mass/100);
//   const velocity = Math.sqrt(GRAVITY * (mass + dancer.mass) / orbitRadius);
//   return makeDancer(
//     mass,
//     [dancer.position[0] + sign * orbitRadius, dancer.position[1], dancer.position[2]],
//     [0, sign * velocity, 0],
//     randColor()
//   )
//   // IDEAL:
//   // put in rand position near dancer
//   // the velocity has to be in the plane perpendicular to the
//     // displacement vector
//   // the magnitude of the velocity can be found with r, m1, m2
//   // we could add user interaction this way
//   // the cursor defines a ray, we spawn a planet with initial velocity
//     // along that ray, and position that corresponds to where displacement
//     // is perpendicular to
// }

module.exports = {
  makeDancer, makeRandDancer, makeOrbitalDancer
}
