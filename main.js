const colorSelector = document.getElementById('color-picker')
const themeSelector = document.getElementById('theme')
const generateBtn = document.getElementById('generator')


const defaultColorScheme = [
    '#F55A5A',
    '#2B283A',
    '#FBF3AB',
    '#AAD1B6',
    '#A626D3'
]

function applyColors(colorScheme){
    colorScheme.forEach((color, i) => {
        const backgroundP = document.querySelector(`.color-${i}`)
        const text = document.querySelector(`.color-value-${i}`)
        if(backgroundP && text){
            backgroundP.style.backgroundColor = color;
            text.style.cursor = 'pointer'
            text.textContent = color;
        }
    });
}


window.addEventListener('DOMContentLoaded', () =>{
    const schemeContainer = document.getElementById('color-scheme');
        for (let i = 0; i < 5; i++) {

        const colorBar = document.createElement('div');
        colorBar.classList.add('color-bar');

        const colorBlock = document.createElement('p');
        colorBlock.classList.add(`color-${i}`);

        const hexLabel = document.createElement('span');
        hexLabel.classList.add(`color-value-${i}`);

        hexLabel.addEventListener('click', () => {
            const color = hexLabel.textContent;
            navigator.clipboard.writeText(color)
                .then(() => alert(`Copied ${color} to clipboard!`))
                .catch(err => console.error('Copy failed', err));
        });

        colorBar.appendChild(colorBlock);
        colorBar.appendChild(hexLabel);
        schemeContainer.appendChild(colorBar);
        }
    applyColors(defaultColorScheme)

})


generateBtn.addEventListener('click', ()=>{
    
        const selectedColor = colorSelector.value.slice(1)
        const selectedTheme = themeSelector.value

        fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedTheme}` )
        .then(response => response.json())
            .then(data => {
                let genColorSchemeArr = []
                genColorSchemeArr = data.colors.map(color => color.hex.value)
                applyColors(genColorSchemeArr) 
            })
            .catch(error => console.error("Error fetching color scheme:", error))

    })
