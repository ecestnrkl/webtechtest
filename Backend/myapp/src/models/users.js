const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Details = require('./details.js');
require('dotenv').config();

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowsercase: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is in valid')
            }
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    //array bc user can get more than one token whenever they use a different device
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

usersSchema.virtual('details',{
    ref:'Details',
    localField:'_id',
    foreignField:'owner'
})

/*Es erstellt einen JWT-Token durch Aufrufen der Methode "jwt.sign()" 
und Übergabe der Benutzer-ID als Payload und der ACCESS_TOKEN_SECRET als geheimer Schlüssel. 
Die Benutzer-ID wird mithilfe der Methode "toString()" in einen String konvertiert.
Es fügt den neu erstellten Token dem Array "tokens" des Benutzers hinzu.
Es speichert den Benutzer in der Datenbank.
Es gibt den erstellten Token zurück.

Diese Methode ist nützlich zum Erstellen eines Tokens für einen Benutzer, 
nachdem sie erfolgreich authentifiziert wurden, 
und dieser Token kann für zukünftige Anfragen an den Server verwendet werden, 
um den Benutzer ohne erneute Eingabe ihrer Anmeldeinformationen zu authentifizieren.
*/

usersSchema.methods.generateAuthToken = async function () {
    const users = this
    const token = await jwt.sign({ _id: users._id.toString() }, 'probecode' /*"" + process.env.ACCESS_TOKEN_SECRET*/)
    users.tokens = users.tokens.concat({ token });
    await users.save();
    return token;
}
/*
sucht nach einem Benutzer mit der angegebenen E-Mail-Adresse in der Datenbank 
mithilfe der Methode "findOne()" des Users-Modells.
Wenn kein Benutzer gefunden wurde, wirft die Methode einen Fehler "User not found"
Wenn ein Benutzer gefunden wurde, vergleicht die Methode das angegebene Passwort 
mit dem gespeicherten Hash-Passwort des Benutzers mithilfe der Methode "bcrypt.compare()"
Wenn das Passwort nicht übereinstimmt, wirft die Methode einen Fehler "Incorrect password"
Wenn das Passwort übereinstimmt, gibt die Methode den gefundenen Benutzer zurück.

Dieser Code ist nützlich, um die Anmeldeinformationen eines Benutzers zu überprüfen, 
indem er sowohl die E-Mail-Adresse als auch das Passwort überprüft, 
indem er sie mit den gespeicherten Daten in der Datenbank vergleicht. 
Es nutzt dabei die Methode "bcrypt.compare()" um das Passwort mit dem 
gespeicherten Hash-Passwort zu vergleichen, um sicherzustellen, dass das eingegebene Passwort 
mit dem Passwort des Benutzers übereinstimmt, bevor es den Benutzer zurückgibt.
*/ 

usersSchema.statics.findByCredentials = async (email, password) => {
    try {
      const users = await Users.findOne({ email });
      if (!users) {
        throw new Error('User not found');
      }
      const isMatch = await bcrypt.compare(password, users.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }
      return users;
    } catch (error) {
      throw error;
    }
  }
  
/*Dieser Code definiert eine asynchrone Funktion, die als "pre-save" Hook für das "usersSchema" Mongoose-Schema verwendet wird.
Innerhalb der Funktion wird überprüft, ob das Passwort des Benutzers geändert wurde. 
Wenn ja, wird das Passwort des Benutzers mit dem Bcrypt-Modul gehasht 
und das Ergebnis wird dem "password"-Feld des Benutzers zugewiesen. 
Schließlich wird die "next()"-Funktion aufgerufen, um die Ausführung der nächsten Anweisungen fortzusetzen. 

Dieser Code wird verwendet, um das Passwort des Benutzers in der Datenbank zu verschlüsseln, 
bevor es gespeichert wird. Verschlüsselung von Passwörtern ist wichtig, um die Sicherheit 
der Anwendung zu gewährleisten und zu verhindern, dass unbefugte Personen Zugriff auf die Passwörter der Benutzer erhalten.
Der Bcrypt-Algorithmus wird verwendet, um das Passwort zu verschlüsseln, weil es ein sicheres und 
gängiges Verfahren zum Hash von Passwörtern ist, das die Möglichkeit von Brute-Force-Angriffen erschwert.

Der Hook 'pre' with 'save' wird aufgerufen, bevor ein Dokument in der Datenbank gespeichert wird. In diesem Fall wird das Passwort des Benutzers gehasht, bevor es in die Datenbank gespeichert wird.*/

usersSchema.pre('save', async function (next) {
    const users = this
    if (users.isModified('password')) {
        users.password = await bcrypt.hash(users.password, 8);
    }
    next();
})
/*bcrypt.hash() gibt ein promise zurück, weshalb wir das Schlüsselwort await verwenden können, um auf die Fertigstellung des Hashes zu warten.
Wenn das Passwortfeld nicht geändert wurde, wird der Code innerhalb des if-Blocks nicht ausgeführt und next() direkt zurückgegeben.
Der Parameter 8, der der bcrypt.hash-Funktion übergeben wird, ist die Anzahl der Runden, die zur Berechnung des Hashes verwendet werden. 
Eine höhere Anzahl von Runden erhöht die Sicherheit des Hashes, macht den Prozess aber auch langsamer.*/


/*Diese Methode sorgt dafür, dass alle Aufgaben, die einem Benutzer zugeordnet sind, 
automatisch gelöscht werden, wenn der Benutzer aus der Datenbank gelöscht wird.*/
usersSchema.pre('remove', async function(next){
    const users = this
    await Tasks.remove({owner:require.users._id})
    next();
})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users