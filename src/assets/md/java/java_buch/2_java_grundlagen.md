# Stringverarbeitung
## StringBuffer und StringBuilder
* `StringBuffer` ist threadsicher, `StringBuilder` hingegen nicht.
* Stringkonkatenationen mit dem Operator '+' werden bei der Kompilierung durch `StringBuilder`-Methoden ersetzt
* Der Operator '+=' erzeugt viele temporäre Objekte und kann an Performance-kritschen Stellen zu Problemen führen. Deshalb sollte man in diesen Fällen den `StringBuilder` Nutzen mit `append()`.
* Mit der Methode `.toString()` auf einem Objekt lässt sich diese als String ausgeben

## Ausgaben mit `String.format()` und `PrintStream.printf()`
```java
final Object[] sampleArgs = {"pi", 3.1415, 1337};
final String str = String.format("%S='%2.3f' Zahl='%,d'", sampleArgs); //PI='3,141' Zahl='1.337'
System.out.printf("%S='%2.3f' Zahl='%,d'", "pi", 3.1415, 1337); //PI='3,141' Zahl='1.337'
``` 
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
```java
public class OuterClass {
    String s1 = "Variable OuterClass.s1 called";
    public void print() {
        String s2 = "Variable s2 in OuterClass.print() called";
        class InnerClass { //Keine Sichtbarkeitsmodifier erlaubt!
            String s3 = "Variable InnerClass.s3 called";
            InnerClass() {
                System.out.println(s1); // Variable OuterClass.s1 called
                System.out.println(s2); // Variable s2 in OuterClass.print() called
                System.out.println(s3); // Variable InnerClass.s3 called
            }
        }
        new InnerClass(); //Erzeugung nur innerhalb der Methode möglich
    }

    public static void main(String[] args) {
        new OuterClass().print();
    }
}
```
* **Anonyme innere Klasse** werden für einmalige Aufgaben angewendet, wobei sie nicht einmal erzeugt werden. Sie basieren auf einem Interface oder erweitern eine Klasse. Die Methode(n) der Basisklasse werden hierbei überschrieben oder die des Interfaces werden "implementiert". Es können weitere Methoden definiert werden, die können jedoch von Außen nicht aufgerufen werden. 
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
* `InputStream` und `OutputStream` arbeiten byteorientiert, wohingegen `Reader` und `Writer` zeichenbasiert (mittels `char`s) sind.
* **Konvertierung:** Eine Konvertierung kann mittels eines `InputStreamReader`s erfolgen, der einen `InputStream` in einen `Reader` umwandelt. Analag gilt dies für einen `OutputStreamWriter`, der einen `Outputstream` in einen `Writer` umwandelt.
## Zeichencodierungen bei der Ein- und Ausgabe
* Um ein `char` in ein Byte umzuwandeln, gibt es Charsets bzw. Zeichenkodierungen, die Zeichen auf Zahlenwerte abbilden. 
  * Bsp.: Ä mittels UTF-8 wird zu: -61, -124; Ä mittels ISO-8859-1 wird zu -60
* Zugriff auf ein Charset ist nur mittels des Namen möglich: `Charset.forName("UTF-8")`

## Dateiverarbeitung in JDK 7
### Das Interface `Path`
* Das Interface `Path` wird ein Pfad oder eine Datei repräsentiert, die verarbeitet werden soll
  * Zugriff mittels `Paths.get(String)` oder `FileSystem.getPath(String, String...)`
    * Erzeugen eines `FileSystem`: `final FileSystem local = FileSystems.getDefault();`
  * Die Hilfsklasse `Files` ist für die eigentlichen Aktionen zuständig: `copy(Path, Path, CopyOption...)` und `move(Path, Path, CopyOption...)`
* Das Interface `Path` hält viele nützliche Funktionen bereit: `subpath(int, int)` oder `relativize(Path)`
* Ein `File` kann mittels `toPath()` umgewandelt werden

## Das Interface `DirectoryStream`
* Das Interface `DirectoryStream` biete eine effiziente Möglichkeit um über eine große Anzahl an Verzeichnissen zu iterieren
```Java
try (DirectoryStream<Path> dirStream = Files.newDirectoryStream( new File(".").toPath()) ) {
    dirStream.forEach(entry -> System.out.println(entry));
}
```

