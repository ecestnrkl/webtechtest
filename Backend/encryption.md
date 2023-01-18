Asymmetrische Verschlüsselung, auch bekannt als Public-Key-Verschlüsselung, nutzt zwei unterschiedliche Schlüssel, einen öffentlichen und einen privaten, um Daten zu verschlüsseln und entschlüsseln. Der öffentliche Schlüssel wird verwendet, um Daten zu verschlüsseln, die nur mit dem privaten Schlüssel entschlüsselt werden können. Diese Methode ermöglicht es, dass jeder, der den öffentlichen Schlüssel besitzt, verschlüsselte Daten an den Besitzer des privaten Schlüssels senden kann, ohne dass dieser seinen privaten Schlüssel preisgeben muss.

Ein Beispiel für einen Asymmetrischen Verschlüsselungs Algorithmus ist RSA (Rivest-Shamir-Adleman). RSA ist ein klassischer Algorithmus, der auf der Mathematik der großen Primzahlen basiert. Es wird häufig in der Verschlüsselung von E-Mails, digitalen Signaturen und sicheren Tunnelprotokollen verwendet. Ein weiteres Beispiel ist ECC (Elliptic Curve Cryptography), welches basierend auf der Mathematik von elliptischen Kurven funktioniert. ECC hat den Vorteil, dass es in vergleich zu RSA effizienter ist und für gleiche Sicherheit einen kleineren Schlüssel erfordert. ECC wird häufig in Drahtlos- und Mobilanwendungen verwendet, sowie in der Kryptographie für IoT-Geräte.

Symmetrische Verschlüsselung verwendet hingegen nur einen Schlüssel, sowohl zum Verschlüsseln als auch zum Entschlüsseln. Dieser Schlüssel muss sowohl vom Sender als auch vom Empfänger bekannt sein, damit die Daten erfolgreich verschlüsselt und entschlüsselt werden können.

Ein Beispiel für einen Symmetrischen Verschlüsselungs Algorithmus ist AES (Advanced Encryption Standard). AES ist ein von der US-Regierung standardisierter Algorithmus und wird oft in der Verschlüsselung von Dateien, Festplatten und Netzwerken verwendet. Ein weiteres Beispiel ist Blowfish, welcher für seine Geschwindigkeit und Sicherheit bekannt ist und in der Verschlüsselung von Datenbanken, E-Mails und sicheren Tunnelprotokollen verwendet wird.

Vorteile von Asymmetrischer Verschlüsselung sind die höhere Sicherheit durch den Einsatz von zwei Schlüsseln und die Möglichkeit, sichere Verbindungen aufzubauen, ohne dass der private Schlüssel preisgegeben werden muss. 
Die Sicherheit basiert auf sehr schwer lösbaren mathematischen Problemen, dadurch kann man es nicht durch einfache Angriffe knacken.
Ein Nachteil ist die langsamere Verarbeitungszeit aufgrund der komplexeren Verfahren, welche rechenintensiver sind als bei der Symmetrischen Verschlüsselung. Ein weiterer Nachteil ist, dass bei mehr Empfängern die Nachricht mit dem öffentlichen Schlüssel eines jeden Empfängers verschlüsselt werden muss.

Die Vorteile von Symmetrischer Verschlüsselung sind die Geschwindigkeit und die Effizienz bei der Verarbeitung großer Datenmengen. Außerdem hat man die Möglichkeit die Sicherheit durch die Schlüssellänge beeinflussen.
Der Nachteil ist zum einen das Schlüsselaustauschproblem. Den Schlüssel muss man zwischen den Kommunikationspartnern über einen abhörsicheren Weg austauschen, der jedoch ohne Verschlüsselung nicht existiert. Deshalb ist das meist nur über ein persönliches Treffen an einem geheimen Ort möglich. Zum anderen liegt der Nachteil darin, dass man mit jedem Kommunikationspartner einen eigenen Schlüssel haben muss, weswegen man hierfür bei einer großen Anzahl den Überblick verlieren kann.




