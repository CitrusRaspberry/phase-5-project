import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 789vh;
`

const Canvas = styled.canvas`
    position: fixed;
    left: 50%;
    top: 50%;
    height: 500px;
    width: 500px;
    max-height: 100vh;
    max-width: 100vw;
    transform: translate(-50%, -50%);
    background-color: red;
    `

function HowItWorks() {

    const ref = useRef();

    const handleScroll = e => {
        const x = window.innerHeight;
        const y = window.scrollY;
        console.log(window) 
    }

    useEffect(() => {
        window.addEventListener("scroll", e => handleScroll(e))
    }, [])
    
    return (
        <Container ref={ref}>
            <p>Hi there!</p>
            <Canvas>
                
            </Canvas>
        </Container>
        
    )
}

export default HowItWorks;