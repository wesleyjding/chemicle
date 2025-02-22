// Organic Chemical Type (type, max)
class oct {
    constructor(type, max, date = null) {
        this._enabled = true;
        this._type = type;
        this._max = max;
        this._date = date;
        this._checkbox = null;
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;

    }

    get type() {
        return this._type;
    }

    get max() {
        return this._max;
    }

    get checkbox() {
        return this._checkbox;
    }

    set checkbox(value) {
        this._checkbox = value;
    }

    checkTimeBasedEnable () {
        if(this._date === null) {
            return false;
        }
        let now = Date.now();
        let compareTo = new Date(this._date);
        compareTo.setUTCHours(5);
        return compareTo.getTime() <= now;
    }


}

const typeList = [new oct("alkane", 84, "2025-01-01"), new oct("alkene", 33, "2025-02-04"),
    new oct("alkyne", 24, "2025-02-04"), new oct("alcohol", 21, "2025-02-10"),
    new oct("ketone", 19, "2025-02-10"), new oct("carboxylicAcid", 29, "2025-02-12"),
    new oct("aldehyde", 28, "2025-02-10"), new oct("ether", 12, "2025-02-13"),
    new oct("ester", 18, "2025-02-12"), new oct("amine", 32, "2025-02-13"),
    new oct("amide", 12, "2025-02-13"), new oct("nitrile", 4),
    new oct("misc", 7)];

let idNum;

let moleculeType;
let moleculeId;

let trueMoleculeName;
let trueMoleculeFormula;

let doneLoading = false;

let curSplit = "";
let curGuessNum = 1;
let correctGuess = false;

let moleculeNum = 1;

let correctGuesses;
let totalGuesses;
let correctGuessesBlind;
let totalGuessesBlind;
let currentStreak;
let maxStreak;
let lastStreakDate;
let individualGuessStatsTotal = [];
let individualGuessStatsBlind = [];

let tutorialButton;

let gradualHints;
let changedSettings = false;
let numBoxesChecked = 0;
let formulaButton;
let formulaDiv;
let lineButton;
let lineImage;
let lewisButton;
let lewisImage;
let solutionButton;
let solutionDiv;

document.addEventListener("DOMContentLoaded", async function () {
    checkStorageSettings();
    generateId();
    while (!doneLoading) {
        await new Promise(r => setTimeout(r, 10))
    }
    reloadAssets();
    updateFromStorage();
});

function checkStorageSettings() {
    if(getStorage("moleculeNum") === "") {
        moleculeNum = 1;
    } else {
        moleculeNum = parseInt(getStorage("moleculeNum"))
    }

    for (let i = 0; i < typeList.length; i++) {
        let obj = typeList[i];
        if(getStorage("albrittonMode") === "" || getStorage("albrittonMode") === true || getStorage(obj.type) === "") {
            for (let j = 0; j < typeList.length; j++) {
                let obj2 = typeList[j];
                if(obj2.checkTimeBasedEnable()) {
                    obj2.enabled = true;
                    setStorage(obj2.type, true, false);
                }
                else {
                    obj2.enabled = false;
                    setStorage(obj2.type, false, false);
                }
            }
            setStorage("albrittonMode", true, false);
            break;
        }
        else obj.enabled = getStorage(obj.type) === true;
    }

    if(getStorage("gradualHints") === "") {
        gradualHints = false;
        setStorage("gradualHints", false, false)
    } else {
        gradualHints = !!getStorage("gradualHints");
    }


}

