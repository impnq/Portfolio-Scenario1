import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";

export const currentUserSection = atom(0)
const ScrollManager = (props) => {
    const {section, onSectionChange} = props
    const data = useScroll();
    const lastScroll = useRef(0);
    const isAnimating = useRef(false);

    data.fill.classList.add("top-0");
    data.fill.classList.add("absolute");

    useEffect(() => {
        gsap.to(data.el, {
            duration: 1,
            scrollTop: section * data.el.clientHeight,
            onStart: () => {
                isAnimating.current = true;
            },
            onComplete: () => {
                isAnimating.current = false;
            },
        });
    }, [section]);

    const makeSectionChange = () => {
        // Determine the current section based on scroll progress
        const totalSections = data.pages;
        const currentSection = Math.floor(data.scroll.current * totalSections);

        // Check if user scrolls up or down and change section accordingly
        if (currentSection !== section) {
            if (data.scroll.current < lastScroll.current) {
                onSectionChange(Math.max(0, currentSection));
            } else {
                onSectionChange(Math.min(totalSections - 1, currentSection));
            }
        }
    }
    const debouncedChange = debounce((fn) => {
        fn()
    }, 300);
    
    useFrame(() => {
        if (isAnimating.current) {
            lastScroll.current = data.scroll.current;
            return;
        }
        
        if (data.scroll.current !== lastScroll.current) {
            debouncedChange(makeSectionChange)
        }
        
        lastScroll.current = data.scroll.current;
    });

    return null;
};

export default ScrollManager;