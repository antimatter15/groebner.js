

var symbolic = require('./symbolic')

console.time('parsing')
var polys = [
    // '(x + 5)^2 + y^2 - 25',
    // 'y',
    'horse - 3 * USD',
    'cat - 2 * USD',
    'house - 100 * USD',
    'assets - (horse + cat + house)',
    'assets - horse - cat - house',
    'horse+cat+house-assets',
    'cat - house',
    // '4*x^2*y^2 + 4*x*y + 1',
    // 'x^2 + y^2 - 1',
    // '-y^2 + z',
    // 'x-y^3'
    // 'house',
    // '-7/50*assets', 
    // '7/6*house - 1/3*assets', 
    // 'cat - house', 
    // 'USD - 1/2*cat', 
    // '-1/3*horse + USD'
    // '0'
    // 'a Ax + b Bx + c Cx - Ix',
    // 'a Ay + b By + c Cy - Iy',
    // 'a Az + b Bz + c Cz - Iz',
    // 'x^2 - 4',
    // '1/(1/x1 + 1/x2) - xt',
    // 'x1 - 64'
    // 'x1 - x2',
    // 'x2 - x1',
    // 'x2 - 7'
    // 'x + y',
    // 'x^2 + y^2 - 4',
    // '50x^(-1/2) - 2'
    // 'sin(x) - cos(x)'
    // 'x^2 - 4',
    // 'x - 3'
    // '(a (b + d) c)^2',
    // 'b + d'
    
    // 'x^2 + y^2 - 25',
    // '(x-10)^2 + y^2 - 25',
].map(symbolic.parse_polynomial)
console.timeEnd('parsing')

polys.forEach(symbolic.print_polynomial)

console.time('reduction')
var reduced = symbolic.reduce_basis(polys)
console.timeEnd('reduction')


reduced.forEach(symbolic.print_polynomial)