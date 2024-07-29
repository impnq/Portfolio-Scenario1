import React, { useEffect, useRef } from 'react';
import { Image, Sphere, useScroll, useTexture  } from '@react-three/drei';
import * as THREE from "three";
import { gsap } from "gsap";
import {useFrame} from "@react-three/fiber";
import ImageTransition from './ImageTransition';

function Background(props) {
    const {section} = props;
    const material = useRef()
    // const [currentProject] = useAtom(currentProjectAtom);
    const color = useRef({
        color: "#b9bcff"
    })
    const data = useScroll();
    const tl = useRef();

    useFrame(() => {
        tl.current.progress(data.scroll.current)
        material.current.color = new THREE.Color(color.current.color)
    })

    useEffect(() => {
        tl.current = gsap.timeline();
        tl.current.to(color.current, {
            color: "#212121",
        })
        tl.current.to(color.current, {
            color: "#7a7ca5",
        });
        tl.current.to(color.current, {
            color: "#9b96dd",
        });
    }, [])

    return (
        <group>
            {/* <Image 
                url={projects[currentProject].image} 
                scale={[15,8, 3]} 
                toneMapped={false} 
                position-y={-19}
                position-z={-10} 
                rotation={[-Math.PI / 8, 0, 0]}
            /> */}
            
            { section === 2 && <ImageTransition /> }
            <Sphere scale={[30, 30, 30]} >
                <meshBasicMaterial  ref={material} side={THREE.BackSide} toneMapped={false}/>
            </Sphere>
        </group>

    );
}

export default Background;