function generateId() {
    document.getElementById("guessInput").value = "";

    let today = new Date();
    if(moleculeNum === 1 && today.getMonth() === 0 && today.getUTCDate() === 31 && typeList[0].enabled === true) {
        moleculeId = "alkane-009";
    }
    else {
        let totalMax = 0;

        for (let i = 0; i < typeList.length; i++) {
            if (typeList[i].enabled) {
                totalMax += typeList[i].max;
            }
        }

        // Random selection for ids based on date
        function getDailyId(maxValue, moleculeN = 1) {
            function dailyRandom() {
                // Partly generated by ChatGPT

                // Create a Date object for December 1st, 2024, 5:00 AM GMT
                const dec1st5AM = new Date(Date.UTC(2024, 11, 1, 5, 0, 0, 0)); // 11 = December (months are 0-indexed)

                // Get the current date and time in GMT
                const now = new Date();

                // Calculate the difference in milliseconds
                const diffInMs = now - dec1st5AM;

                // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 ms)
                let diffInDays = Math.floor(diffInMs / (24 * 60 * 60 * 1000));

                return Math.abs(random(diffInDays));
            }

            // Deterministic random algorithm
            function random(seed) {
                let t = (seed ^ 0xEFC5DAF7) + (seed << 3);
                t = (t ^ (t >>> 16)) * 0x42EDBF1D;
                t = (t ^ (t >>> 13)) * 0xD9AAB461;
                t = t ^ (t >>> 16);
                return t;
            }

            function random2(seed) {
                let t = (seed ^ 0xFEAD2DD3) + (seed << 4);
                t = (t ^ (t >>> 7)) * 0x6A8BC9AB;
                t = (t ^ (t >>> 12)) * 0xCCB4A321;
                t = t ^ (t >>> 9);
                return t;
            }

            let d = dailyRandom();
            let add = 0;
            if (moleculeN > 1) {
                //console.log("R2: " + random2(moleculeNum))
                //console.log("d: " + d)
                add = (random2(moleculeN) * (d % 999331) + (17 * moleculeN)) % 100000
            }
            //console.log("Add:" + add)
            idNum = (d + add) % maxValue + 1;
            function checkWithin(max, type) {
                if (idNum <= max) {
                    moleculeType = type;
                    return true;
                } else {
                    idNum -= max;
                    return false;
                }
            }

            for (let i = 0; i < typeList.length; i++) {
                if (typeList[i].enabled) {
                    if (checkWithin(typeList[i].max, typeList[i].type)) {
                        return moleculeType + "-" + (idNum).toString().padStart(3, "0");
                    }
                }
            }
        }
        if(moleculeNum > 1 && getDailyId(totalMax, moleculeNum) === getDailyId(totalMax, moleculeNum - 1)) {
            moleculeNum++;
            setStorage("moleculeNum", moleculeNum);
            generateId(moleculeNum);
            return;
        }
        getDailyId(totalMax, moleculeNum);
        moleculeId = moleculeType + "-" + (idNum).toString().padStart(3, "0");

    }
    console.log("Molecule #" + moleculeNum)
    console.log(moleculeId);

    fetch("assets/" + moleculeId + "/name.txt")
        .then((res) => res.text())
        .then((text) => {
            const splitString = text.split(", ");
            //console.log(splitString);
            trueMoleculeName = splitString[0].replaceAll("\"", "");
            trueMoleculeFormula = splitString[1].replaceAll("\"", "");
            trueMoleculeFormula = trueMoleculeFormula.replaceAll(/(\d+)/g, '<sub>$1</sub>');
            doneLoading = true;
        })
        .catch((e) => console.error(e));
}

