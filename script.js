//----------INHERITANCE-------
/*
Inheritance is  used when we know the answer to what/who. 
One drawback is that we have to keep  the future in mind
*/
class Animal {
  poops = () => {
    console.log("animal poops")
  }
}

class Reptile extends  Animal {
  crawls = ()  => {
    console.log("Reptiles crawl")
  }
}

class Amphibian extends Animal {
  walks = () => {
    console.log("Amphibians walk")
  }
}

const reptile = new Reptile()
const amphibian = new Amphibian() 

console.log(reptile.poops()) //inheriting Animal class
console.log(amphibian.poops()) //inheriting class Animal

/*
The problem with Inheritance is that it is not very flexible. It is hard to change the design pattern
later on in a project if someething new comes up like creating a reptile  that also walks
*/
//  In that case composition is used.   


//------------COMPOSITION------------

/*
Compositioon focses on HOW. It creates functions that can be used inside of different objects to  define WHAT/WHO
*/

function animalWalks({name}) {
  return {
    walks: () => console.log(name+"  walks")
  }
}

function animalCrawls({name}) {
  return {
    crawls: () => console.log(name+"  crawls")
  }
}

function animalFly({name}) {
  return {
    flies: () => console.log(name+"  flies")
  }
}

function animalThatFliesAndWalks(name)  {
  const animal = {name}
  return {
    ...animal,
    ...animalWalks(animal)
  }
}

function  animalThatWalksAndCrawls(name) {
  const animal = {name}
  return {
    ...animal,
    ...animalWalks(animal),
    ...animalCrawls(animal)
  }
}

const final = animalThatFliesAndWalks("Ostrich")
const walkCrawl = animalThatWalksAndCrawls("random_animal")
final.walks()
walkCrawl.crawls()

//Here using composition we can create any number of  combination of the functions


//-----------DESIGN PATTERNS------------
//Factory Pattern--------------
//Factory pattern in a creationsl design method that uses factory methods to create objects.
function Developer(name) {
  this.name = name
  this.type = "Developer"
}
function Tester(name) {
  this.name = name
  this.type = "Tester"
}
function EmployeeFactory() {
  this.create = (name, type) => {
    switch(type) {
      case  1: 
        return new Developer(name)
        break;
      case 2:
        return new Tester(name)
        break;
    }
  }
}

const employeeFactory = new EmployeeFactory()
let employees = []

employees.push(employeeFactory.create("John",1))
employees.push(employeeFactory.create("Tom", 2));

console.log(employees)


//Singleton Pattern-------------
//a creational pattern.  Comes in handy when we want to limit  the number of instances
//of  an object to atmost one.
function Process(state) {
  this.state = state
}

const Singleton = (function(){
  function ProcessManager(){
    this.numProcess = 0
  }
  let pManager
  function createPManager() {
    pManagger  = new ProcessManager()
    return pManager
  } 
  return {
    getProcessManager: () => {
      if(!pManager){
        pManager = createPManager()
      }
      return pManager;
    }
  }
})()

const processManagerIns = Singleton.getProcessManager()
const processManagerIns2 = Singleton.getProcessManager()

console.log(processManagerIns  === processManagerIns2) //Same instance returned twice


//Strategy Pattern-------------
//A behavioural pattern. It enables us to define a group of closely related algorithms/strategies.
//The strategy pattern allows us to swap strategies in and out for each other as needed at runtime.




//Proxy patter
//Observre Pattern


    




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
console.log("Read message 0: " + readMessages.has(messages[0])); // true

messages.shift();
// now readMessages has 1 element (technically memory may be cleaned later)

//---------------CUSTOM .BIND()--------------

let userObj = {
  firstname: "Shekhar",
  lastname: "BHattacharya"
}

let printName = function (hometown, state) {
  console.log(this.firstname + " " + this.lastname + ", " + hometown + ", " + state)
}
//call: printname.call(userobj, arguments)
//apply:  printname.apply(userobj, [arguments])
let printMyname = printName.bind(userObj, "india")
printMyname("world")

//mybind  implementation
Function.prototype.mybind = function(...args){
  let parentContext = this
  let params =   args.slice(1)
  return function(...args2) {
    parentContext.apply(args[0], [...params, ...args2]);
  }
}

let printmyname2 = printName.mybind(userObj, "hometown")
printmyname2("state")

//-------------CURRYING---------
//Currying refers to the transformation of a function with multiple arity into the same  function with ess arity
let multiply = function(x, y) {
  console.log(x*y)
}

let multiplyby2 = multiply.bind(this, 2) //usingg the previous function, created a new one



//---------------Javascript SOLID Priinciples--------

/*
1. Single Responsibility  - Any module of the code should have only one responsibbility or only one reason to change.
For  example:  Lets say we have a Calory tracker class that contains functions to track calory an log the current calory. 
Since it has multiple responsibilitie, we  can move logger toa different module of its own
*/

/*
2. Open/Cllosed Principle:  
*/





