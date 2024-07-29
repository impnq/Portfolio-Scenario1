import React, { useEffect, useRef } from 'react';
import {useFrame, useThree} from "@react-three/fiber";
import {motion} from 'framer-motion-3d';
import { Image, Text } from '@react-three/drei';
import { atom, useAtom } from 'jotai';
import { animate, useMotionValue } from 'framer-motion';

export const projects = [
    {
        title: "Wawatmos",
        url: "https://r3f-wawatmos-final.vercel.app/",
        image: "projects/wawatmos.jpg",
        description: "Recreating the Atmos Awwwards website with React Three Fiber",
    },
    {
        title: "Portfolio Baking",
        url: "https://www.youtube.com/watch?v=YkHqpqJgLKw",
        image: "projects/baking.jpg",
        description: "Learn how to bake a 3D model with Blender and use it in r3f",
    },
    {
        title: "3D Avatar",
        url: "https://www.youtube.com/watch?v=pGMKIyALcK0",
        image: "projects/avatar.jpg",
        description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
    },
    {
        title: "Kanagame",
        url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
        image: "projects/kanagame.jpg",
        description: "Use React Three Fiber to create a 3D game",
    },
    {
        title: "Loader",
        url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
        image: "projects/loader.jpg",
        description: "Create a loading screen for your r3f projects",
    },
];

const Project = (props) => {
    const {project, hightlighted } = props;
    const background = useRef();
    const bgOpacity = useMotionValue(0.4);

    useEffect(() => {
        animate(bgOpacity, hightlighted ? 0.7 : 0.4 )
    }, [hightlighted])

    useFrame(() => {
        background.current.material.opacity = bgOpacity.get();
    })

    return (
        <group {...props}>
            <mesh 
                position-z={-0.001}
                onClick={() => window.open(project.url, "_blank")}
                ref={background}
            >
                <planeGeometry args={[2,2]} />
                <meshBasicMaterial color="black" transparent opacity={0.4}/>
            </mesh>

            <Image  scale={[2, 1.2, 1]} url={project.image} toneMapped={false} position-y={0.3}/>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.2} position={[-1, -0.4, 0]}>
                {project.title.toUpperCase()}
            </Text>
            <Text maxWidth={2} anchorX={"left"} anchorY={"top"} fontSize={0.1} position={[-1, -0.6, 0]}>
                {project.description}
            </Text>
        </group>
    )
}

export const currentProjectAtom = atom(Math.floor(projects.length / 2))
function Projects() {
    const { viewport } = useThree();
    const [currentProject] = useAtom(currentProjectAtom);
    return (
        <group position-y={-viewport.height * 2.4 + 1}>
            {
                projects.map((project, index) => (
                    <motion.group 
                        key={"project_" + index} 
                        position={[index * 2.5, 0, -1]}
                        animate={{
                            x: 0 + (index - currentProject) * 2.5,
                            y: currentProject === index ? 0 : -1,
                            z: currentProject === index ? -1 : -2,
                        }}
                        >
                        <Project project={project} hightlighted={index === currentProject}/>
                    </motion.group>
                ))
            }
        </group>
    );
}

export default Projects;