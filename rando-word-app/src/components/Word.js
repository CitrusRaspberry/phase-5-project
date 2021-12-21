import { useState, useEffect } from "react";

function Word() {
    const [ generatedWord, setGeneratedWord ] = useState({});
    const [ allStats, setAllStats ] = useState({});

    useEffect(() => {
        let allStatsObj = {};
        function sendStats(stats, key) {
            allStatsObj[key] = stats;
            if ( Object.keys(allStatsObj).length === 2 ) {
                setAllStats(allStatsObj)
            }
        }
        fetch("http://localhost:3002/data")
        .then(r => r.json())
        .then(wordStatsData => sendStats(wordStatsData, "wordStats"))
        fetch("http://localhost:3004/data")
        .then(r => r.json())
        .then(comboStatsData => sendStats(comboStatsData, "comboStats"))

    }, []);

    useEffect(() => {
        function getRandomLetter(wordStats, placement) {
            // placement argument can equal "startsWord", "endsWord", or can be blank
            // lowercase letter if in the middle of a word
            const placementIsLetter = placement.length === 1;
            const stats = (placementIsLetter ? wordStats[placement].comesBefore : wordStats)
            let breakpoint = 0;
            const ranNum = Math.random();
            // console.log(ranNum);
            for (let letter in stats) {
                breakpoint += (placementIsLetter
                    ? stats[letter].ratio
                    : stats[letter][placement].ratio);
                    // console.log(placement, letter, breakpoint);
                    if (ranNum < breakpoint) {
                        return letter;
                    }
            }
        }
        function createWord(numOfLetters, wordStats, comboStats) {
            let word = "";
            for ( let i = 0; i < numOfLetters; i++ ) {
                const prevLetter = word.slice(-1);
                switch ( true ) {
                    case ( i === 0 ):
                        word += getStartingLetter(wordStats);
                        // console.log("Starting letter -->", word);
                        break;
                    // case ( i === numOfLetters - 1 ):
                    //     word += getEndingLetter(wordStats);
                    //     // console.log("Ending letter -->", word.slice(-1));
                    //     break;
                    case ( i === 1 ):
                        word += getSecondLetter(wordStats, prevLetter)
                        break;
                    // case ( i >= 2 ):
                    //     word += getMidLetterUsingCombo(wordStats, comboStats, word, prevLetter)
                    //     // console.log("Mid combo letter -->", word.slice(-1));
                    //     break;
                    default:
                        // word += getMidLetter(wordStats, prevLetter)
                        // console.log("Mid letter -->", word.slice(-1));
                        /////////////////////////////////////////
                        word += getMidLetterFromThreeLetterCombo(comboStats, word, prevLetter)
                }
            }
            function getStartingLetter(wordStats) {
                return getRandomLetter(wordStats, "startsWord");
            }
            function getSecondLetter(wordStats, prevLetter) {
                let nextLetter = "";
                while ( !nextLetter ) {
                    nextLetter = getRandomLetter(wordStats, prevLetter)
                    if (nextLetter === prevLetter) {
                        // console.log(`${nextLetter} was rejected because it was a duplicate`);
                        nextLetter = "";
                    } else {
                        return nextLetter;
                    }
                }
            }
            function getMidLetterFromThreeLetterCombo(comboStats, currentWord, prevLetter) {
                const segment = currentWord.slice(-2);
                console.log("SEGMENT", segment);
                const validComboStats = {}
                let allTotals = 0;
                for ( let combo in comboStats ) {
                    if ( combo.slice(0, 2) === segment ) {
                        validComboStats[combo] = comboStats[combo];
                        allTotals += comboStats[combo].total;
                    }
                }
                if ( Object.keys(validComboStats).length === 0 ) {
                    console.log("RETURNING BAD LETTER");
                    return getMidLetter(wordStats, prevLetter);
                }
                // Calculate new ratios
                for ( let combo in validComboStats ) {
                    validComboStats[combo].ratio = validComboStats[combo].total / allTotals;
                }
                console.log("VALID", validComboStats, allTotals);
                // Find combo
                let breakpoint = 0.0;
                const ranNum = Math.random();
                for ( let combo in validComboStats ) {
                    breakpoint += validComboStats[combo].ratio;
                    if ( ranNum < breakpoint ) {
                        return combo.slice(-1);
                    }
                }
            }
            function getMidLetter(wordStats, prevLetter) {
                return getRandomLetter(wordStats, prevLetter);
            }
            function getMidLetterUsingCombo(wordStats, comboStats, currentWord, prevLetter) {
                const segment = currentWord.slice(-2);
                let nextLetter = "";
                while ( !nextLetter ) {
                    nextLetter = getRandomLetter(wordStats, prevLetter)
                    if ( comboStats[segment + nextLetter] ) {
                        return nextLetter;
                    } else {
                        // console.log(segment + nextLetter + " failed")
                        nextLetter = "";
                    }
                }
            }
            function getEndingLetter(wordStats) {
                return getRandomLetter(wordStats, "endsWord");
            }
            return word;
        }
        function checkWords(objectOfWords, numOfWords) {
            const arrayOfWords = Object.keys(objectOfWords)
            if (arrayOfWords.length === numOfWords) {
                console.log("WORDS TO CHECK", arrayOfWords);
                for ( let word of arrayOfWords ) {
                    checkInDictionary(word)
                }
                function checkInDictionary(word) {
                    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(r => r.json())
                    .then(data => {
                        console.log(data);
                        if (data.title === "No Definitions Found") {
                            objectOfWords = { ...objectOfWords, [word]: false }
                            setGeneratedWord(objectOfWords)
                        } else {
                            objectOfWords = { ...objectOfWords, [word]: true }
                            setGeneratedWord(objectOfWords)
                        }
                        console.log("OBJECT OF WORDS", objectOfWords);
                    })
                }
                console.log("In dictionary? -->", generatedWord)
            }
        }
        const numOfWords = 100;
        let objectOfWords = {};
        if (Object.keys(allStats).length) {
            for ( let i = 0; i < numOfWords; i++ ) {
                const newWord = createWord(5, allStats.wordStats, allStats.comboStats)
                objectOfWords = { ...objectOfWords, [newWord]: null }
            }
            console.log(objectOfWords);
            console.log(Object.keys(objectOfWords).length);
        }

        checkWords(objectOfWords, numOfWords)

    }, [allStats])

    let numOfTrueWords = 0;
    for (let bool of Object.values(generatedWord)) {
        if (bool) {
            numOfTrueWords += 1
        }
    }
    return (
        <>
            <h2>{numOfTrueWords}</h2>
            { Object.keys(generatedWord).map(word => <p>{word}</p>) }
        </>
    )
}

export default Word;
