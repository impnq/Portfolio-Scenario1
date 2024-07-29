import { Avatar } from "./components/Model/Avatar";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import React, { useState } from "react";
import "./components/NavigationBar/NavigationBar";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { Interface } from "./components/ScrollItem/Interface";
import { useControls } from "leva";
import { animate, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { Leva } from "leva";
import { Experience } from "./components/ScrollItem/Experience";
import ScrollManager from "./components/NavigationBar/ScrollManager";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen";
import { CursorController } from "./components/CursorController/CursorController";
import Background from "./components/Background/Background"


function Model3D() {
  const [section, setSection] = useState(0);
  const [started, setStarted] = useState(false);  

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, 0, {
      type: "spring",
      mass: 5,
      stiffness: 500,
      damping: 50,
      restDelta: 0.01,
    });
    // animate(cameraLookAtX, isClickedComputer ? 5 : 0, {
    //   type: "spring",
    //   mass: 5,
    //   stiffness: 500,
    //   damping: 50,
    //   restDelta: 0.01,
    // });
    // console.log(isClickedComputer);
  });

  return (
    <>
    {/* <LoadingScreen started={started} setStarted={setStarted} /> */}
      <Canvas style={{ height: "100%" }} >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={10} />
        <ScrollControls pages={7} damping={0.1}>
          
          <ScrollManager section={section} onSectionChange={setSection} />
          {/* <motion.group
            rotation={[0.4, -Math.PI / 5, 0.1]}
            scale={0.5}
            position={[1.5, -0.5, 0]}
            // animate={{ x: -0.7, y: -1.6, z: 5.8, rotateY: -Math.PI / 2 }}
          >
            <Model />
            <group
              name="CharacterSpot"
              position={[-1.52, -0.04, -1.22]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={2}
            >
              <Avatar animation={animation} />
            </group>
          </motion.group> */}

          <Scroll>
            <Experience/>
          </Scroll>

          <Scroll html>
            {/* <About /> */}
            <Interface />
          </Scroll>
          
        </ScrollControls>
        {/* <OrbitControls minDistance={2} maxDistance={10} /> */}
      </Canvas>
      <Leva hidden/>
    </>
  );
}



function App() {
  return (
    <div className="relative h-screen">
      <Model3D />
      <NavigationBar />
      <Background />
      <CursorController />
    </div>
  );
}

export default App;
