function countStats(data) {
    let a = {
        matches: 0,
        tries  : 0
    };
    const getSum = (total, game) => {
        let newTotal = {}
        newTotal.matches =  parseInt(total.matches) + parseInt(game.matches)
        newTotal.tries =  parseInt(total.tries) + parseInt(game.tries)
        return newTotal;
    }

    const a1=data.reduce(getSum, a)
    // const a2=data.reduce(getSum,a1)
    return a1;
}


const json = process.argv[2];
if (json === undefined) {
    throw new Error(`input not supplied`);
}
// include the json file via node's module system,
// this parses the json file into a JS object
// NOTE: this only works via node and will not work in the browser
const stats = require(`./${json}`);

console.log(countStats(stats.results));