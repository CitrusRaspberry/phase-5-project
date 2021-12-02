import { useState, useEffect } from "react";

function Word() {
    const [ wordStats, setWordStats ] = useState({});
    const [ generatedWord, setGeneratedWord ] = useState("loading...");

    useEffect(() => {
        fetch("http://localhost:3001/data")
        .then(r => r.json())
        .then(setWordStats)
    }, []);

    useEffect(() => {
        function getRandomLetter(wordStats, placement) {
            // placement argument can equal "startsWord", "endsWord", or can be blank
            // lowercase letter if in the middle of a word
            const placementIsLetter = placement.length === 1;
            const stats = (placementIsLetter ? wordStats[placement].comesBefore : wordStats)
            let breakpoint = 0;
            const ranNum = Math.random();
            console.log(ranNum);
            for (let letter in stats) {
                breakpoint += (placementIsLetter
                    ? stats[letter].ratio
                    : stats[letter][placement].ratio);
                console.log(placement, letter, breakpoint);
                if (ranNum < breakpoint) {
                    return letter;
                }
            }
        }
        function createWord(numOfLetters) {
            let word = "";
            for ( let i = 0; i < numOfLetters; i++ ) {
                switch ( i ) {
                    case 0:
                        word += getRandomLetter(wordStats, "startsWord")
                        console.log("Starting letter -->", word);
                        break;
                    case numOfLetters - 1:
                        word += getRandomLetter(wordStats, "endsWord")
                        console.log("Ending letter -->", word.slice(-1));
                        break;
                    default:
                        const prevLetter = word.slice(-1);
                        word += getRandomLetter(wordStats, prevLetter)
                        console.log("Mid letter -->", word.slice(-1));
                }
            }
            return word;
        }
        if (Object.keys(wordStats).length) {
            setGeneratedWord(createWord(5))
        }
    }, [wordStats])


    return (
        <h2>
            {generatedWord}
        </h2>
    )
}

export default Word;
