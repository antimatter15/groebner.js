var symbolic = require('./symbolic')

var reduced = symbolic.reduce_basis([
    // '(x + 5)^2 + y^2 - 25',
    // 'y',


    // 'horse - 3 * USD',
    // 'cat - 2 * USD',
    // 'house - 100 * USD',
    // 'assets - (horse + cat + house)',
    // 'assets - horse - cat - house',
    // 'horse+cat+house-assets',

    // 'cat - house',



    // 'x^2 - 4',
    '1/(1/x1 + 1/x2) - xt',
    // 'x1 - 64'
    'x1 - x2',
    // 'x2 - 7'
    // 'x + y',
    // 'x^2 + y^2 - 4'
    // '50x^(-1/2) - 2'
    // 'sin(x) - cos(x)'
    // 'x^2 - 4',
    // 'x - 3'
    // '(a (b + d) c)^2',
    // 'b + d'
].map(symbolic.parse_polynomial))


reduced.forEach(symbolic.print_polynomial)