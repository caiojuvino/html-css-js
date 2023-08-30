https://css-tricks.com/an-introduction-and-guide-to-the-css-object-model-cssom/

window.getComputedStyle(box, '::before').width;

document.styleSheets.length;
document.styleSheets[i].ownerNode
document.styleSheets[i].cssRules[i].selectorText = 'body'
document.styleSheets[i].cssRules[i].cssText
document.styleSheets[i].cssRules[i].style
document.styleSheets[i].insertRule(rule, index)
document.styleSheets[i].deleteRule(i)

for (let ss of document.styleSheets) {
    for (let rule of ss.cssRules) {
        console.log(`${rule.selectorText}`);
        for (let prop of rule.style) {
            console.log(`    ${prop} : ${rule.style.getPropertyValue(prop)}`);
        }
    }
}