function reloadAssets() {
    let settingsButton = document.getElementById('settingsButton');
    let settingsCloseButton = document.getElementById('settingsCloseButton');
    let settingsDiv = document.getElementById('settings');
    let settingsFieldset = document.getElementById('settingsFieldset');
    let settingsBackgroundDiv = document.getElementById('settingsBackground');
    let clearStorageButton = document.getElementById('clearStorageButton');

    tutorialButton = document.getElementById('tutorialButton');
    let tutorialCloseButton = document.getElementById('tutorialCloseButton');
    let tutorialDiv = document.getElementById('tutorial');
    let tutorialBackgroundDiv = document.getElementById('tutorialBackground');

    let generateNewMoleculeButton = document.getElementById('generateNewButton');
    let resetMoleculeNumButton = document.getElementById('resetMoleculeNum');

    let statisticsButton = document.getElementById('statisticsButton');
    let statisticsCloseButton = document.getElementById('statisticsCloseButton');
    let statisticsDiv = document.getElementById('statistics');
    let statisticsBackgroundDiv = document.getElementById('statisticsBackground');

    let moleculeIdDiv = document.getElementById('moleculeIdDiv');

    let albrittonModeCheck = document.getElementById('albrittonModeCheck');
    let gradualHintsCheck = document.getElementById('gradualHintsCheck');

    formulaButton = document.getElementById('formulaButton');
    formulaDiv = document.getElementById('formula');

    lineButton = document.getElementById('lineButton');
    lineImage = document.getElementById('line');
    lineImage.src = "assets/" + moleculeId + "/line.png";

    lewisButton = document.getElementById('lewisButton');
    lewisImage = document.getElementById('lewis');
    lewisImage.src = "assets/" + moleculeId + "/lewis.png";

    solutionButton = document.getElementById('solutionButton');
    solutionDiv = document.getElementById('solution');

    function toggleVisibility(button, element, name, isImage = true) {
        if(isImage) {
            if (element.style.display === 'none' || element.style.display === '') {
                element.style.display = 'block'; // Show the image
                if(button != null) {
                    button.innerHTML = "Hide " + name;
                }
            } else {
                element.style.display = 'none'; // Hide the image
                if(button != null) {
                    button.innerHTML = "Show " + name;
                }
            }
        }
        else {
            if (element.hidden) {
                element.hidden = false; // Show the image
                if(button != null) {
                    button.innerHTML = "Hide " + name;
                }
            } else {
                element.hidden = true; // Hide the image
                if(button != null) {
                    button.innerHTML = "Show " + name;
                }
            }
        }
    }

    settingsButton.addEventListener('click', () => {
        toggleVisibility(null, settingsDiv, "Settings", false)
        toggleVisibility(null, settingsBackgroundDiv, "SettingsBackground", false)
    });

    settingsCloseButton.addEventListener('click', () => {
        toggleVisibility(null, settingsDiv, "Settings", false)
        toggleVisibility(null, settingsBackgroundDiv, "SettingsBackground", false)
        if(changedSettings) {
            location.reload();
        }
    });

    settingsBackgroundDiv.addEventListener('click', () => {
        toggleVisibility(null, settingsDiv, "Settings", false)
        toggleVisibility(null, settingsBackgroundDiv, "SettingsBackground", false)
        if(changedSettings) {
            location.reload();
        }
    });

    clearStorageButton.addEventListener('click', () => {
        if(confirm("Are you sure? This will clear all stored settings and storage, including statistics.")) {
            localStorage.clear();
        }
        location.reload();
    });

    tutorialButton.addEventListener('click', () => {
        toggleVisibility(null, tutorialDiv, "Tutorial", false)
        toggleVisibility(null, tutorialBackgroundDiv, "TutorialBackground", false)
    });

    tutorialCloseButton.addEventListener('click', () => {
        toggleVisibility(null, tutorialDiv, "Tutorial", false)
        toggleVisibility(null, tutorialBackgroundDiv, "TutorialBackground", false)
        setStorage("seenTutorial", true, false);
    });

    tutorialBackgroundDiv.addEventListener('click', () => {
        toggleVisibility(null, tutorialDiv, "Tutorial", false)
        toggleVisibility(null, tutorialBackgroundDiv, "TutorialBackground", false)
        setStorage("seenTutorial", true, false);
    });

    statisticsButton.addEventListener('click', () => {
        updateStatistics();
        toggleVisibility(null, statisticsDiv, "Statistics", false)
        toggleVisibility(null, statisticsBackgroundDiv, "StatisticsBackground", false)
    });

    statisticsCloseButton.addEventListener('click', () => {
        toggleVisibility(null, statisticsDiv, "Statistics", false)
        toggleVisibility(null, statisticsBackgroundDiv, "StatisticsBackground", false)
    });

    statisticsBackgroundDiv.addEventListener('click', () => {
        toggleVisibility(null, statisticsDiv, "Statistics", false)
        toggleVisibility(null, statisticsBackgroundDiv, "StatisticsBackground", false)
    });

    function updateStatistics () {
        let statistics1 = document.getElementById("statistics1"); // Correct Guesses
        let statistics2 = document.getElementById("statistics2"); // Average Guesses
        let statistics3 = document.getElementById("statistics3"); // Accuracy
        let percent = 0;
        if(totalGuesses !== 0) {
            percent = 100 * correctGuesses/totalGuesses;
            // https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
            let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
            percent = percent.toString().match(re)[0];
        }

        let statistics4 = document.getElementById("statistics4"); // Correct Guesses
        let statistics5 = document.getElementById("statistics5"); // Average Guesses
        let statistics6 = document.getElementById("statistics6"); // Accuracy
        let percent2 = 0;
        if(totalGuessesBlind !== 0) {
            percent2 = 100 * correctGuessesBlind/totalGuessesBlind;
            // https://stackoverflow.com/questions/4187146/truncate-number-to-two-decimal-places-without-rounding
            let re = new RegExp('^-?\\d+(?:\.\\d{0,' + (2 || -1) + '})?');
            percent2 = percent2.toString().match(re)[0];
        }


        let statistics7 = document.getElementById("statistics7"); // Current Day Streak
        let statistics8 = document.getElementById("statistics8"); // Max Streak

        statistics1.innerHTML = "Correct Guesses: <b>" + correctGuesses + "</b>";
        statistics2.innerHTML = "Total Guesses: <b>" + totalGuesses + "</b>";
        statistics3.innerHTML = "Accuracy: <b>" + percent + "%</b>";

        statistics4.innerHTML = "Correct Guesses: <b>" + correctGuessesBlind + "</b>";
        statistics5.innerHTML = "Total Guesses: <b>" + totalGuessesBlind + "</b>";
        statistics6.innerHTML = "Accuracy: <b>" + percent2 + "%</b>";

        statistics7.innerHTML = "Current Day Streak: <b>" + currentStreak + "</b>";
        statistics8.innerHTML = "Max Day Streak: <b>" + maxStreak + "</b>"

        let statsRegular = [
            document.getElementById("stats1"),
            document.getElementById("stats2"),
            document.getElementById("stats3"),
            document.getElementById("stats4"),
            document.getElementById("stats5"),
            document.getElementById("stats6"),
            document.getElementById("stats7"),
            document.getElementById("stats8")];

        let statsBlind = [
            document.getElementById("stats1b"),
            document.getElementById("stats2b"),
            document.getElementById("stats3b"),
            document.getElementById("stats4b"),
            document.getElementById("stats5b"),
            document.getElementById("stats6b"),
            document.getElementById("stats7b"),
            document.getElementById("stats8b")];

        let max = 1;
        for (let i = 0; i < 8; i++) {
            if(individualGuessStatsTotal[i] > max) {
                max = individualGuessStatsTotal[i];
            }
        }
        //console.log("Max is: " + max)
        let totalPixels = 200;
        for (let i = 0; i < 8; i++) {
            let total = individualGuessStatsTotal[i];
            let blind = individualGuessStatsBlind[i];
            let regular = total - blind;
            statsRegular[i].style.width = regular / max * totalPixels + "px";
            //console.log("Width is: " + regular / max * totalPixels + "px")
            statsRegular[i].innerHTML = regular.toString();

            statsBlind[i].style.width = blind / max * totalPixels + "px";
            //console.log("Width is: " + blind / max * totalPixels + "px")
            statsBlind[i].innerHTML = blind.toString();
        }
    }

    generateNewMoleculeButton.addEventListener('click', () => {
        moleculeNum++;
        setStorage("moleculeNum", moleculeNum);
        changedSettings = true;
        setStorage("changedSettings", true, false);
        location.reload();
    });

    resetMoleculeNumButton.addEventListener('click', () => {
        moleculeNum = 1;
        setStorage("moleculeNum", moleculeNum);
        changedSettings = true;
        setStorage("changedSettings", true, false);
        location.reload();
    })

    let today = new Date();
    if(today.getUTCHours() < 5) {
        today.setTime(today.getTime() - (24 * 60 * 60 * 1000))
        today.setUTCHours(8);
    }
    moleculeIdDiv.innerHTML = (today.getUTCMonth() + 1) + "/" + today.getUTCDate() + "/" + today.getUTCFullYear() + ": #" + moleculeNum;


    formulaButton.addEventListener('click', () => {
        toggleVisibility(formulaButton, formulaDiv, "Chemical Formula", false)
        setStorage("formulaDivHidden", formulaDiv.hidden, false);
    });

    lineButton.addEventListener('click', () => {
        toggleVisibility(lineButton, lineImage, "Line Structure")
        let shown = lineImage.style.display === "block";
        setStorage("lineImageHidden", !shown, false);
    });

    lewisButton.addEventListener('click', () => {
        toggleVisibility(lewisButton, lewisImage, "Lewis Structure")
        let shown = lewisImage.style.display === "block";
        setStorage("lewisImageHidden", !shown, false);
    });

    solutionButton.addEventListener('click', () => {
        toggleVisibility(solutionButton, solutionDiv, "Solution", false)
    });

    albrittonModeCheck.addEventListener('change', () => {
        settingsFieldset.disabled = albrittonModeCheck.checked;
        if(albrittonModeCheck.checked) {
            numBoxesChecked = 0;
            for (let i = 0; i < typeList.length; i++) {
                let obj = typeList[i];
                if(obj.checkTimeBasedEnable()) {
                    obj.enabled = true;
                    obj.checkbox.checked = true;
                    setStorage(obj.type, true, false)
                    numBoxesChecked++;
                } else {
                    obj.enabled = false;
                    obj.checkbox.checked = false;
                    setStorage(obj.type, false, false)
                }
            }
            setStorage("albrittonMode", true, false);
        }
        else {
            setStorage("albrittonMode", false, false);
        }
        changedSettings = true;
        setStorage("changedSettings", true, false);
    });

    if(getStorage("albrittonMode") === true) {
        albrittonModeCheck.checked = true;
        settingsFieldset.disabled = albrittonModeCheck.checked;
    }

    gradualHintsCheck.addEventListener('change', () => {
        gradualHints = gradualHintsCheck.checked;
        setStorage("gradualHints", gradualHints, false);
        changedSettings = true;
        setStorage("changedSettings", true, false);
    });

    gradualHintsCheck.checked = gradualHints;
    let settingsLegendDiv = document.getElementById('settingsLegend');
    for (let i = 0; i < typeList.length; i++) {
        let obj = typeList[i];

        const newDiv = document.createElement("div");
        const newInput = document.createElement("input");
        newInput.type = "checkbox";
        newInput.id = obj.type + "Check";
        newInput.name = obj.type + "Check";
        newInput.value = obj.type;
        const newLabel = document.createElement("label");
        newLabel.htmlFor = obj.type + "Check";
        newLabel.innerHTML = obj.type.replace(/([A-Z])/g, ' $1') // Add space before each capital letter
            .replace(/^./, match => match.toUpperCase()) // Capitalize the first character
            .trim(); // Remove leading or trailing spaces, if any;
        newDiv.insertBefore(newLabel, null);
        newDiv.insertBefore(newInput, newLabel);
        settingsLegendDiv.parentNode.insertBefore(newDiv, null);
        obj.checkbox = newInput;
        newInput.addEventListener('change', () => {
            if(newInput.checked) {
                obj.enabled = true;
                setStorage(obj.type, true, false);
                numBoxesChecked++;
                changedSettings = true;
                setStorage("changedSettings", true, false);
            }
            else {
                if(numBoxesChecked > 1) {
                    obj.enabled = false;
                    setStorage(obj.type, false, false);
                    numBoxesChecked--;
                    changedSettings = true;
                    setStorage("changedSettings", true, false);
                }
                else {
                    newInput.checked = true;
                }
            }
        });
        if(obj.enabled) {
            newInput.checked = true;
            numBoxesChecked++;
        }
    }
}

