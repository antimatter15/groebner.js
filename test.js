var groebner = require('./groebner')

// this corresponds to {1 x^2 + 5 = 0, 1 x == 0}
var f = [[[2], 1], [[0], 5]],
    g = [[[1], 1]];



var gb = groebner.buchberger([f, g])
gb.forEach(k => console.log('gb', fmt(k) ))



var gb_red = groebner.reduce_groebner(gb)
gb_red.forEach(k => console.log('red', fmt(k) ))

// var f = [[[1, 0], 2], [[1, 1], 1]],
//     g = [[[0, 1], -2], [[1, 1], 1]];


function fmt(x){
    // x.sort((a, b) => base_cmp(a[0], b[0]))

    return 'Poly { ' + x
        .filter(k => k[1] != 0)
        .map(k => '(' + k[0].join(', ') + '): ' + k[1])
        .join(', ') + ' }'
}



// var lex = {
//     leading_term(poly){
//         // blah blah
//         poly.sort((a, b) => base_cmp(a[0], b[0]))
//         return poly.find(k => k[1] != 0)
//     }
// }

// var gb = buchberger([f, g], lex)
// gb.forEach(k => console.log('gb', fmt(k) ))

