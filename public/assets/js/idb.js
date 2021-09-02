// create variable to hold db connection
// stores the connected database object when the connection is complete
let db;

// establish a connection to IndexedDB database called "pizza_hunt" and set it to version 1
// request variable acts as an event listener for the database
// indexedDB is a global variable as part of the browser's window object
// open() takes two parameters, 1) the name of the IndexedDB you want to create or connect to, 2) the version of the database (by default we start it at 1)
const request = indexedDB.open("pizza_hunt", 1);

// the container that stores the data is called an: object store
// can't create until the connection to the db is open 
// this event will emit if the database version changes
request.onupgradeneeded = function(event) {
  // save a reference to the db
  const db = event.target.result;
  // create an object store (table) called `new_pizza`, 
  // set it to have an auto incrementing primary key of sorts so we can retrieve the data
  db.createObjectStore("new_pizza", { autoIncrement: true });
};

// upon a successful db connection/creation
request.onsuccess = function(event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) 
  // or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadPizza() function to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet but will soon
    // uploadPizza();
  }
};

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transation wtih the database wtih read and write permissions
  const transaction = db.transaction(["new_pizza"], "readwrite");

  // access the object store for `new_pizza`
  const pizzaObjectStore = transaction.objectStore("new_pizza");

  // add record to your store with add method
  pizzaObjectStore.add(record);
}