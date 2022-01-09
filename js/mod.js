let modInfo = {
    name: "Oasis",
    id: "igm-2022-oasis",
    author: "Escapee",
    modFiles: ["other/resource.js",
               "other/job.js",
               "other/action.js",
               "other/building.js",

               "tree.js",
               "layers/oasis.js",
               "layers/research.js",
               "layers/expedition.js"
    ],

    discordName: "Escapee",
    discordLink: "",
    initialStartPoints: new Decimal (0) // Used for hard resets and new players
}

// Set your version in num and name
let VERSION = {
    num: "0.1",
    name: "Spring",
}

let changelog = `
    <h1>Changelog:</h1>
    <br><br>
    <h3>v0.1 - Spring</h3>
    <br>- Created initial content framework
    <br>- Initial visual design settings
    <br>- Ripped out obviously useless TMT code
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

// Calculate points/sec!
function getPointGen() {
    return decimalOne
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
    gameSpeed: 0,
    lastUpdate: 0
}}

// Display extra things at the top of the page
var displayThings = [
    () => `<h2  class="overlayThing" id="points">${formatTime(player.points)} have passed</h2>`
]

// Determines when the game "ends"
function isEndgame() {
    return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
    return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}