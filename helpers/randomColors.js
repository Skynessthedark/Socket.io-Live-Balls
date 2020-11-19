const colors = ['blue', 'green', 'red'];

const randomColor = ()=>{
    const rand = Math.floor(Math.random() *colors.length);
    console.log(rand);
    return colors[rand];
}

module.exports = randomColor;