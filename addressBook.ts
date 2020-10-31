const fs = require('fs');
import * as readline from 'readline'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class addressBook{
    addressBook = [];

    addContact(name, phone){
        fs.readFile('addbook.json', (err, data) => {
            if (err) throw err;
            this.addressBook = JSON.parse(data);

            this.addressBook.push(
                {
                    name,
                    phone
                }
            );
            console.log(this.addressBook);
            data = JSON.stringify(this.addressBook)
            fs.writeFile("addbook.json", data, (err) => {
                if(err) throw console.log(err);
            });
        });
        return this.addressBook
    }

    deleteContact(delNameInput){
        fs.readFile('addbook.json', (err, data) => {
            if(err) throw err;
            this.addressBook = JSON.parse(data);

            const nameIndex = this.addressBook.map(a => a.name).indexOf(delNameInput)

            console.log(nameIndex);

            this.addressBook.splice(nameIndex,1);
            console.log(this.addressBook);
            data = JSON.stringify(this.addressBook);
            fs.writeFile("addbook.json", data, (err) => {
                if(err) throw console.log(err);
            });
        });
        return this.addressBook
    }

    updateContact(oldNameInput, name, phone){
        fs.readFile('addBook.json', (err, data) => {
            if(err) throw err;
            this.addressBook = JSON.parse(data);

            const nameIndex = this.addressBook.map(a => a.name).indexOf(oldNameInput)

            this.addressBook[nameIndex] = {name,phone};
            console.log(this.addressBook);
            data = JSON.stringify(this.addressBook)
            fs.writeFile("addbook.json", data, (err) => {
                if(err) throw console.log(err);
            });

        });
        return this.addressBook
    }

    viewContact(nameInput){
        fs.readFile('addbook.json', (err, data) => {
            if (err) throw err;
            this.addressBook = JSON.parse(data);

            const nameIndex = this.addressBook.map(a => a.name).indexOf(nameInput)

            console.log(nameIndex);
            
            this.addressBook[nameIndex];
            console.log(this.addressBook[nameIndex]);
            data = JSON.stringify(this.addressBook)
            fs.writeFile("addbook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.addressBook
    }

    viewAllContacts(){
        fs.readFile('addbook.json', (err, data) => {
            if (err) throw err;
            this.addressBook = JSON.parse(data);

            console.log(this.addressBook);
            data = JSON.stringify(this.addressBook)
            fs.writeFile("addbook.json" ,data, (err)=>{
                if(err) throw console.log(err);
            });
        });
        return this.addressBook
    }
}

const person = new addressBook();

function add(){
    rl.question('Enter a Name:',(nameInput) => {
        rl.question('Please add a phone number:', (phoneInput) => {
            person.addContact(nameInput,phoneInput);

            rl.close()
        })
       
    })
}

function del(){
    rl.question('Enter a name: ',(delNameInput)=>{   
    person.deleteContact(delNameInput);
    rl.close()
})
}

function update(){
rl.question('Enter a name to update: ',(oldNameInput)=>{ 
    rl.question('Enter a name: ',(updateNameInput)=>{   
        rl.question('Add a phone number: ',(updatePhoneInput)=>{
            person.updateContact(oldNameInput,updateNameInput,updatePhoneInput);
            
            rl.close()
        })
    })
})
}

function viewOne(){
rl.question('Enter a name to search: ',(nameInput)=>{ 
    person.viewContact(nameInput);
    rl.close()
})
}

function viewAll(){
person.viewAllContacts();
rl.close()

}




console.log("Enter 'a' to add contact");
console.log("Enter 'b' to delete contact");
console.log("Enter 'c' to update contact");
console.log("Enter 'd' to view a single contact");
console.log("Enter 'e' to view all contacts");



rl.question('What would you love to do: ', (choice) => {
    if(choice=='a'){
        add();
    }
    else if(choice=='b'){
        del();
    }
    else if(choice=='c'){
        update();
    }
    else if(choice=='d'){
        viewOne();
    }
    else if(choice=='e'){
        viewAll();
    }
})