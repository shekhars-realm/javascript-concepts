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
//Similar to SET but it holds only objects as keys, not primitives
//supports add, has, delete but not keys(), size and no iterations
//usecase: keep track of the users that visited a webpage
let visitedSet = new WeakSet()

let user_1 = {name: "john"}
let user_2 = {name: "tom"}

visitedSet.add(user_1).add(user_2);

console.log(visitedSet.has(user_2)) //john visited the webpage