const openRequest = indexedDB.open('indexedDB');

openRequest.onupgradeneeded = function() {
  // triggers if the client had no database
  // ...perform initialization...
  console.log('initialization');
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
	let db = openRequest.result;
	db.onversionchange = function() {
		db.close();
		alert("Database is outdated, please reload the page.")
  };

  // continue working with database using db object
  console.log(db);
};

openRequest.onblocked = function() {
  // this event shouldn't trigger if we handle onversionchange correctly

  // it means that there's another open connection to the same database
  // and it wasn't closed after db.onversionchange triggered for it

  console.log('onblocked');
};
