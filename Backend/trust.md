Man könnte diesen Code in der /models/users.js Datei implementieren. 

usersSchema.methods.toJSON = function (){
    const users = this.toObject()
    delete users.password
    delete users.tokens
    return users;
}

Dieser Code ist eine Methode, die an das User-Schema angehängt ist und "toJSON" heißt. Wenn ein Mongoose-Dokument in ein JSON-Objekt konvertiert wird, verwendet Mongoose diese Methode, um zu bestimmen, welche Eigenschaften im resultierenden JSON-Objekt enthalten sein sollen.

Diese spezielle Implementierung von "toJSON" wird folgendes machen:

1. Konvertiert das Mongoose-Dokument in ein einfaches JavaScript-Objekt mithilfe der Methode "toObject()"
2. Löscht die Eigenschaften "password" und "tokens" aus dem Objekt.
3. Gibt das modifizierte Objekt zurück.

Es ist nützlich, da es verhindert, dass sensible Informationen wie das Passwort des Benutzers und die Authentifizierungstoken an den Client im Antwort gesendet werden. Es stellt sicher, dass das User-Objekt, das in der Antwort zurückgegeben wird, keine sensiblen Informationen wie Passwort und Tokens enthält.

Es ist eine gute Praxis, sensitive Informationen wie gehashtes Passwort und Tokens aus dem Objekt zu entfernen, bevor es an den Client gesendet wird.