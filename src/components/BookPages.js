import { useEffect, useState } from 'react'
import styled from "styled-components";
import { Typography } from '@mui/material';
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import 'flipping-pages/FlippingPages.css'
import theme from "../theme";
 
const Cover = styled.div`
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    /* Below is for the Book component. Classes are not renamed because there is an npm .css file required as dependency. */
    .App-pages {
        perspective: 960px;
        -ms-user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        margin: auto;
        max-height: 90vh;
        max-width: 90vw;
        border: lightgray 10px double;
    }
    .App-page {
        color: white;
        height: 100%;
        border-radius: 10px;
        border: #555 solid 3px;
        background: ${theme.palette.tertiary.main};
    }
`
const Text = styled(Typography)`
    font-family: 'Quicksand', sans-serif;
    font-family: 'Roboto Mono', monospace;
    text-align: left;
    padding: 0 20px;
    @media (max-height: 825px) {
        font-size: 20px;
    }
    @media (max-height: 725px) {
        font-size: 18px;
    }
    @media (max-height: 675px) {
        font-size: 15px;
    }
`

function BookPages({ height, width, borderRadius, scrollProgress }) {
    const [ page, setPage ] = useState({selected: 0})
    const textVariant = "h5";

    const displayPages = lines => {
        if (lines) {
            const isString = !(lines[0][0] === "{");
            const body = lines.map(line => {
                return (
                    <Text key={line} variant={textVariant}>&emsp;{(isString ? '"' : "") + line + (isString ? '"' : "")},</Text>
                )
            })
            body.unshift(<Text key="open" variant={textVariant}>{"["}</Text>);
            body.push(<Text key="close" variant={textVariant}>{"]"}</Text>);
            return body;
        } else {
            return "";
        }
    }

    const renderPages = (pages, text, Text, displayPages) => {
        const pagesAsDivs = [];
        // This loop acts as a .map for both pages and text at the same time.
        for (let i = 0; i < pages.length; i++) {
            const page = Object.values(pages[i])[0]
            const textEntry = Object.values(text[i])[0]
            pagesAsDivs.push(
                <div key={textEntry} className={`App-page`}>
                    {displayPages(page)}
                    <Text variant={textVariant}>{textEntry}</Text>
                </div>
            )
        }
        return pagesAsDivs
    }
    
    const exampleWords = [
        "apple",
        "banana",
        "bagel",
        "carrot",
        "degrees",
        "egg",
    ]
    const pages = [
        {page0: null},
        {page1: exampleWords},
        {page2: [
            '{"letter": "a", "ratio": 0.17}',
            '{"letter": "b", "ratio": 0.33}',
            '{"letter": "c", "ratio": 0.17}',
            '{"letter": "d", "ratio": 0.17}',
            '{"letter": "e", "ratio": 0.17}',
        ]},
        {page3: [
            "e",
        ]},
        {page4: exampleWords},
        {page5: [
            '{"letter": "el", "ratio": 0.2}',
            '{"letter": "eg", "ratio": 0.4}',
            '{"letter": "ee", "ratio": 0.2}',
            '{"letter": "es", "ratio": 0.2}',
        ]},
        {page6: [
            '{"letter": "egr", "ratio": 0.5}',
            '{"letter": "egg", "ratio": 0.5}',
        ]},
        {page7: [
            "egg",
        ]},
        {page8: exampleWords},
        {page9: [
            "gg",
        ]},
        {page10: exampleWords},
        {page11: [
            "g",
        ]},
        {page12: exampleWords},
        {page13: [
            '{"letter": "ge", "ratio": 0.33}',
            '{"letter": "gr", "ratio": 0.33}',
            '{"letter": "gg", "ratio": 0.33}',
        ]},
        {page14: [
            "egge"
        ]},
        {page15: [
            '{"letter": "gel", "ratio": 1.0}',
        ]},
        {page16: [
            "eggel"
        ]},
    ]
    const text = [
        {text0: "Welcome! Scroll down or swipe left to learn how this app works."},
        {text1: "Here we have an example list of words. To pick a starting letter for our computer generated word, we first need to count and determine the frequency of each starting letter's occurance in the list above."},
        {text2: "The array above shows that, in our list, 'a' begun a word 17% of the time, 'b' begun a word 33% of the time, etc. Now a letter is selected at random, where there is a 17% chance that 'a' will be selected, a 33% chance that 'b' will be selected, etc."},
        {text3: "Let's say that 'e' was selected. This is the beginning of our computer generated word! Now we need a second letter."},
        {text4: "The algorithm now looks at every occurance of 2-letter combinations with 'e' as the starting letter: 'el', 'eg', ee', 'es'. Notice the 'e' in apple is not included. That is because there is no letter after 'e' in 'apple', so it will not help us find a letter that comes after 'e'."},
        {text5: "The same process of finding frequencies and randomly selecting the next letter based on the frequency of each occurnace takes place."},
        {text6: "The process continues and the length of the evaluated combination of letters dynamically increases as the length of the word grows."},
        {text7: "Our word now looks like this."},
        {text8: "Uh oh. We cannot continue because our list of words does not include a 4-letter combination starting with 'egg'."},
        {text9: "To solve this, the algorithm will evaluate the next possible letter using our word with the first letter chopped off. In this case, 'e' was chopped off the beginning and we are evaluating what might come after 'gg'."},
        {text10: "This still can't be evaluated. There are no 3-letter combinations that starts with 'gg'. Let's chop off one more."},
        {text11: "Now we are looking for 2-letter combinations that starts with 'g'."},
        {text12: "Let's look at the list of words one more time..."},
        {text13: "Now we have possibilities for our next letter!"},
        {text14: "This is what our word looks like now! Let's repeat the same process one last time with 'ge' as our evaluation sample."},
        {text15: "Here are the results of the evaluation process. There is a 100% change that 'l' will be selected."},
        {text16: "This is what the final word looks like!"},
    ]

    useEffect(() => {
        const findPageNumber = (scrollProgress, totalNumOfPages) => {
            const actualPageNum = ((pages.length - 1) / 100) * scrollProgress;
            const pageInt = parseInt(actualPageNum);
            const pageDec = actualPageNum - pageInt;
            const adjustedPageNum = ( pageDec >= 0.5 ? Math.round(actualPageNum) : pageInt + (pageDec * 2) )
            setPage({selected: adjustedPageNum})        
        }
        findPageNumber(scrollProgress, pages.length)
    }, [scrollProgress, pages.length])
    
    const handleSelectedChange = selected => {
        setPage({selected: Math.round(selected)})
    }
 
    return (
        <Cover className="App" >
            <FlippingPages
                className="App-pages"
                direction="horizontal"
                selected={page.selected}
                onSelectedChange={handleSelectedChange}
                touch-action="none"
                style={{width: width, height: height, borderRadius: borderRadius}}
            >
                {renderPages(pages, text, Text, displayPages)}
            </FlippingPages>
        </Cover>
    )
 
}
 
export default BookPages;