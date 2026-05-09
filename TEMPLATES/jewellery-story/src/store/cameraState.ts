import * as THREE from "three";

export const cameraState = {
  // Camera Transform
  position: new THREE.Vector3(0, 0, 5),
  lookAt: new THREE.Vector3(0, 0, 0),
  
  // Depth of Field Focus Distance (GSAP will animate this value)
  // Higher value = focusing further away
  dofFocus: 5,
  
  // Spotlight Position to create moving glares
  lightPosition: new THREE.Vector3(10, 10, 10),
};
