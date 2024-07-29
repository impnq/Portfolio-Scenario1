import React, { useEffect, useRef, useState } from "react";
import gsap from 'gsap';
import {
  useGLTF,
  useAnimations,
  Html,
  useVideoTexture,
} from "@react-three/drei";

import * as THREE from 'three'
import { Canvas, useFrame,useThree  } from '@react-three/fiber'
import { useRoute, useLocation } from 'wouter'
import { easing } from 'maath'

function ScreenEmulator({ x, y, z, ry }) {
  const divRef = useRef();

  return (
    <group position={[x, y, z]} rotation={[0, ry, 0]}>
      <Html transform>
        <div
          ref={divRef}
          style={{
            width: "64px",
            height: "36px",
            // width: "1280px",
            // height: "720px",
            backgroundColor: "#000",
            overflow: "hidden",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
            src={`https://windows11-emulator.onrender.com/`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>
      </Html>
    </group>
  );
}

export function Model(props) {
  const group = useRef();
  const ref = useRef();
  const clickedObject = useRef(null);
  const { camera, scene, gl  } = useThree();
  const [isZoomed, setIsZoomed] = useState(false);
  

  const { nodes, materials, animations } = useGLTF("/newScene-transformed.glb");
  const { actions } = useAnimations(animations, group);
  const textureVSCode = useVideoTexture("textures/vscode.mp4");

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      // Calculate objects intersecting the ray
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const firstIntersected = intersects[0].object;

        if (firstIntersected === ref.current) {
          if (!isZoomed) {
            // Zoom in on Object_34
            const boundingBox = new THREE.Box3().setFromObject(ref.current);
            const center = boundingBox.getCenter(new THREE.Vector3());
            const size = boundingBox.getSize(new THREE.Vector3());
            const maxSize = Math.max(size.x, size.y, size.z);
            const distance = maxSize / (2 * Math.tan(Math.PI * camera.fov / 360));

            const offset = 0.26;
            const targetPosition = new THREE.Vector3(center.x + offset, center.y - 0.03, center.z + distance - 0.05);

            gsap.to(camera.position, {
              duration: 3,
              x: targetPosition.x,
              y: targetPosition.y,
              z: targetPosition.z,
              onUpdate: () => camera.lookAt(center.x, center.y, center.z),
            });
            const iframe = document.createElement('iframe');
            iframe.id = 'embedded-iframe';
            iframe.src = 'https://windows11-emulator.onrender.com/';
            iframe.style.position = 'fixed';
            iframe.style.left = '50%';
            iframe.style.top = '45%';
            iframe.style.rotate = '-4.5deg';
            iframe.style.transform = 'translate(-50%, -50%)';
            iframe.style.width = '63%'; // Adjust as needed
            iframe.style.height = '63%'; // Adjust as needed
            iframe.style.border = 'none';
            iframe.style.zIndex = '9999';
            document.body.appendChild(iframe);
            setIsZoomed(true);
          }
        } else if (isZoomed) {
          const iframe = document.getElementById('embedded-iframe');
          if (iframe) {
            document.body.removeChild(iframe);
          }

          // Reset camera position and rotation if any other object is clicked while zoomed in
          const targetPosition = new THREE.Vector3(
            props.cameraPosition.x,
            props.cameraPosition.y,
            props.cameraPosition.z
          );
          const targetRotation = new THREE.Euler(
            props.cameraRotation.x,
            props.cameraRotation.y,
            props.cameraRotation.z
          );

          gsap.to(camera.position, {
            duration: 3,
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            onUpdate: () => camera.lookAt(scene.position),
          });
          gsap.to(camera.rotation, {
            duration: 3,
            x: targetRotation.x,
            y: targetRotation.y,
            z: targetRotation.z,
          });

          setIsZoomed(false);
        }
      }
    };

    // Add event listener for mouse clicks
    window.addEventListener('click', onClick);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [camera, isZoomed, props.cameraPosition, props.cameraRotation, scene.children]);



  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group
          name="CharacterSpot"
          position={[-1.52, -0.04, -1.22]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={2}
        ></group>
        
        <mesh
          name="Object_23"
          geometry={nodes.Object_23.geometry}
          material={materials.PaletteMaterial001}
          position={[-2.845, 1.371, -1.386]}
          scale={1.205}
        />
        <mesh
          name="Object_16"
          geometry={nodes.Object_16.geometry}
          material={materials.base_cama}
          position={[-1.049, -0.692, 1.149]}
          scale={1.419}
        />
        <mesh
          name="Object_4"
          geometry={nodes.Object_4.geometry}
          material={materials.pared}
          position={[0.095, -0.373, 0.14]}
          scale={4.819}
        />
        <mesh
          name="Object_5"
          geometry={nodes.Object_5.geometry}
          material={materials.suelo}
          position={[0.095, -0.373, 0.14]}
          scale={4.819}
        />
        <mesh
          name="Object_55"
          geometry={nodes.Object_55.geometry}
          material={materials.libro}
          position={[-2.771, 4.559, -3.744]}
          rotation={[Math.PI, 0, 2.849]}
          scale={[0.085, 0.433, 0.303]}
        />
        <mesh
          name="Object_31"
          geometry={nodes.Object_31.geometry}
          material={materials.pcinsidenormal}
          position={[-3.958, 1.431, -3.489]}
          scale={0.077}
        />
        
        <mesh
          name="Object_34"
          geometry={nodes.Object_34.geometry}
          material={materials.screen}
          position={[-3.781, 2.47, -1.132]}
          scale={1.456}
          // onClick={(e) => (e.stopPropagation(),handleClick(ref.current))}
          ref={ref}
        >
          {/* {isZoomed && <ScreenEmulator x={0} y={0} z={0.01} ry={Math.PI / 2} />} */}
          {/* <ScreenEmulator x={0} y={0} z={0} ry={Math.PI / 2} /> */}
        </mesh>
        
        <mesh
          name="Object_37"
          geometry={nodes.Object_37.geometry}
          material={materials.PaletteMaterial002}
          position={[-2.793, 1.422, -2.237]}
          scale={[0.137, 0.04, 0.083]}
        />
        
        <mesh
          name="Object_42"
          geometry={nodes.Object_42.geometry}
          material={materials.PaletteMaterial003}
          position={[-2.859, 1.4, -0.919]}
          scale={[0.266, 0.019, 0.797]}
        />
        
      </group>
    </group>
  );
}



useGLTF.preload("/newScene-transformed.glb");
