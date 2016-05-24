var A = require('algebrite')

var ONE = A.parse(1),
    NEGONE = A.parse(-1);

function enlist(cons){
    var list = [];
    while(cons.k == A.CONS){
        list.push(A.car(cons))
        cons = A.cdr(cons)
    }
    return list;
}

function extract_terms(expr){
    if(A.car(expr).printname == 'add'){
        return enlist(A.cdr(expr)).map(extract_coeff)
    }
    return [extract_coeff(expr)]
}

function extract_coeff(expr){
    if(A.isnum(expr)){
        return [[], expr]
    }
    if(A.car(expr).printname == 'multiply'){
        var args = enlist(A.cdr(expr));
        if(A.isnum(args[0])){
            return [args.slice(1).map(extract_power), args[0]]
        }
        return [args.map(extract_power), ONE]
    }
    return [[extract_power(expr)], ONE]
}

function extract_power(expr){
    if(A.car(expr).printname == 'power'){
        var base = A.car(A.cdr(expr)),
            exp  = A.car(A.cdr(A.cdr(expr)))
        if(A.isposint(exp)){
            // TODO: verify that exponent is a positive integer
            return [base, int(exp)]
        }
    }
    return [expr, 1]
}



function find_index(needle, haystack){
	return haystack.findIndex(k => A.equal(k, needle))
}


function generate_from_expr(expr){
    if(A.issymbol(expr)) return []; // symbols are primitives
    var head = A.car(expr).printname;
    if(head == 'power'){
        var base = A.car(A.cdr(expr)),
            exp  = A.car(A.cdr(A.cdr(expr)))
        if(isinteger(exp) && A.isnegativenumber(exp)){
            return [[ 
                [[
                    [expr, 1],
                    [base, -int(exp)]
                ], ONE], // coefficient
                [[], NEGONE]
            ]]
        }else if(A.isrational(exp)){
            // [x^(a/b)]^b - [x]^a = 0
            return [ [   
                [[ [expr, int(A.denominator(exp))] ], ONE],
                [[ [A.power(base, A.numerator(exp)), 1]], NEGONE]
            ] ]
        }
    }else if(head == 'add'){
    	// a + b + c - 1[a+b+c] = 0
        return [ extract_terms(expr).concat([ [[[expr, 1]], NEGONE] ]) ]
    }else if(head == 'multiply'){
        // [a*b*c] - [a]*[b]*[c] = 0
        return [[ extract_coeff(expr), [[[expr, 1]], NEGONE] ] ]
    }

    console.log('gen from expr', expr + '')
    return []
}


function isinteger(x){
    // this is a nasty hack because Algebrite.isinteger is broken
    return A.isrational(x) && x.q.b.equals(1)
}


function int(x){
    return parseInt(x + '')
}



// grobner.js rational number to algebrite rational
function grob2rat(x){
	return A.multiply(x[0], A.power(x[1], -1))
}

// algebrite rational number to grobner.js rational
function rat2grob(x){
	return [int(A.numerator(x)), int(A.denominator(x))]
}


function parse_polynomial(str){
    return extract_terms(A.parse(str))
}

exports.rat2grob = rat2grob
exports.grob2rat = grob2rat
exports.find_index = find_index
exports.generate_from_expr = generate_from_expr
exports.extract_terms = extract_terms
exports.parse_polynomial = parse_polynomial
