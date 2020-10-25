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
//usecase:  WeakSet is used to give flags like true/false, exists/not,  yes/no

let visitedSet = new WeakSet()

let user_1 = {name: "john"}
let user_2 = {name: "tom"}

visitedSet.add(user_1).add(user_2);
console.log(visitedSet.has(user_2)) //john visited the webpage:  true
user_1 = null //Visited set will  be cleared automatically


//--------------Example for WEAKMAP and WEAKSET---------------
//Create a DS  that hold the unred messages and remves them as soon as they are read. : WeakSet
let messages = [
  { text: "Hello", from: "John" },
  { text: "How goes?", from: "John" },
  { text: "See you soon", from: "Alice" },
];

let readMessages = new WeakSet();

// two messages have been read
readMessages.add(messages[0]);
readMessages.add(messages[1]);
// readMessages has 2 elements

// ...let's read the first message again!
readMessages.add(messages[0]);
// readMessages still has 2 unique elements

// answer: was the message[0] read?
alert("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)

