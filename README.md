# groebner.js

In computer algebra, a Gröbner basis is a powerful tool for solving systems of polynomial equations. This project is not a computer algebra system (for instance, it is completely unable to do any sort of symbolic computation), but it's an implementation of one algorithm which is pretty useful.

I don't really understand math, so probably all of this is wrong. 

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


