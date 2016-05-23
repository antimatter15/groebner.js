var monomial = require('./monomial')
var coefficient = require('./coefficient')

function findIndex(arr, predicate){
    for(var i = 0; i < arr.length; i++){
        if(predicate(arr[i])) return i;
    }
    return -1;
}

exports.leading_term = function leading_term(poly){
    poly.sort((a, b) => monomial.cmp(a[0], b[0]))
    return poly.find(k => !coefficient.is_zero(k[1]))
}

exports.is_zero = function poly_zero(poly){ 
    return poly.length == 0 
}

function filter_zero(x){
    return x.filter(k => !coefficient.is_zero(k[1])) 
}

exports.scalar_mul = function scalar_mul(a, s){
    // console.assert(is_poly(a))
    // console.assert(is_num(s))
    return filter_zero(a.map(k => [k[0], coefficient.mul(k[1], s)]))
}
exports.term_mul = function term_mul(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_term(b))
    return filter_zero(a.map(k => [monomial.add(k[0], b[0]), coefficient.mul(k[1], b[1])]))
}

exports.sub = function poly_sub(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_poly(b))
    
    var new_poly = a.slice(0); // clone A
    for(var i = 0; i < b.length; i++){
        var base = b[i][0], coeff = b[i][1];
        var index = findIndex(new_poly, k => monomial.equal(k[0], base))
        if(index != -1){
            new_poly[index][1] = coefficient.sub(new_poly[index][1], coeff)
        }else{
            new_poly.push([base, coefficient.neg(coeff)])
        }
    }
    return filter_zero(new_poly)
}

exports.add = function poly_add(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_poly(b))
    var new_poly = a.slice(0); // clone A
    for(var i = 0; i < b.length; i++){
        var base = b[i][0], coeff = b[i][1];
        var index = findIndex(new_poly, k => monomial.equal(k[0], base))
        if(index != -1){
            new_poly[index][1] = coefficient.add(new_poly[index][1], coeff)
        }else{
            new_poly.push([base, coeff])
        }
    }
    return filter_zero(new_poly)
}
