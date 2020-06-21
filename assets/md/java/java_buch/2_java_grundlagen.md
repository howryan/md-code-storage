# Stringverarbeitung
## StringBuffer und StringBuilder
* `StringBuffer` ist threadsicher, `StringBuilder` hingegen nicht.
* Stringkonkatenationen mit dem Operator '+' werden bei der Kompilierung durch `StringBuilder`-Methoden ersetzt
* Der Operator '+=' erzeugt viele temporäre Objekte und kann an Performance-kritschen Stellen zu Problemen führen. Deshalb sollte man in diesen Fällen den `StringBuilder` Nutzen mit `append()`.
* Mit der Methode `.toString()` auf einem Objekt lässt sich der String ausgeben

## Ausgaben mit `String.format()` und `PrintStream.printf()`
```java
final Object[] sampleArgs = {"pi", 3.1415, 1337};
final String str = String.format("%S='%2.3f' Zahl='%,d'", sampleArgs); //PI='3,141' Zahl='1.337'
System.out.printf("%S='%2.3f' Zahl='%,d'", "pi", 3.1415, 1337); //PI='3,141' Zahl='1.337'
``` 
* `format(String, Object[])` liefert ein Strinobjekt zurück, das ausgegeben werden kann.
* Bei `printf(String, Object[])` muss kein Stringobjekt erzeugt werden für eine Ausgabe.
* `%s`: Strings, `%S`: Strings in Großbuchstaben, `%d`: Dezimale Zahlen, `%,d` Dezimale Zahlen mit Tausenderpunkten
* `%f` & `%m.nf`: Gleitkommazahlen mit `m` für #Vorkommastellen & `n` für #Nachkommastellen
* `%x` & `%X`: Hexadezimale Zahlen, `%b`: boolsche Werte

## `split()` und reguläre Ausdrücke
```java
final String input = "#-# Wert1 #-# Wert2 #-# Wert3";
final String delimiter = "#-#";
final String[] tokens = input.split(delimiter); // [, Wert1 , Wert2 , Wert3]
```
* Als Parameter lassen sich reguläre Ausdrücke mitgeben, anhand derer sich die Strings trennen lassen.
  * Zahl von 0 bis 9 als Trenner für einen String: `String delimiter = "(0|1|2|3|4|5|6|7|8|9|)"`

# Datumsverarbeitung
## Fallstricke der Datums-APIs
* Konstruktor eines `Date`-Objekts `new Date(int year, int month, int day)`: Bei `year` wird 1900 aufaddiert und von `month` wird -1 durchgeführt
* Die Zeit wird als `long` gespeichert, die vom 1.1.1970 00:00:00 ausgeht. Negative Werte sind entsprechend vor diesem Datum. 
* Mit `Calender` lässt sich ein intuitiverer Konstruktor nutzen:
```java
final Calender calender = new GregorianCalender(1971, 1, 7, 21, 22);
calender.getTime() // Liefert ein Date-Objekt mit 'Sun Feb 07 21:22:00 CET 1971'
```
## `Date`-API
* `new Date()` erzeugt ein Date zu aktuellen Zeitpunkt
* `getMonth()` Wert von 0 bis 11. 
* `getDate()` Werte von 1 bis 31 (Tag)
* `getDay()` Werte von 0 bis 6 (Wochentag 0=Sonntag, 6=Samstag)
* `oneHourAgo.before(now)` oder `oneHourAgo.getTime() < now.getTime()` //beide true

## `Calender`-API
* Vereinfachten Zugang zur Verwaltung von `Date`-Objekten
```java
final Calender cal = GregorianCalender.getInstance();
cal.setTime(new Date());
//Auch möglich mit MONTH, YEAR, HOUR_OF_DAY, MINUTE, ...
cal.get(Calender.DAY_OF_MONTH);
//Ein Tag in die Vergangenheit. Analog für andere
cal.add(Calender.DAY_OF_YEAR, -1)
```