function updateFromStorage() {
    if(getStorage("changedSettings") === true) {
        setStorage("changedSettings", false, false);
        let i = 1;
        while(getStorage("guess" + i) !== "") {
            removeStorage("guess" + i);
            i++;
        }
        removeStorage("curGuessNum")
    }
    else if (getStorage("curGuessNum") !== "" && getStorage("curGuessNum") > 1) {
        //let guessNum = getStorage("curGuessNum");
        let i = 1;
        while(getStorage("guess" + i) !== "") {
            curSplit = getStorage("guess" + i).split(',').map(item => item === "" ? "," : item).filter((item, index, array) => item !== ',' || array[index - 1] !== ',');

            //console.log("Updating guess" + i + " to " + curSplit)
            showGuess(true);
            i++;
        }
    }
    if(getStorage("gradualHints") === false) {
        showHint(1);
        showHint(2);
        showHint(3);
    }
    if(getStorage("seenTutorial") === "") {
        tutorialButton.click();
    }

    if(getStorage("correctGuesses") === "") {
        correctGuesses = 0;
        setStorage("correctGuesses", correctGuesses, false);
    }
    else {
        correctGuesses = parseInt(getStorage("correctGuesses"));
    }

    if(getStorage("totalGuesses") === "") {
        totalGuesses = 0;
        setStorage("totalGuesses", totalGuesses, false);
    }
    else {
        totalGuesses = parseInt(getStorage("totalGuesses"));
    }

    if(getStorage("correctGuessesBlind") === "") {
        correctGuessesBlind = 0;
        setStorage("correctGuessesBlind", correctGuessesBlind, false);
    }
    else {
        correctGuessesBlind = parseInt(getStorage("correctGuessesBlind"));
    }

    if(getStorage("totalGuessesBlind") === "") {
        totalGuessesBlind = 0;
        setStorage("totalGuessesBlind", totalGuessesBlind, false);
    }
    else {
        totalGuessesBlind = parseInt(getStorage("totalGuessesBlind"));
    }

    if(getStorage("lastStreakDate") === "") {
        lastStreakDate = new Date(2000, 0, 1);
        setStorage("lastStreakDate", lastStreakDate.getTime(), false);
    }
    else {
        lastStreakDate = new Date(parseInt(getStorage("lastStreakDate")));
    }

    if(getStorage("currentStreak") === "") {
        currentStreak = 0;
        setStorage("currentStreak", currentStreak, false);
    }
    else {
        currentStreak = parseInt(getStorage("currentStreak"));

        function daysDifference(date1, date2) {
            // Generated by ChatGPT, prompt written by self
            // Normalize both dates to midnight (00:00:00)
            const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
            const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

            // Calculate the difference in milliseconds
            const diffTime = Math.abs(d2 - d1);

            // Convert milliseconds to days
            return Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }

        if(daysDifference(new Date(), lastStreakDate) > 1) {
            currentStreak = 0;
            setStorage("currentStreak", currentStreak, false);
        }
    }

    if(getStorage("maxStreak") === "") {
        maxStreak = 0;
        setStorage("maxStreak", maxStreak, false);
    }
    else {
        maxStreak = parseInt(getStorage("maxStreak"));
    }

    if(getStorage("individualGuessStats") === "") {
        individualGuessStatsTotal = [0, 0, 0, 0, 0, 0, 0, 0];
        localStorage.setItem("individualGuessStats", individualGuessStatsTotal);
    }
    else {
        individualGuessStatsTotal = localStorage.getItem("individualGuessStats").split(",");
    }

    if(getStorage("individualGuessStatsBlind") === "") {
        individualGuessStatsBlind = [0, 0, 0, 0, 0, 0, 0, 0];
        localStorage.setItem("individualGuessStatsBlind", individualGuessStatsBlind);
    }
    else {
        individualGuessStatsBlind = localStorage.getItem("individualGuessStatsBlind").split(",");
    }
}

