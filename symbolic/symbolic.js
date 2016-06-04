var groebner = require('../groebner')
var helper = require('./algebrite')

function reduce_basis(generating){
	var variables = [];

	// do initial traversal to fill out variables list
	// note that it includes expressions which aren't
	// necessarily plain symbols
	for(var i = 0; i < generating.length; i++){
		var polynomial = generating[i];

		polynomial.forEach(term => {
			var monomial = term[0],
				coeff = term[1];
			monomial.forEach(bases => {
				var expr = bases[0],
					degree = bases[1];
				// check if expr exists in variables
				var index = helper.find_index(expr, variables);
				if(index == -1){
					generating = generating.concat(helper.generate_from_expr(expr))
					variables.push(expr);
				}
			})
		})
	}

	// console.log('with additional:')
	// generating.forEach(print_polynomial)

	// format it how groebner.js expects it
	// as an array of arrays of arrays of arrays

	var simple = generating.map(polynomial => {
		return polynomial.map(term => {
			var monomial = term[0],
				coeff = term[1];

			// initialize an empty array of same length as variables
			for(var base = [], i = 0; i < variables.length; i++) 
				base[i] = 0;

			monomial.forEach(bases => {
				var expr = bases[0],
					degree = bases[1],
					index = helper.find_index(expr, variables);
				console.assert(typeof degree == 'number')
				base[index] = degree;
			})
			return [base, helper.rat2grob(coeff)];
		})
	})

	// console.log(JSON.stringify(simple))
	var gb = groebner.naive_buchberger(simple)
	// var gb = groebner.normal_strategy(simple)
	// console.log(JSON.stringify(gb))
	// console.log('check basis', groebner.is_groebner(gb))
	// console.log(JSON.stringify(gb))
	var gb_red = groebner.reduce_groebner(gb)
	// console.log(JSON.stringify(gb))
	// console.log('check post reduce', groebner.is_groebner(gb_red))
	// console.log('check is reduced', groebner.is_reduced(gb_red))
	// console.log(gb)
	

	// now that we've done the reduction, lets assemble
	// it back into the original form
	var reconstituted = gb_red.filter(nonzero_polynomial).map(polynomial => {
		return polynomial.map(term => {
			var base = term[0],
				coeff = term[1],
				monomial = [];
			for(var i = 0; i < base.length; i++){
				if(base[i] == 0) continue;
				monomial.push([variables[i], base[i]])
			}
			return [monomial, helper.grob2rat(coeff)]
		})
	})

	reconstituted.forEach(print_polynomial)

	return reconstituted
}


function check_basis(generating, expression){
	var variables = [];

	// do initial traversal to fill out variables list
	// note that it includes expressions which aren't
	// necessarily plain symbols
	for(var i = 0; i < generating.length; i++){
		var polynomial = generating[i];

		polynomial.forEach(term => {
			var monomial = term[0],
				coeff = term[1];
			monomial.forEach(bases => {
				var expr = bases[0],
					degree = bases[1];
				// check if expr exists in variables
				var index = helper.find_index(expr, variables);
				if(index == -1){
					variables.push(expr);
				}
			})
		})
	}

	var simple = generating.map(polynomial => {
		return polynomial.map(term => {
			var monomial = term[0],
				coeff = term[1];

			// initialize an empty array of same length as variables
			for(var base = [], i = 0; i < variables.length; i++) 
				base[i] = 0;

			monomial.forEach(bases => {
				var expr = bases[0],
					degree = bases[1],
					index = helper.find_index(expr, variables);
				console.assert(typeof degree == 'number')
				console.assert(index != -1)
				base[index] = degree;
			})
			return [base, helper.rat2grob(coeff)];
		})
	})

	var poly = expression.map(term => {
		var monomial = term[0],
			coeff = term[1];

		// initialize an empty array of same length as variables
		for(var base = [], i = 0; i < variables.length; i++) 
			base[i] = 0;

		monomial.forEach(bases => {
			var expr = bases[0],
				degree = bases[1],
				index = helper.find_index(expr, variables);
			console.assert(typeof degree == 'number')
			console.assert(index != -1)
			base[index] = degree;
		})
		return [base, helper.rat2grob(coeff)];
	})

	// console.log(JSON.stringify(poly))
	// console.log(JSON.stringify(simple))
	return groebner.check_polynomial(simple, poly)
}

function nonzero_polynomial(polynomial){

	return !(polynomial.length == 1 && polynomial[0][0].length == 0 && helper.is_zero(polynomial[0][1]))
}


function print_polynomial(polynomial){
	console.log(polynomial.map(term => {
		var monomial = term[0],
			coeff = term[1];
		
		return coeff + ' ' + monomial.map(bases => {
			var expr = bases[0],
				degree = bases[1];

			return '[' + expr + ']' + (degree == 1 ? '' : ('^' + degree))
		}).join(' ')
	}).join(' + '))
}

function is_inconsistent(basis){
	return basis.some(terms => 
		terms.length == 1 && 
			terms[0][0].length == 0)
}


function compare_basis(a, b){
	if(a.length != b.length) return false;
	for(var i = 0; i < a.length; i++){
		var pa = a[i],
			pb = b[i];

		if(pa.length != pb.length) return false;
		for(var j = 0; j < pa.length; j++){
			var ta = pa[j],
				tb = pb[j];

			// compare variables/monomials/expressions ta[0], tb[0]
			if(!helper.is_equal(ta[0], tb[0])) return false;

			// compare coefficients ta[1], tb[1]
			if(!helper.is_equal(ta[1], tb[1])) return false;
			
		}
	}
	return true
}

exports.extract_polynomial = helper.extract_polynomial
exports.check_basis = check_basis
exports.extract_terms = extract_terms
exports.compare_basis = compare_basis
exports.is_inconsistent = is_inconsistent
exports.print_polynomial = print_polynomial
exports.parse_polynomial = helper.parse_polynomial
exports.reduce_basis = reduce_basis