# Backend Praktikum 1

## Dokumentation Aufgabe 1.3

Mit POST an http://127.0.0.1:1000/users kann man mehrere Daten eines Users eintragen.
Die Eintragung müsste zum Beispiel so aussehen: <br>
```
[ 
  {
    "name": "Ece", 
    "age": 24, 
    "hobby": "Fotografie"
  } 
]
```


Mit Send wurden die Daten gespeichert und man sollte den HTTP Statuscode 201 Created zurück bekommen. Wenn etwas schief gelaufen ist wie zum Beispiel ein Schreibfehler, sollte man den HTTP Statuscode 400 Bad Request bekommen.

Man kann die Daten des Users nun mit GET an http://127.0.0.1:1000/users abrufen und bekommt den HTTP Statuscode 200 OK raus.
Der Eintrag müsste zum Beispiel so aussehen:
```
[ 
  {
    "_id": "63bdfc4b2a3a8a71384d6add", 
    "name": "Ece", 
    "age": 24,
    "hobby": "Fotografie"
  }
]
```
Wenn etwas schief geht dann kommt HTTP Statuscode 500 Internal Server, denn wenn die Eingabe erfolgreich war ist ein Problem mit dem Server aufgetreten.

## Dokumentation Aufgabe 1.4

### User Model

Mit POST an http://127.0.0.1:1000/users kann man mehrere Daten eines Users eintragen. Dabei wird auch mit dem validator darauf geachtet, dass eine valide email angegeben wird.
Die Eintragung müsste zum Beispiel so aussehen: <br>
```
  {
    "name": "Ece Sutanrikulu",
    "email": "ece.sutanrikulu@hm.edu"
    "password": "nkdfsfsbn83kj"
  } 
```

Alle drei Felder sind verpflichtend und korrekt vom User auszufüllen, damit sie in der Datenbank gespeichert werden.
Mit Send wurden die Daten gespeichert und man sollte den HTTP Statuscode 201 Created zurück bekommen. Wenn etwas schief gelaufen ist wie zum Beispiel ein Schreibfehler, sollte man den HTTP Statuscode 400 Bad Request bekommen.

Man kann die Daten des Users nun mit GET an http://127.0.0.1:1000/users abrufen und bekommt den HTTP Statuscode 200 OK raus.
Der Eintrag müsste zum Beispiel so aussehen:
```
 {
    "_id": "63bebd1237c4f17e49f984e5",
    "name": "Ece Sutanrikulu",
    "email": "ece.sutanrikulu@hm.edu",
    "password": "nnkdfsfsbn83kj",
    "__v": 0
  }
```
Wenn etwas schief geht dann kommt der HTTP Statuscode 404 Not Found. 

Mit GET an http://127.0.0.1:1000/users/63bebd1237c4f17e49f984e5 kann man einen einzelnen User abrufen und bekommt den HTTP Statuscode 200 OK raus.

```
 {
    "_id": "63bebd1237c4f17e49f984e5",
    "name": "Ece Sutanrikulu",
    "email": "ece.sutanrikulu@hm.edu",
    "password": "nnkdfsfsbn83kj",
    "__v": 0
  }
```
Wenn der User nicht mit angegeben id gefunden wird kommt der HTTP Statuscode 404 Not Found oder wenn etwas mit dem Server ist dann kommt HTTP Statuscode 500 Internal Server.

Mit PATCH an http://127.0.0.1:1000/users/63bebd1237c4f17e49f984e5 kann man den Namen und das Passwort der Users ändern. Die Email-Adresse zu ändern ist jedoch nicht möglich, denn der sollte wie am Anfang angegeben gleich bleiben. Wenn man es versucht, ändert sich nichts und man bekommt in der Konsole die Ausgabe "your email cannot be updated". 
Eingabe: 
```
  {
    "name": "Ece Sut",
    "password": "mccokcodj27"
  } 
```

Ausgabe:

```
 {
    "_id": "63bebd1237c4f17e49f984e5",
    "name": "Ece Sut",
    "email": "ece.sutanrikulu@hm.edu",
    "password": "mccokcodj277",
    "__v": 0
  }
```

Mit DELETE an http://127.0.0.1:1000/users/63bebd1237c4f17e49f984e5 kann man den User von der Datenbank löschen und bekommt den HTTP Statuscode 200 OK raus und die message "User wurde entfernt". Wenn man den gleichen User entfernen will, kommt der HTTP Statuscode 404 Not Found und die message "Cannot find the user" und wenn etwas mit dem Server ist dann kommt HTTP Statuscode 500 Internal Server.

### Details Model 

Mit POST an http://127.0.0.1:1000/details kann man mehrere Details eines User eintragen. Dabei wird auch mit dem validator darauf geachtet, dass das Alter nicht im negativen Bereich sein kann oder zu hoch (0 min - 150 max.).
Die Eintragung müsste zum Beispiel so aussehen: <br>
```
  {
    "age": 24,
    "destination": "München",
    "faveColor": "blue",
    "quote": "Probieren geht über studieren"
  } 
```

