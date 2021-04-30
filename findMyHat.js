console.log("This console.log printed from 'findMyHat.js' file");

const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '\u2591';
const pathCharacter = '*';

// const name = prompt('What is your name?');
// console.log(`Hey there ${name}!`);

//Create a class controller for the game
class Field {

    //Initialize the variables in the class
    constructor(field) {

        this.field = field;

        //this.start is the default starting position for char "*"
        this.start = {
            x: 0,
            y: 0
        };

        //this.hatPos is the default position for hat "^"
        this.hatPos = {
            x: 0,
            y: 0
        };

        this.locationX = 0;
        this.locationY = 0;
    }   //End of constructor

    //Call static method directly from the Class object
    static generateField(fieldH, fieldW, percentage = 0.1) {
        const field = new Array(fieldH)
            .fill(0)
            .map(() => new Array(fieldW));

        for (let y = 0; y < fieldH; y++) {
            for (let x = 0; x < fieldW; x++) {
                const prob = Math.random();                                         //Math.random returns a value between 0 and 1
                // console.log(prob);
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        return field;
    }   //End of generateField method

    runGame() {

        //Call other methods in the class
        this.setStart();            //Sets the position of character "*" to random
        this.setHat();              //Sets the position of hat "^" to random

        this.print();               //Prints out the rows and columns
        this.getInput();            //Gets input from the user

        if (this.isHat()) {
            console.log('Congrats, you found your hat!');
        }
    }

    setStart() {
        this.start = this.setPos();         //setPos returns a random x and y value
        this.locationX = this.start.x;
        this.locationY = this.start.y;
        this.field[this.locationY][this.locationX] = pathCharacter;     //*
    }

    setHat() {
        this.hatPos = this.setPos(this.start);
        while (this.isHat()) {
            this.hatPos = this.setPos(this.start);
        }
        this.field[this.hatPos.y][this.hatPos.x] = hat;                 //^
    }

    print() {
        this.field[this.locationY][this.locationX] = pathCharacter;
        clear();
        this.field.forEach(element => console.log(element.join('')));
    }

    getInput() {
        while (!this.isHat()) {
            const input = prompt('Which way? ').toUpperCase();
            if (input === "W") {
                this.locationY -= 1;
                if (this.isBoundsY()) {
                    console.log('Out of bounds instruction!');
                    break;
                } else if (this.isHole()) {
                    console.log('Sorry, you fell down a hole!');
                    break;
                } else if (this.isHat()) {
                    break;
                } else {
                    this.print();
                }
            } else if (input === "S") {
                this.locationY += 1;
                if (this.isBoundsY()) {
                    console.log('Out of bounds instruction!');
                    break;
                } else if (this.isHole()) {
                    console.log('Sorry, you fell down a hole!');
                    break;
                } else if (this.isHat()) {
                    break;
                } else {
                    this.print();
                }
            } else if (input === "A") {
                this.locationX -= 1;
                if (this.isBoundsX()) {
                    console.log('Out of bounds instruction!');
                    break;
                } else if (this.isHole()) {
                    console.log('Sorry, you fell down a hole!');
                    break;
                } else if (this.isHat()) {
                    break;
                } else {
                    this.print();
                }
            } else if (input === "D") {
                this.locationX += 1;
                if (this.isBoundsX()) {
                    console.log('Out of bounds instruction!');
                    break;
                } else if (this.isHole()) {
                    console.log('Sorry, you fell down a hole!');
                    break;
                } else if (this.isHat()) {
                    break;
                } else {
                    this.print();
                }
            }
        }
    }

    isBoundsX() {
        return this.locationX >= this.field[0].length || this.locationX < 0;
    }

    isBoundsY() {
        return this.locationY >= this.field.length || this.locationY < 0;
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === 'O';
    }

    isHat() {
        return this.locationX == this.hatPos.x && this.locationY == this.hatPos.y;
    }

    setPos() {

        const pos = {
            x: 0,
            y: 0
        }

        //Sets pos.x to a random number (0 to 1), multiplied by length of 1st array in field, rounded down
        pos.x = Math.floor(Math.random() * this.field[0].length);

        //Sets pos.y to a random number (0 to 1), multiplied by length of field array, rounded down
        pos.y = Math.floor(Math.random() * this.field.length);

        return pos;
    }

}   //End of Field class

//Create an instance of Field class and call generateField directly from Class name
const myField = new Field(Field.generateField(10, 10, 0.2));

myField.runGame();