function handleSubmit() {
    const inputText = document.getElementById("guessInput").value;
    const output = splitOrganicString(inputText);
    if (!output) {
        document.getElementById("validWarning").hidden = false;
        return false;
    } else {
        document.getElementById("validWarning").hidden = true;
        curSplit = output;
        showGuess();
        return false;
    }
}

function splitOrganicString(input) {
    // Validity Checker and regex generated by ChatGPT, with prompts, fixes and major modifications made by self
    // Define the valid organic chemical parts
    const validParts = [
        "yl", "ane", "ene", "yne",                                                // Suffixes for types of hydrocarbons
        "di", "tri", "tetra",                                                     // Multipliers for side chains
        "iso", "cyclo", "poly", "benz", "form", "acet",                           // Miscellaneous prefixes
        "fluoro", "chloro", "bromo", "iodo",                                      // Halides
        "oxy", "hydroxy", "amine", "amide", "oxo",                                // Functional groups
        "acid", "oate", "ether",  "nitrile",                                      // More functional groups
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", "-", "(", ")",     // Positions (1-9)
        "meth", "eth", "prop", "but", "pent", "hex", "hept", "oct", "non", "dec", // Standard prefixes for chain lengths
        "an", "ol", "one", "al", "oic", "ic", "ate", "am", "a", "en", "yn", "o",  // Suffixes for compact spelling
        "tert", "sec",                                                            // Butyl prefixes
        "phet", "phen"                                                            // Misc
    ];

    // Remove whitespace from the input
    input = input.replace(/\s+/g, '').toLowerCase();

    // Result array to store parts
    const result = [];

    // Define a helper function to find the longest matching part from the input
    function matchPart(input) {
        for (let part of validParts) {
            if (input.startsWith(part)) {
                return part;
            }
        }
        return null;  // No valid part found
    }

    // Loop through the input to match parts
    while (input.length > 0) {
        const matchedPart = matchPart(input);

        if (!matchedPart) {
            // No valid part matched; return false
            return false;
        }

        // Add the matched part to the result array
        result.push(matchedPart);

        // Remove the matched part from the beginning of the input
        input = input.slice(matchedPart.length);
    }

    // Return the list of matched parts
    return result;
}

