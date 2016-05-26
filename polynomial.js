var monomial = require('./monomial')
var coefficient = require('./coefficient')

function findIndex(arr, predicate){
    for(var i = 0; i < arr.length; i++){
        if(predicate(arr[i])) return i;
    }
    return -1;
}

function leading_term(poly){
    poly.sort((a, b) => monomial.cmp(a[0], b[0]))
    return poly.find(k => !coefficient.is_zero(k[1]))
}

exports.leading_term = leading_term

exports.is_zero = function poly_zero(poly){ 
    return poly.length == 0 
}

function filter_zero(x){
    return x.filter(k => !coefficient.is_zero(k[1])) 
}

exports.filter_zero = filter_zero


function term_div(a, b){
    if(!b) return;

    if(monomial.divides(b[0], a[0])){
        return [monomial.sub(a[0], b[0]), coefficient.div(a[1], b[1])]
    }
}

exports.term_div = term_div

function poly_ring_rem(F, G){
    var r = []
    var f = F.slice(0);

    while(f.length > 0){
        var ltf = leading_term(f);
        var found_divisor = false;
        for(var i = 0; i < G.length; i++){
            var g = G[i];
            var tq = term_div(ltf, leading_term(g))

            if(tq){
                f = poly_sub(f, term_mul(g, tq))
                found_divisor = true
                break
            }
        }
        if(!found_divisor){
            r = poly_add(r, [ltf])
            f = poly_sub(f, [ltf])
        }
    }
    return r
}

exports.ring_rem = poly_ring_rem


function poly_monic(poly){
    return scalar_mul(poly, coefficient.inv(leading_term(poly)[1]))
}

exports.monic = poly_monic


function scalar_mul(a, s){
    // console.assert(is_poly(a))
    // console.assert(is_num(s))
    return filter_zero(a.map(k => [k[0], coefficient.mul(k[1], s)]))
}
exports.scalar_mul = scalar_mul

function term_mul(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_term(b))
    return filter_zero(a.map(k => [monomial.add(k[0], b[0]), coefficient.mul(k[1], b[1])]))
}
exports.term_mul = term_mul

function poly_sub(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_poly(b))
    
    var new_poly = a.slice(0); // clone A
    for(var i = 0; i < b.length; i++){
        var base = b[i][0], coeff = b[i][1];
        var index = findIndex(new_poly, k => monomial.equal(k[0], base))
        if(index != -1){
            new_poly[index] = [base, coefficient.sub(new_poly[index][1], coeff)]
        }else{
            new_poly.push([base, coefficient.neg(coeff)])
        }
    }
    return filter_zero(new_poly)
}
exports.sub = poly_sub



function poly_add(a, b){
    // console.assert(is_poly(a))
    // console.assert(is_poly(b))
    var new_poly = a.slice(0); // clone A
    for(var i = 0; i < b.length; i++){
        var base = b[i][0], coeff = b[i][1];
        var index = findIndex(new_poly, k => monomial.equal(k[0], base))
        if(index != -1){
            new_poly[index] = [base, coefficient.add(new_poly[index][1], coeff)]
        }else{
            new_poly.push([base, coeff])
        }
    }
    return filter_zero(new_poly)
}
exports.add = poly_add
