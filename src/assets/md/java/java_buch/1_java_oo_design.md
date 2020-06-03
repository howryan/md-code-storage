# OO-Grundlagen
* **Objekzustand**: Wertebelegung aller Attribute eines Objekts.
* **Dekleration**: Typ und Name einer Variable. Bei Methoden die Signatur.
* **Kapselung (Information Hiding)**: `get()`- und `set()`-Methoden (_Accessors_ und _Mutators_) anstelle von direktem Zugriff auf Attribute. 
* **Objektverhalten**: Komplexe interne Vorgänge werden von `private`-Methoden (Hilfsmethoden) umgesetzt. Methoden mit einem hohem Abstraktionsgrad, die die Schnittstelle nach außen bilden, werden als **Business-Methoden** bezeichnet.
* **Kohäsion**: Maß das beschreibt, inwieweit eine Klasse eine spezielle Funktionalität erfüllt. Hohe Kohäsion ⇒ Genau eine Aufgabe. Niedrige Kohäsion ⇒ viele unterschiedliche Funktionalität in einer Klasse 
  * **Orthogonalität**: Freie Kombinierbarkeit unabhängiger Konzepte bzw. hier von Methoden und Klassen wird erreicht, sodass diese nur eine Aufgabe erfüllen ⇒ Auslagern von Code in Methoden anstatt ihn zu kopieren.
* **Assoziationen**:
  * Aggregation: Zwei Objekte sind verbunden, können aber unabhängig voneinander bestehen
  * Komposition: Ein Teilobjekt kann nicht ohne das Ganze bestehen.
* **Kopplung**: Der Grad von Abhängigkeiten die Klassen miteinander haben, bspw. durch Methodenaufrufe. Ziel: Lose Kopplung durch Business-Methoden, hohe Kohäsion und Kapselung.
* **Overriding**: Redefinition von geerbten Methoden.
* **Overloading**: Definition von Methoden mit gleichen Namen, aber unterschiedlichen Parametern
* **Sub-Classing**: Spezialisierung durch Vererbung von Klassen
* **Sub-Typing**: Spezialisierung durch Vererbung von Interfaces
* **Polymorphie**: Verschiedene Objekte können beim Aufruf von gleichen Methoden unterschiedliches Verhalten implementieren in Abhängigkeit zu ihrem Typ zur Laufzeit.

# Fortgeschrittenere OO-Techniken
## Read-only-Interface
* Interface, das ausschließlich Lesezugriff auf Attribute anbietet und so verhindert, dass der Objektzustand verändert werden kann. Ausnahme bei Referenzvariablen, die Objekte zurückgeben, deren Werte dann verändert werden können.
* Collections können als `Collections.unmodifiableList(Collection c)` zurückgeliefert werden.
  * **Flache Kopie (Shallow Copy)**: Mit `ArrayList<Typ>(Collection c)` lässt sich eine neue Liste, aber den ursprünglichen Referenzen erzeugen. Primitive Typen werden kopiert.
  * **Tiefe Kopie (Deep Copy)**: Jedes Objekt muss einzeln rekursiv oder iterativ kopiert werden.

## Immutable-Klasse
* Der Objektzustand von soll nach der Objekterzeugung erhalten bleiben. Erreicht wird dies über Variablen die als `final` deklariert werden.
* Trick für Veränderbarikeit: Methode die ein Objekt zurückliefert mit modifizierten Attributen die über Parameter mitgegeben werden können:
  * `public ImmutableValue(final int x) { return new ImmutableValue(this.x + x) }`

## Marker-Interface
* Ein leeres Interface ohne Methoden und Konstanten, dass somit eine Klasse "markiert" und ausdrückt, dass eine bestimmte Eigenschaft erfüllt werden soll. 
  * Bsp.: Das Interface `Serializable` markiert Klasse, die sich von der integrierten Serialisierungsautomatik der JVM verarbeiten lassen

## Konstantensammlungen und Aufzählungen
* Zentrale Definition und Gruppierung von konstanten Werten, bspw. in einer "Constants"-Klasse oder mittels Enums.
* `EnumSet<E>`: Verwaltung von Enum-Mengen als Collection bzw. Set mit speziellen Methoden für Enums. Mit `allOf(ExampleEnum.class)` können alle verfügbaren Enums in die Menge hinzugefügt werden.
* **Varargs**: Notation für eine Methode, die beliebig viele Parameter erlaubt durch folgende Notation: `public void method(String... s){ // }`
* Die Klasse **`Class<E>`** erhält man via `.class`-Aufruf. Sie erlaubt den Zugriff auf Metainformationen der Klasse E bspw. auf Sichtbarkeiten.