function displayColoredText(input, stored, num) {
    // Code generated by ChatGPT, prompt and modifications made by self
    let allCorrect = true;
    let outputDiv;
    try {
        outputDiv = document.getElementById("guess" + num);
    }
    catch(e) {
        console.log("The output div guess + " + num + "does not exist")
        return;
    }
    outputDiv.innerHTML = ''; // Clear any existing content
    const matchedStored = Array(stored.length).fill(false); // Tracks matches in Stored array

    // Step 1: Exact matches (green)
    const results = input.map((item, index) => {
        if (item === stored[index]) {
            matchedStored[index] = true; // Mark exact match in Stored
            return {text: item, colorClass: 'green'};
        }
        return {text: item, colorClass: null}; // Placeholder for later steps
    });

    // Step 2: Non-index matches (yellow)
    results.forEach(result => {
        if (result.colorClass === null) { // Only process items not already green
            const storedIndex = stored.findIndex((item, i) => item === result.text && !matchedStored[i]);
            if (storedIndex !== -1) { // If there's an unmatched stored item
                matchedStored[storedIndex] = true; // Mark this stored item as matched
                result.colorClass = 'yellow';
                allCorrect = false;
            } else {
                result.colorClass = 'red'; // No match found in Stored
                allCorrect = false;
            }
        }
    });

    // Step 3: Display the results
    results.forEach(result => {
        const span = document.createElement('span');
        span.className = result.colorClass;
        span.textContent = result.text + ' ';
        outputDiv.appendChild(span);
    });

    outputDiv.innerHTML = "<b>" + outputDiv.innerHTML + "</b>";

    // Step 4: Determine length message
    const lengthMessage = document.createElement('div');
    if (input.length < stored.length) {
        lengthMessage.textContent = 'too short';
    } else if (input.length > stored.length) {
        lengthMessage.textContent = 'too long';
    } else {
        lengthMessage.textContent = 'correct length';
        if(allCorrect) {
            correctGuess = true;
        }
    }
    lengthMessage.setAttribute("style", "padding-bottom: 0.2%");
    outputDiv.appendChild(lengthMessage);
}