# Varianten innerer Klassen
* Innere Klassen lassen sich innerhalb von Klasse oder Methoden definieren
```java
public class OuterClass {
	public class InnerClass {...}
	public static class StaticInnerClass {...}
}
```
* Innere Klassen stellen in der Regel Funktionalität für die äußere Klasse bereit
* Äußere Klassen erlauben nur `public` und package-private (kein Modifier). Innere Klassen erlauben hingegen alles. Sichtbarkeit der äußeren Klasse ist relevant für die Innere: Ist die äußere Klasse private-package, ist die innere Klasse nach Außen nicht sichtbar, obwohl sie `public` ist. Ansonsten erwartungskonform.
* "**Normale**" innere Klassen haben eine implizite Referenz auf die äußere Klasse, die es erlaubt auch auf `private` Methoden und Attribute zuzugreifen. Die äußere Klasse muss eine Objektinstanz haben, damit die innere Klasse erzeugt werden kann:
 ```java
//Variante 1:
final Outerclass.InnerClass inner = new OuterClass().new InnerClass();
//Variante 2:
final OuterClass outer = new OuterClass();
final OuterClass.InnerClass inner2 = outer.new InnerClass();
```
* "**Statische** innere Klassen" benötigen das umgebende Objekt nicht und haben entsprechend auch keine implizite Referenz sowie keinen Zugriff auf nicht statische Elemente.
 ```java
final OuterClass.StaticInnerClass inner = new OuterClass.StaticInnerClass();
```
* **Methodenlokale innere Klasse** werden in einer Methode definiert und haben neben den Zugriffen auf die Attribute und Methoden der äußeren Klasse auch Zugriff auf die `final`-Parameter und `final`-Variablen der Methode in der sie definiert sind. Wenn diese nicht `final` sind, dann sind sie nur erlaubt, sofern sie sich nicht ändern.
  * ENUMS lassen sich nicht methodenlokal definieren.
* **Anonyme innere Klasse** werden für einmalige Aufgaben angewendet, wobei sie nicht einmal erzeugt werden. Sie basieren auf einem Interface oder erweitern eine Klasse. Die Methode(n) der Basisklasse werden hierbei überschrieben oderdie des Interfaces werden "implementiert". Es können weitere Methoden definiert werden, die können jedoch von Außen nicht aufgerufen werden. 
 ```java
final Runnable newRunnable = new Runnable() {
	@Override
	public void run() { ... }
}; //Auf Semikolon am Ende achten!
```

# Ein- und Ausgabe (I/O)
## Die Klasse `java.io.File`
* Ein File-Objekt repräsentiert ein Verzeichnis oder eine Datei. Der Hauptbestandteil ist entsprechend ein Pfad, der über verschiedene Konstruktoren mitgegeben werden kann.
  * `new File(String pathname); new File(String parentDirName, String filename);`
* Methoden: `isFile(), is Directory(), exists(), createNewFile(), delete(), mkdir(), mkdirs(), list(), listFiles()`
### Interfaces `FileFilter` und `FilenameFilter`
* Interfaces anhand derer sich Dateien filtern lassen, beispielsweise nach Dateiendungen
 ```java
public static class PdfFilenameFilter implements FilenameFilter {
	@Override
	public boolean accept(final File dir, final String fileName){
		return fileName.toLowerCase().endsWith(".pdf");
	}
}
```
* Alternative Schreibweise mit Lambda und mit FileFilter:
```java
final FileFilter xmlFilter = (final File file) -> {
	return file.getName().toLowerCase().endsWith(".pdf");
}
```
## Ein- und Ausgabestreams im Überblick
* `InputStream` und `Reader`: Abstrakte Klasse zum Lesen von Daten und zum Prüfen, ob Daten zum Einlesen vorliegen.
* `OutputStream` und `Writer`: Alle Ausgabestream bieten Methoden zum Schreiben von Daten in einen Stream.
* Durch einen `InputStreamReader` wird ein `InputStream` in einen `Reader` umgewandelt. Dies gilt analog für einen `OutputStreamWriter` der einen `OutputStream` in einen `Writer` umwandelt.


