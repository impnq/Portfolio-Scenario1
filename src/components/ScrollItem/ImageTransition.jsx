import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { useAtom } from 'jotai';
import { currentProjectAtom, projects } from "./ProjectsModel";
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';


const ImageTransition = () => {
    const [currentProject] = useAtom(currentProjectAtom);
    const meshRef = useRef();

    // Load texture
    const texture = useTexture(projects[currentProject].image);

    useEffect(() => {
        if (!meshRef.current) return;

        const mesh = meshRef.current;
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut" // Using a smoother easing function
            }
        });

        // Animate out the current image
        tl.to(mesh.position, { y: 20, duration: 0.3, ease: "power2.in" })
            .to(mesh.scale, {
                x: 0.1,
                y: 0.1,
                duration: 0.2,
                onStart: () => {
                    // Ensure opacity fades out before changing the image
                    gsap.to(mesh.material, { opacity: 0, duration: 0.1 });
                },
                onComplete: () => {
                    mesh.material.map = texture; // Update the texture
                    mesh.position.y = -20; // Reset position to below the view
                    mesh.material.opacity = 0; // Set opacity to 0 before fade in
                }
            }, "-=0.25") // Overlap with the previous animation to smooth transitions
            // Animate in the new image
            .to(mesh.position, { y: -11, duration: 0.1, ease: "power2.out" }) // Move to final position
            .to(mesh.material, { opacity: 1, duration: 0.1 }) // Fade in opacity
            .to(mesh.scale, { x: 1.2, y: 1.2, duration: 0.5 }); // Scale up the new image
    }, [currentProject, texture]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.material.needsUpdate = true;
        }
    });

    return (
            <mesh position-z={-10} rotation={[-0.05, 0, 0]} ref={meshRef}>
                <planeGeometry attach="geometry" args={[20, 10]} />
                <meshBasicMaterial
                    attach="material"
                    toneMapped={false}
                    transparent
                    opacity={1}
                />
            </mesh>
    );
};

export default ImageTransition;
