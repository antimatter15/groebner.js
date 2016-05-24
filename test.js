var groebner = require('./groebner')

// this corresponds to {1 x^2 + 5 = 0, 1 x == 0}
// var f = [[[2], 1], [[0], 5]],
//     g = [[[1], 1]];


// var f = [[[1, 0], 2], [[1, 1], 1]],
//     g = [[[0, 1], -2], [[1, 1], 1]];

// var generating = [f, g];

var generating = [[[[1,0,0],50],[[0,0,0],-2]],[[[2,0,0],1],[[0,1,0],-1]],[[[0,1,1],1],[[0,0,0],-1]]]

var gb = groebner.normal_strategy(generating)
gb.forEach(k => console.log(fmt2(k) + ' = 0' ))

console.log('--------------------')

var gb_red = groebner.reduce_groebner(gb)
gb_red.forEach(k => console.log(fmt2(k) + ' = 0' ))





function fmt2(x){
    var coefficient = require('./coefficient')
    // x.sort((a, b) => base_cmp(a[0], b[0]))
    var alpha = 'abcdefghijklmnopqrstuvwxyz'
    return x.map(k => ((coefficient.is_one(k[1]) && k[0].reduce((a, b) => a + b) > 0) ? '' : 
            coefficient.str(k[1])) + ' ' + k[0].map((k, i) => 
            k == 0 ? '' : (k == 1 ? alpha[i] : (
                alpha[i] + '^' + k    
            ))
        ).join(' ')).join(' + ')
}
