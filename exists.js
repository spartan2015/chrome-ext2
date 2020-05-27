function exists(path, object) {
    if (!object) return false;
    let match = path[0].match(/(.+)\[(.+)=['"](.+)['"]\]/);
    if (match) {
        let indexName = match[2];
        let indexValue= match[3].replace(/'/g,'').replace(/"/g,'');
        let theArray = object[match[1]];
        return theArray && Array.isArray(theArray) && theArray.some(item=>item[indexName]==indexValue && exists(path.slice(1), item))
    }
    if (Array.isArray(object)) {
        return object.some(item => {
            return (item['name'] == path[0].trim() || item['group'] == path[0].trim() || item['id'] == path[0].trim()
            ) && (path.length == 1 || exists(path.slice(1), item)
                || (item && item.selectors && exists(path.slice(1), item.selectors))
            );
        })
    } else {
        let item = object[path[0]];
        return (object.hasOwnProperty(path[0].trim()) || object['name'] == path[0].trim() || object['group'] == path[0].trim() || object['id'] == path[0].trim()) && (path.length == 1 ||
            exists(path.slice(1), item)
            || (item && item.selectors && exists(path.slice(1), item.selectors))

        );
    }
}

if (typeof exports !== 'undefined'){
    exports.exists = exists
}
