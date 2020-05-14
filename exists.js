function exists(path, object) {
    if (!object) return false;
    let match = path[0].match(/(.+)\[(.+)\]/);
    if (match) {
        path[0] = match[1];
        let arrayItemName = match[2].replace(/'/g,'').replace(/"/g,'');
        path.splice(1, 0, arrayItemName);
    }
    if (Array.isArray(object)) {
        return object.some(item => {
            return (item['name'] == path[0].trim() || item['group'] == path[0].trim() || item['id'] == path[0].trim()
            ) && (path.length == 1 || exists(path.slice(1), item));
        })
    } else {
        return object.hasOwnProperty(path[0].trim()) && (path.length == 1 || exists(path.slice(1), object[path[0]]));
    }
}

if (exports){
    exports.exists = exists
}