Die Felder "age" und "destinaton" sind verpflichtend und korrekt vom User auszufüllen, damit sie in der Datenbank gespeichert werden. Die weiteren können aber müssen nicht vom User ausgefüllt werden.
Mit Send wurden die Daten gespeichert und man sollte den HTTP Statuscode 201 Created zurück bekommen. Wenn etwas schief gelaufen ist wie zum Beispiel ein Schreibfehler, sollte man den HTTP Statuscode 400 Bad Request bekommen.

Man kann die Daten des Users nun mit GET an http://127.0.0.1:1000/details abrufen und bekommt den HTTP Statuscode 200 OK raus. <br>
Der Eintrag müsste zum Beispiel so aussehen:
```
 {
    "_id": "63bebd1237c4f17e49f984e5",
    "age": 24,
    "destination": "München",
    "faveColor": "blue",
    "quote": "Probieren geht über studieren"
    "__v": 0
  }
```
Wenn etwas schief geht dann kommt der HTTP Statuscode 404 Not Found. 

Mit GET an http://127.0.0.1:1000/details/63bebd1237c4f17e49f984e5 kann man einen einzelnen User abrufen und bekommt den HTTP Statuscode 200 OK raus.

```
{
    "_id": "63bebd1237c4f17e49f984e5",
    "age": 24,
    "destination": "München",
    "faveColor": "blue",
    "quote": "Probieren geht über studieren"
    "__v": 0
 }
```
Wenn der User nicht mit angegeben id gefunden wird kommt der HTTP Statuscode 404 Not Found oder wenn etwas mit dem Server ist dann kommt HTTP Statuscode 500 Internal Server.

Mit PATCH an http://127.0.0.1:1000/details/63bebd1237c4f17e49f984e5 kann man alle Daten ändern, wobei "age" und "destination" nicht leer sein dürfen. <br>
Eingabe: 
```
  {
    "age": "25",
    "destination": "Hamburg",
  } 
```

Ausgabe:

```
{
    "_id": "63bebd1237c4f17e49f984e5",
    "age": 25,
    "destination": "Hamburg",
    "faveColor": "blue",
    "quote": "Probieren geht über studieren"
    "__v": 0
 }
```

Mit DELETE an http://127.0.0.1:1000/details/63bebd1237c4f17e49f984e5 kann man alle Details des Users von der Datenbank löschen und bekommt den HTTP Statuscode 200 OK raus und die message "Details are removed". Wenn man die gleichen Details entfernen will, kommt der HTTP Statuscode 404 Not Found und die message "Cannot find details" und wenn etwas mit dem Server ist dann kommt HTTP Statuscode 500 Internal Server.

#Backend Praktikum 2

Mit POST an http://127.0.0.1:1000/users/login bekommt man einen generierten Token und den HTTP Statuscode 201 Created zurück. Vorausgesetzt man hat mit POST an http://127.0.0.1:1000/users einen User bereits angelegt. Dann sollte man sich mit derselben email und password an. <br>
Eingabe:
```
 }
    "email": "ece3636@hm.edu",
    "password": "ndcuwhcuz38d"
}
```
Ausgabe:

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JlYmQxMjM3YzRmMTdlNDlmOTg0ZTUiLCJpYXQiOjE2NzM0NzY1NzZ9.27oPkMMJEIVtkDq6sPud5L6YEPPa5C0_0dD_AF4gKFk"
}
```
Nun sollte die GET Ausgabe wie folgt sein:

```
{
    "_id": "63bebd1237c4f17e49f984e5",
    "name": "Ece Sut",
    "email": "ece3636@hm.edu",
    "password": "ndcuwhcuz38d",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2JlYmQxMjM3YzRmMTdlNDlmOTg0ZTUiLCJpYXQiOjE2NzM0NzY1NzZ9.27oPkMMJEIVtkDq6sPud5L6YEPPa5C0_0dD_AF4gKFk"
  }

```
Mit POST an http://127.0.0.1:1000/users/logout wirst du ausgeloggt und bekommst die Nachricht "Bye bye" und 200 OK zurück. Wenn man sich jetzt mit POST an
http://127.0.0.1:1000/users/login anmeldet, wird ein neuer Token generiert. 

Benutzte Quellen: -> test <br>
https://www.youtube.com/watch?v=fgTGADljAeg <br>
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#designing_the_locallibrary_models <br>
https://mongoosejs.com/docs/api.html#schematype_SchemaType-required <br>
https://www.youtube.com/watch?v=mbsmsi7l3r4 <br>
https://dev.to/kamalhossain/mongodb-without-mongoose-1k69





