export function depurar(array,props) {
    var hash = {};
    return array.filter(function(current) {
        if(!current[props]) return false;
        var exists = !hash[current[props]] || false;
        hash[current[props]] = true;
        return exists;
    });
}