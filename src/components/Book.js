import styled from "styled-components";
import BookPages from "./BookPages";

const BookCover = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    max-height: 90vh;
    max-width: 90vw;
    transform: translate(-50%, -50%);
    background-color: gray;
    box-shadow: -5px 10px #444;
`

function Book({ scrollProgress }) {

    const totalHeight = 1000;
    const totalWidth = 800;
    const innerMargins = 30;
    const borderRadius = 20;
    // To adjust the inner most page borderRadius, see the styled-component in BookPages.js

    return (
        <BookCover style={{height: totalHeight, width: totalWidth, borderRadius: borderRadius, marginTop: 30}}>
                <BookPages
                    height={totalHeight - (innerMargins * 2)}
                    width={totalWidth - (innerMargins * 2)}
                    borderRadius={borderRadius}
                    scrollProgress={scrollProgress}
                />
            </BookCover>
    )
}

export default Book;