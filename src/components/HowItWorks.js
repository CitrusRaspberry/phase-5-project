import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Book from "./Book";

const Container = styled.div`
    height: 500vh;
`


function HowItWorks() {

    const [ scrollProgress, setScrollProgress ] = useState(0.00)

    const handleScroll = () => {
        const currentScroll = document.documentElement.scrollTop;
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (100 * currentScroll / windowHeight).toFixed(2);
        setScrollProgress(progress)
    }

    useEffect(() => {
        window.addEventListener("scroll", () => handleScroll())
    }, [])
    
    return (
        <Container>
            <Book scrollProgress={scrollProgress} />
        </Container>
        
    )
}

export default HowItWorks;