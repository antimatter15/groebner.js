function zip(a, b, fn){
    if(a.length != b.length) throw new TypeError("different length indices");
    var c = new Array(a.length);
    for(var i = 0; i < a.length; i++) c[i] = fn(a[i], b[i]);
    return c;
}

// Return the least common multiple.
// lcm((i1, ..., in), (j1, ..., jn)) = (max(i1, j1), ..., max(in, jn))
exports.lcm = function mono_lcm(a, b){
    return zip(a, b, (x, y) => Math.max(x, y))
}

exports.sub = function mono_sub(a, b){
    return zip(a, b, (x, y) => x - y)
}

exports.add = function mono_add(a, b){
    return zip(a, b, (x, y) => x + y)
}

function mono_cmp(a, b){
    for(var i = 0; i < a.length; i++){
        if(a[i] < b[i]) return +1;
        if(a[i] > b[i]) return -1;
    }
    return 0;
}

exports.cmp = mono_cmp;

exports.equal = function mono_equal(a, b){
    return mono_cmp(a, b) === 0
}