function showGuess(fromStorage = false){
    displayColoredText(curSplit, splitOrganicString(trueMoleculeName), curGuessNum)
    if(!fromStorage) {
        setStorage("guess" + curGuessNum, curSplit)
        if(gradualHints === true) {
            totalGuessesBlind++;
            setStorage("totalGuessesBlind", totalGuessesBlind, false);
        } else {
            totalGuesses++;
            setStorage("totalGuesses", totalGuesses, false);
        }
    }
    // Clear input box
    document.getElementById("guessInput").value = "";

    if(correctGuess) {
        document.getElementById("guessInput").hidden = true;
        document.getElementById("submitButton").hidden = true;

        const newDiv = document.createElement("div");
        newDiv.id = "congratsMessage";
        newDiv.style.setProperty("text-align", "center");
        newDiv.style.paddingTop = "0.1%";
        const lastDiv = document.getElementById("guess" + curGuessNum);
        lastDiv.parentNode.insertBefore(newDiv, lastDiv.nextSibling);

        const span = document.createElement('span');
        span.className = 'green';
        span.innerHTML = "<b>Correct!</b>";
        newDiv.appendChild(span);
        showHint(1);
        showHint(2);
        showHint(3);
        showHint(4);
        if(!fromStorage) {
            if(gradualHints === true) {
                individualGuessStatsBlind[curGuessNum-1]++;
                localStorage.setItem("individualGuessStatsBlind", individualGuessStatsBlind);
                correctGuessesBlind++;
                setStorage("correctGuessesBlind", correctGuessesBlind, false);
            } else {
                correctGuesses++;
                setStorage("correctGuesses", correctGuesses, false);
            }
            individualGuessStatsTotal[curGuessNum-1]++;
            localStorage.setItem("individualGuessStats", individualGuessStatsTotal);

            function daysDifference(date1, date2) {
                // Generated by ChatGPT, prompt written by self
                // Normalize both dates to midnight (00:00:00)
                const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
                const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

                // Calculate the difference in milliseconds
                const diffTime = Math.abs(d2 - d1);

                // Convert milliseconds to days
                return Math.floor(diffTime / (1000 * 60 * 60 * 24));
            }

            if(daysDifference(new Date(), lastStreakDate) >= 1) {
                currentStreak++;
                setStorage("currentStreak", currentStreak, false);
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                    setStorage("maxStreak", maxStreak, false);
                }
                lastStreakDate = new Date();
                setStorage("lastStreakDate", lastStreakDate.getTime(), false);
            }
        }
    }
    // Increment guess number
    else if(curGuessNum < 8) {
        curGuessNum++;
        // Add new div
        const newDiv = document.createElement("div");
        newDiv.id = "guess" + curGuessNum;
        newDiv.style.setProperty("text-align", "center");
        const lastDiv = document.getElementById("guess" + (curGuessNum - 1));
        lastDiv.parentNode.insertBefore(newDiv, lastDiv.nextSibling);
    }

    if(!fromStorage) {
        setStorage("curGuessNum", curGuessNum)
    }
    // Show corresponding hint
    if (curGuessNum === 2) {
        showHint(1);
    } else if (curGuessNum === 4) {
        showHint(2);
    } else if (curGuessNum === 6) {
        showHint(3);
    } else if (curGuessNum >= 8) {
        showHint(4);
    }
}

