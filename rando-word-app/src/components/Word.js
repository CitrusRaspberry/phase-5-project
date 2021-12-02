import { useState, useEffect } from "react";

function Word() {
    let word = "hi";
    const [wordStats, setWordStats] = useState({});

    useEffect(() => {
        fetch("http://localhost:3001/data")
        .then(r => r.json())
        .then(setWordStats)
    }, []);

    function getRandomLetter(object, placement) {
        // placement argument can equal "startsWord", "endsWord", or can be any
        // lowercase letter if in the middle of a word
            // iterateObj = object[placement].comesBefore
        let breakpoint = 0;
        let ranNum = Math.random()
        console.log(ranNum);
        for (let letter in object) {
            breakpoint += (object[letter][placement] ? object[letter][placement].ratio : object[letter].ratio);
            console.log(letter, breakpoint);
            if (ranNum < breakpoint) {
                console.log("LETTER -->", letter);
                return letter;
            }
        }
    }
    function testRandomLetter() {
        let breakpoint = 0;
        const ranNum = Math.random()
        console.log(ranNum);
        for (let letter in wordStats) {
            breakpoint += wordStats[letter].startsWord.ratio;
            console.log(letter, breakpoint);
            if (ranNum < breakpoint) {
                ranNum = 2;
                console.log("LETTER -->", letter);
            }
        }
    }

    if (Object.keys(wordStats).length) {
        getRandomLetter(wordStats.a.comesBefore, "endsWord")
    }

    return (
        <h2>
            {word}
        </h2>
    )
}

export default Word;
