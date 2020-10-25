//---------WEAKMAP------------------ 
//weakmap . doesnot prevent garbage collection of key objects
//weakMapkeys mmust be objects and not primitive values

let john = {name:  "john"}
let weakMap  = new WeakMap()
weakMap.set(john,  "...")
john = null //remove the reference to the object
console.log(weakMap.get(john)) //undefined

//weakmap doesnot support the iteration methods as in map  like .keys(),  .values(),.entries()
//usecase: to store  additional information of an obect as long as that object is available or accessable
//usecase:  caching the result of functions
let cache = new WeakMap()
function processObj(obj) {
    if(!cache.has(obj)){
        let result = `Age of ${obj.name} is ${obj.age}`;
        cache.set(obj, result)
    }
    return cache.get(obj)
}
let result1 = processObj({name:   "john",age: "25"})
///now if wdelete the user object, the cachewill automatically be cleared because it is WeakMap


//----------WEAKSET-----------