## Value Object (Data Transfer Object - DTO)
* Zusammenfassung von Attributen oder Parametern in einem Objekt bzw. Datencontainer, um lange Methodensignaturen zu vermeiden und die Wartbarkeit zu erhöhen.

# Prinzipien guten OO-Designs

## Geheimnisprinzip nach Parnas
* **Information Hiding**: Klassen und Packages die von anderen Komponenten genutzt werden, sollten alle Implementierungsdetails verbergen. Realisiert wird dies, indem nur Business-Methoden bereitgestellt werden.
## Law of Demeter
* Reduktion der Kopplung auf ein verständliches und wartbares Maß. Deswegen Nutze nur...
1. Methoden der eigenen Klasse: `this.isAdult = isOlderThen(18)`
2. Methoden von Objekten, die als Parameter übergeben werden: `boolean sameAge(Person other) { return getAge() == other.getAge() }`
3. Methoden von Objekten, die das eigene Objekt selbst erzeugt hat
4. Methoden assoziierter Klasse
Vermeide Chaining: `ownObject.getObjA().getObjB().methodB()`
## SOLID-Prinzipien
* **S - Single Responsibility Principle**: Jede Klasse soll möglichst genau eine klar definierte Aufgabe erfüllen. Führt zu hoher Kohäsion und Orthogonalität.
* **O - Open Closed Principle**: Leichte Erweiterbarkeit, Kapselung und Trennung von Zuständigkeiten. Klassen sollten sich nur noch ändern, wenn komplett neue Anforderungen oder Funktionalitäten integriert oder Fehler korrigiert werden müssen.
* **L - Liskov Substitution Principle**: Ersetzbarkeit und Einhaltung der "is-a"-Beziehung. Die Instanz einer Subklasse kann überall dort genutzt werden, wo die Instanz der Basisklasse zum Einsatz kommt. Sprich: Der Benutzer erhält erwartungskonformes Verhalten. Ein "Kreis" ist eine "Grafisches Element" und die Methode `zeichne()` verhält sich nach der Vererbung entsprechend.
* **I - Interface Segregation Principle**: Schnittstellen sollten auf eine Aufgabe oder einen Klienten zugeschnitten sein, d.h. nicht zu viele und semantische nicht zusammenhängende Methoden anbieten.
* **D - Dependency Inversion Principle**: Verwende möglichst Interfaces oder abstrakte Klassen, um konkrete Klassen voneinander zu entkoppeln. Wenn Klassen nur über Interfaces kommunizieren, so kann man bei Bedarf die Implementierung auswechseln. Das führt zu einer höheren Wartbarkeit und einer loseren Kopplung. 

# Formen der Varianz
## Grundlagen der Varianz
* **Invarianz**: Die Typen eines Methodenparameters von Sub- und Base-Klasse sind gleich.
* **Kovarianz**: Die Rückggabetypen folgen der Vererbungshierarchie in die gleiche Richtung. 
  * `class BaseClass { Base method() } `
  * `class SubClass extends BaseClass { Sub method() }`
* **Kontravarianz**: Die Typen der Methodenparameter sind entgegengesetzt zur Vererbungshierarchie, sodass kein Überschreibung stattfindet!
  * `class BaseClass { void method(Sub s) } `
  * `class SubClass extends BaseClass { void method(Base b) }`

# Generische Typen (Generics)
## Grundlagen
* **Diamond Operator <>**: Bei der Objekt-Initialisierung ist es nicht mehr notwendig, den Typen explizit mitzugeben
  * Bsp:. `final Map<String, Set<String> > newMap = new HashMap<>`
* Typeinschränkungen für Klassen durch `extends` und '&'
  * Bsp.: `public class GenericClass<T extends BaseType & Interface1 & Interface2>`
* Typeinschränkungen für (statische) Methoden
  * `public static void doSth(final List<? extends BaseFigure> figures)`
  * `public static <T extends BaseFigure> void doSth(final List<T> figures)` (Alternativ schreibweise)
* Generische statische Variablen sind nicht möglich da ein generischer Typparameter immer zu einer Instanz gehört. 
* Erzeugen von generischen Arrays ist nicht möglich `// final T[] typedArray = new T[]`
