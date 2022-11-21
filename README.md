# tictactoe
Tic Tac Toe Project
 
In this project i put on practice what i've learned about the module pattern as a way to no pollute the global namespace, and the use of factory functions instead of. One of the things that caught my atention while i was doing this project is that what would be the difference between the creation of variables using `let`, and the encapsulation of them in a module pattern, the thing is, that the use of the module pattern corresponds to a time where we didn't have something like `let`. In those times we would use `var` to create variables, and while `let` and `const` are block-scoped, `var` is global-scoped, making the use of the module pattern something necessarily in the case in which we may have multiple functions or variables with the same name, or just to avoid a collision in the global namespace.

In what respect to the use of factory functions and object constructor we must keep in mind what is the real utility of them: they allow us to return an object, to create automatically objects with determined properties and values. The difference between them is that an Object Constructor use `this` to declare the properties and values of the new object, the thing is that if we invoke and Object Constructor without using the `new` keyword it will produce a silent bug due to the fact that the Object Constructor won't return the desired object (in fact it will return 'undefined'). That's where the advantage of using a factory function is at, we don't need to use the `new` keyword everytime that we are creating/returning a new object, instead, we just create an object in our factory function, assign to it the correspondent values and then we return the desire object.

I think that the most tought challenge in this project was the implementation of the Minimax algorithm, but once I caught the fundamentals i was able to implement and modify it where it was needed.

Object Constructor Syntax:
```
function personConstructor(name, gender, age){
	this.name = name;
	this.gender = gender;
	this.age = age;
};

let janeDoe = new personConstructor('Jane', 'Female', 23); // good
let johnDoe = personConstructor('John', 'Male', 22); // bad
```

Factory Function Syntax:
```
function personFactory(name, gender, age){
	let newObj = {};
	
	newObj.name = name;
	newObj.gender = gender;
	newObj.age = age;

	return newObj;
}

let janeDoe = personFactory('Jane', 'Female', 22); // good

// or

function songFactory(title, gender, duration){
	return {
		name,
		gender,
		duration,
	}
};

let aiPreto = songFactory('Ai Preto', 'Funk', '2:08');
```