## Erweiterungen im NIO und der Klasse `Files` in JDK 8
* `java.nio.file.Files` wurde um verschiedene Hilfsmethoden erweitert
  * `lines(Path)`: Datei wird zeilenweise als Stream<String> bereitgestellt
  * `readAllLines(Path)`: Liest die Datei zeilenweise ein und gibt die Zeilen als List<String> zurück
  * `list(Path)`: Liefert den Inhalt eines Verzeichnisses als `Stream<Path>` zurück
  * `write(Path, Iterable<? extends CharSequence>, OpenOption...)`: Schreibt Textzeilen in die Path-Datei. `OpenOption`: `APPEND` oder `WRITE` 

# Fehlerbehandlung
## Checked und Unchecked Exceptions
* **Checked Exceptions** geben eine durch den Aufrufer zu erwartende Fehlersituation an und müssen daher in der Methodensignatur mit dem Schlüsselwort `throws` angegeben werden
  * Bsp.: `ParseException` oder `IOException`
* **Uncheck Exceptions** stehen für schwerwiegende Probleme und unerwartete Situationen, auf die nicht sinnvoll reagiert werden kann. Somit sind diese auch nicht Bestandteil einer Methodensignatur (obwohl sie dort angegeben werden können)
  * `RuntimeException`, `NullPointerException`, `IndexOutOfBoundsException`, `IllegalArgumentException`, `IllegalStateException`

##Nutzung von `finally`
* Der `finally`-Block nach einem `try-catch` wird immer ausgeführt. Dies ist unabhängig davon, ob
  * der `try`-Block normal beendet,
  * eine Exception im `try`-Block geworfen oder
  * ein `return` im `try`- und `catch`-Block ausgeführt wird
  
## Besonderheiten beim Exception Handling mit JDK7

### Multi Catch (JDK 7)
* Wenn mehrere Exception-Typen gleich behandelt werden sollen, ist es möglich diese in einem `catch`-Block zusammenzufassen.
```java
try {
    sampleMethode();
}
catch(final RemoteException | FileNotFoundException ex) {
    reportException(ex);
}
```
* Dies ist nur möglich, wenn die Exception unterschiedliche Basistypen besitzen.
  * `catch(final FileNotFoundException | IOException ex)` ist somit nicht erlaubt und führt zu einem Compile-Error

### Automatic Resource Management (ARM)
* Durch die Schreibweise mit Klammern bei einem `try`-Block, ist es nicht mehr notwendig, selbst die Freigabe von Ressource zu verwalten
* Im nachfolgenden Beispiel werden beide Streams automatisch geschlossen, durch den impliziten Aufruf von `close()`
```java
try(FileInputStream inS=new FileInputStream(new File("E:\\Test\\sample.txt"));
    FileOutputStream outS=new FileOutputStream(new File("E:\\Test\\duplicate.txt")))
    {
        byte[] buffer=new byte[1024];
        int length;
        while((length=inS.read(buffer))>0){
            outS.write(buffer,0,length);
        }
    }catch(IOException ioe){
        ioe.printStackTrace();
    }
```
* Voraussetzung: Die definierten müssen das Interface `java.lang.AutoCloseable` erfüllen.

## Assertions
* Absicherung von Zuständen mittels Schlüsselwort `assert`. Falls `false` evaluiert wird, wird ein `AssertionError` (Untertyp von `Throwable`) geworfen.
  * Bsp.: `assert exampleVariable != null;` bzw. mit Kontextinformationen: `assert exampleVariable != null : "The variable exampleVariable is null!";`
  * `AssertionError`s können zwar durch einen `try-catch`-Block abgefangen werden, dies ist jedoch selten sinnvoll, da hiermit Fehler aufgedeckt werden sollen.
  * Die Verarbeitung von Assertions ist für die JVM standardmäßig deaktiviert und muss explizit aktiviert werden, mittels -ea oder -da.
* Assertions lassen sich zur Laufzeit an- und ausschalten und sind deswegen eher als ein löchriges Sicherheitsnetz zu betrachten, was als Argument dafür aufgefasst werden kann eher Exceptions zu nutzen.
* Java Language Specification: Assertions für Situationen die "niemals" auftreten können/sollen.
* Assertions können als semantischer Kommentar genutzt werden: `assert form != null : "Form must not be null"` .
* Assertions sollten niemals Seiteneffekte verursachen bzw. Änderungen am Objektzustand vornehmen, wie bspw. die Zuweisung eines Wertes zu einer bestehenden Variable.
