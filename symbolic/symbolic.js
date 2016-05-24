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

	var gb = groebner.normal_strategy(simple)
	var gb_red = groebner.reduce_groebner(gb)

	// now that we've done the reduction, lets assemble
	// it back into the original form
	var reconstituted = gb_red.map(polynomial => {
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

	return reconstituted
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

exports.print_polynomial = print_polynomial
exports.parse_polynomial = helper.parse_polynomial
exports.reduce_basis = reduce_basis