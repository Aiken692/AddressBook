"use strict";
exports.__esModule = true;
var fs = require('fs');
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var addressBook = /** @class */ (function () {
    function addressBook() {
        this.addressBook = [];
    }
    addressBook.prototype.addContact = function (name, phone) {
        var _this = this;
        fs.readFile('addbook.json', function (err, data) {
            if (err)
                throw err;
            _this.addressBook = JSON.parse(data);
            _this.addressBook.push({
                name: name,
                phone: phone
            });
            console.log(_this.addressBook);
            data = JSON.stringify(_this.addressBook);
            fs.writeFile("addbook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.addressBook;
    };
    addressBook.prototype.deleteContact = function (delNameInput) {
        var _this = this;
        fs.readFile('addbook.json', function (err, data) {
            if (err)
                throw err;
            _this.addressBook = JSON.parse(data);
            var nameIndex = _this.addressBook.map(function (a) { return a.name; }).indexOf(delNameInput);
            console.log(nameIndex);
            _this.addressBook.splice(nameIndex, 1);
            console.log(_this.addressBook);
            data = JSON.stringify(_this.addressBook);
            fs.writeFile("addbook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.addressBook;
    };
    addressBook.prototype.updateContact = function (oldNameInput, name, phone) {
        var _this = this;
        fs.readFile('addBook.json', function (err, data) {
            if (err)
                throw err;
            _this.addressBook = JSON.parse(data);
            var nameIndex = _this.addressBook.map(function (a) { return a.name; }).indexOf(oldNameInput);
            _this.addressBook[nameIndex] = { name: name, phone: phone };
            console.log(_this.addressBook);
            data = JSON.stringify(_this.addressBook);
            fs.writeFile("addbook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.addressBook;
    };
    addressBook.prototype.viewContact = function (nameInput) {
        var _this = this;
        fs.readFile('addbook.json', function (err, data) {
            if (err)
                throw err;
            _this.addressBook = JSON.parse(data);
            var nameIndex = _this.addressBook.map(function (a) { return a.name; }).indexOf(nameInput);
            console.log(nameIndex);
            _this.addressBook[nameIndex];
            console.log(_this.addressBook[nameIndex]);
            data = JSON.stringify(_this.addressBook);
            fs.writeFile("addbook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.addressBook;
    };
    addressBook.prototype.viewAllContacts = function () {
        var _this = this;
        fs.readFile('addbook.json', function (err, data) {
            if (err)
                throw err;
            _this.addressBook = JSON.parse(data);
            console.log(_this.addressBook);
            data = JSON.stringify(_this.addressBook);
            fs.writeFile("addbook.json", data, function (err) {
                if (err)
                    throw console.log(err);
            });
        });
        return this.addressBook;
    };
    return addressBook;
}());
var person = new addressBook();
function add() {
    rl.question('Enter a Name:', function (nameInput) {
        rl.question('Please add a phone number:', function (phoneInput) {
            person.addContact(nameInput, phoneInput);
            rl.close();
        });
    });
}
function del() {
    rl.question('Enter a name: ', function (delNameInput) {
        person.deleteContact(delNameInput);
        rl.close();
    });
}
function update() {
    rl.question('Enter a name to update: ', function (oldNameInput) {
        rl.question('Enter a name: ', function (updateNameInput) {
            rl.question('Add a phone number: ', function (updatePhoneInput) {
                person.updateContact(oldNameInput, updateNameInput, updatePhoneInput);
                rl.close();
            });
        });
    });
}
function viewOne() {
    rl.question('Enter a name to search: ', function (nameInput) {
        person.viewContact(nameInput);
        rl.close();
    });
}
function viewAll() {
    person.viewAllContacts();
    rl.close();
}
console.log("Enter 'a' to add contact");
console.log("Enter 'b' to delete contact");
console.log("Enter 'c' to update contact");
console.log("Enter 'd' to view a single contact");
console.log("Enter 'e' to view all contacts");
rl.question('What would you love to do: ', function (choice) {
    if (choice == 'a') {
        add();
    }
    else if (choice == 'b') {
        del();
    }
    else if (choice == 'c') {
        update();
    }
    else if (choice == 'd') {
        viewOne();
    }
    else if (choice == 'e') {
        viewAll();
    }
});
