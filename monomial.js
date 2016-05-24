// Return the least common multiple.
// lcm((i1, ..., in), (j1, ..., jn)) = (max(i1, j1), ..., max(in, jn))
function mono_lcm(a, b){
    return zip(a, b, (x, y) => Math.max(x, y))
}

exports.lcm = mono_lcm;

// (i1, ..., in) - (j1, ..., jn) = (i1 - j1, ..., in - jn)
function mono_sub(a, b){
    return zip(a, b, (x, y) => x - y)
}

exports.sub = mono_sub;

// (i1, ..., in) + (j1, ..., jn) = (i1 + j1, ..., in + jn)
function mono_add(a, b){
    return zip(a, b, (x, y) => x + y)
}

exports.add = mono_add

// Compare two indices left and right and determine precedence
function mono_cmp(a, b){
    for(var i = 0; i < a.length; i++){
        if(a[i] < b[i]) return +1;
        if(a[i] > b[i]) return -1;
    }
    return 0;
}

exports.cmp = mono_cmp;

function mono_equal(a, b){
    return mono_cmp(a, b) === 0
}

exports.equal = mono_equal


// Return the index where to insert item `elem' in a list `array',
// assuming array is sorted with the order. 

// This function is based on the bisect.bisect_right of the Python
// standard library.

function bisect(array, elem){
    var lo = 0,
        hi = array.length,
        mid;
    while(lo < hi){
        mid = (lo + hi) >> 1
        if(mono_cmp(elem, array[mid]) < 0){
            hi = mid
        }else{
            lo = mid + 1
        }
    }
    return lo
}

exports.bisect = bisect;

// helper method for lcm, sub, and add
function zip(a, b, fn){
    if(a.length != b.length) throw new TypeError("different length indices");
    var c = new Array(a.length);
    for(var i = 0; i < a.length; i++) c[i] = fn(a[i], b[i]);
    return c;
}