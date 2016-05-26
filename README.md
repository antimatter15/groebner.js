# groebner.js

Groebner.js is a pure-Javascript implementation of Buchberger's algorithm for computing a Gröbner basis for a set of polynomial equations. 

In computer algebra, a Gröbner basis is a powerful tool for solving systems of polynomial equations. 

This implementation is largely based off NZMATH, a python number theory calculation system developed at Tokyo Metropolitan University.

This project is not a computer algebra system (for instance, it's completely unable to do any sort of symbolic computation), but it's an implementation of one algorithm which is pretty useful. This implementation is entirely self-contained and requires no dependenceis. 


# WARNING

THIS IMPLEMENTATION DOESN'T WORK YET


# What is a Gröbner basis?

I don't really understand math, so probably all of this is wrong...

You've probably seen linear systems of equations in high school algebra. They look like this

    2x + 3y = 8
    5y - x  = 12

These equations can be expressed in matrix form, and solved with an algorithm called gaussian elimination.

    [2   3   8
     5  -1   12]

Gaussian elimination only works with linear equations, so as soon as you throw an `x^2` into the mix, you have to start looking elsewhere. 

The Groebner basis generalizes Gaussian elimination to systems of polynomial equations. Like how we had to transform the representation of equations into matrix form, to compute a Groebner basis we have to transform our systems of polynomial equations into its own special representation


    2 x^2y - 5y = 8
    x + 2y = 7

These equations can be transformed into residual form (i.e. subtract the left and right halves to create an expression equal to zero)

    2x^2y - 5y - 8 = 0
    x + 2y - 7 = 0

Notice that each of these expressions are now polynomials (or rather, multinomials as they are in terms of more than one variable). 

    2 x^2 y^1 - 5 x^0 y^1 - 8 x^0 y^0 = 0
    2 x^1 y^0 + 2 x^0 y^1 - 7 x^0 y^0 = 0

We'll represent these polynomials as lists of coefficients and degrees. For instance, the base `x^2 y^1` can be represented by the array `[2, 1]` (where we treat `x` as the first index, and `y` as the second index). 

The entire first equation gets represented as:

    [[[2, 1], 2], [[0, 1], 5], [[0, 0], -8]]



# Usage


Check out `symbolic/demo.js` for a neat demo that makes some amount of sense. 


# TODO

Currently it doesn't support any monomial ordering besides lexicographic

Currently there are only two supported coefficient rings: float, which treats coefficients as IEEE754 Javascript floating point numbers (whose use is highly discouraged), and rational which is a teensy implementation of rational numbers.

Currently the implementation isn't correct, and it's currently failing unit tests. I don't really know why. Pull requests will be most graciously accepted. 



