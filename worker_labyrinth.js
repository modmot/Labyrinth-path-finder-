// worker_labyrinth.js

let a;
let rows;
let cols;
let finished;
let found;
let slow;
// finished: 1|-1 found: 1|-1 data: a 

self.onmessage = function (event) {
	//	receiving: { a: a, rows: rows , cols: cols, slow: slow});
	a = event.data.a;
	rows = event.data.rows;
	cols = event.data.cols;
	slow = parseInt(event.data.slow);

	let found = wayout(0, 0);

	if (found == 1)
		postMessage({
			finished: 1,
			found: 1,
			element: "green",
			yy: 0,
			xx: 0
		});
	else
		postMessage({
			finished: 1,
			found: -1,
			element: "green",
			yy: 0,
			xx: 0
		});
}



function wayout(x, y) {
	console.log("slow= " + slow + 1);

	// REKURSIONSABBRUCH; REKURSIONSABBRUCH
	// Abbruch, wenn ausserhalb des Labs

	if (x < 0 || x >= cols) {
		return -1;
	}
	if (y < 0 || y >= rows) {
		return -1;
	}

	// Abbruch, wenn Wand
	if (a[x][y] == 'black') {// Wand
		return -1;
	}
	// Abbruch, wenn ich schon da war,
	//und führt nicht zum ziel
	if (a[x][y] == 'red'){
		return -1;
	}
	// Abbruch, wenn ich schon da war,
	//und führt nicht zum ziel
	if (a[x][y] == 'green'){
		return -1;
	}
	//Abbruch, wir sind nun am Ziel
	if (x == cols - 1 && y == rows - 1) {
		console.log("AM ZIEL!!!!");
		return 1;
	}


	// markiere momentanen Weg
	a[x][y] = "green";

	// inform caller to paint a green cell
	postMessage({
		finished: -1,
		found: -1,
		element: "green",
		yy: y,
		xx: x
	});
	wait(slow);


	// suche einen Weg durch das Lab
	if (wayout(x, y - 1) == 1) {		//top
		//a[x][y-1]= Color.red;
		return 1;
	}
	else if (wayout(x + 1, y) == 1) {	//right
		//a[x+1][y]= Color.green;
		return 1;
	}
	else if (wayout(x, y + 1) == 1) {	//bottom
		//a[x][y+1]= Color.red;
		return 1;
	}
	else if (wayout(x - 1, y) == 1) { 	//left
		//a[x-1][y]= Color.red;
		return 1;
	}

	// wenn wir bis hierher kommen gibts keinen weg
	a[x][y] = "red";
	// inform caller for painting
	postMessage({
		finished: -1,
		found: -1,
		element: "red",
		yy: y,
		xx: x
	});
	wait(slow);

	return -1;
}


function wait(ms) {
	let start = new Date().getTime();
	let end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}