function showHint(hintNum) {
    switch (hintNum) {
        case 1:
            formulaButton.style.display = 'block';
            formulaDiv.innerHTML = "Formula = " + trueMoleculeFormula;
            if(((getStorage("formulaDivHidden") === true && formulaDiv.hidden === false)
                || (getStorage("formulaDivHidden") === false && formulaDiv.hidden === true))) {
                formulaButton.click();
            }
            break;
        case 2:
            lineButton.style.display = 'block';
            if(((getStorage("lineImageHidden") === true && lineImage.style.display === "block")
                || (getStorage("lineImageHidden") === false && lineImage.style.display !== "block"))) {
                lineButton.click();
            }
            break;
        case 3:
            lewisButton.style.display = 'block';
            if(((getStorage("lewisImageHidden") === true && lewisImage.style.display === "block")
                || (getStorage("lewisImageHidden") === false && lewisImage.style.display !== "block"))) {
                lewisButton.click();
            }
            break;
        case 4:
            solutionButton.style.display = 'block';
            solutionDiv.innerHTML = "Solution = " + trueMoleculeName;
            break;
        default:
            console.log("No hint for hintNum " + hintNum)
    }
}

function setStorage (id, value, expire = true) {
    if(expire) {
        const now = new Date();

        // Create a new Date object for 5 AM today
        let next5AM = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 5, 0, 0, 0));

        // If it's already past 5 AM GMT today, move to the next day
        if (now >= next5AM) {
            next5AM = new Date(next5AM.getTime() + 24 * 60 * 60 * 1000);
        }
        let expires = "expires="+ next5AM.getTime();
        localStorage.setItem(id, value + expires);
    }
    else {
        localStorage.setItem(id, value);
    }
}

function removeStorage (id) {
    localStorage.removeItem(id);
}

function getStorage (id) {
    let item = localStorage.getItem(id);
    if(!item) {
        return "";
    }

    let expiryItem = item.split("expires=")
    if(expiryItem.length === 1) { // no expiry
        //console.log(id + ": " + out[0] + " (no expiry)");
        if(item === "true") return true;
        else if (item === "false") return false;
        return item;
    }
    else {
        let d = new Date(parseInt(expiryItem[1]));
        let now = Date.now();
        if(now >= d) {
            localStorage.removeItem(id);
            return "";
        }
        else {
            //console.log(id + ": " + expiryItem[0]);
            if(expiryItem[0] === "true") return true;
            else if (expiryItem[0] === "false") return false;
            return expiryItem[0];
        }
    }
}