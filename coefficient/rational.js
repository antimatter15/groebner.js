function to_rational(x){
    return typeof x == 'number' ? [x, 1] : x;
}

// https://www.nayuki.io/res/calculate-gcd-javascript.js
function gcd(x, y) {
	while (y != 0) {
		var z = x % y;
		x = y;
		y = z;
	}
	return x;
}


function simplify_rational(x){
    var common = gcd(Math.abs(x[0]), Math.abs(x[1]));
    if(x[1] < 0) common = -common; // ensure denominator is positive
    return [x[0]/common, x[1]/common];
}

function num_add(a, b){
    a = to_rational(a)
    b = to_rational(b)
    return simplify_rational([a[0]*b[1] + b[0]*a[1], b[1]*a[1]])
}

function num_sub(a, b){ 
	return num_add(a, num_neg(b)) 
}

function num_mul(a, b){ 
    a = to_rational(a)
    b = to_rational(b)
    return simplify_rational([a[0]*b[0], a[1]*b[1]])
}

function num_div(a, b){ 
	return num_mul(a, num_inv(b)) 
}

function num_inv(x){ 
    x = to_rational(x)
    if(num_zero(x)) throw new Error('can not invert zero');
    return simplify_rational([x[1], x[0]])
}

function num_one(x){ 
    x = to_rational(x)
    return x[0] === x[1]
}

function num_zero(x){ 
    x = to_rational(x)
    return x[0] === 0
}

function num_neg(x){ 
    x = to_rational(x)
    return [-x[0], x[1]]
}

function num_str(x){
    return to_rational(x).join('/')
}

exports.str = num_str
exports.add = num_add
exports.sub = num_sub
exports.mul = num_mul
exports.div = num_div
exports.inv = num_inv
exports.is_one = num_one
exports.is_zero = num_zero
exports.neg = num_neg