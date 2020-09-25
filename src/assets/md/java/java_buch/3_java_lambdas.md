# Lambdas
## Syntax
* Beispiele:
```java
(int x, int y) ->  { return x + y};
(long x) -> { return x * 2 };
() -> { String msg = "asdf"; System.out.println(msg); };
```
## Functional Interfaces
* Lambda Funktionen sind Functional Interfaces die nicht vom Basistyp `Object` abgebildet werden!
* Beispiele: `Runnable, Callable<V>, Comperator<T>, FileFilter, FilenameFilter, ActionListener, EventHandler, etc.`
```java
@FunctionalInterface
public interface Runnable { public abstract void run(); }
```
* Merkmal: Jedes Interface beinhaltet genau eine abstrakte Methode

### Implementierung von Functional Interfaces
```java
Runnable exampleRunnable = new Runnable(){ 
    public void run(System.out.println("Example implementation")); 
}
```
vs.
```java 
Runnable exampleRunnable = () -> System.out.println("Example implementation");
```
## Exceptions in Lambdas
* Eine innerhalb des Lambdas geworfene Exception kann nicht durch einen umschließenden Try-Catch-Block abgefangen werden. Ein Lambda wird nicht zwingend dort ausgeführt, wo es definiert ist, da es sich hier um eine anonyme Methode handelt, die weiter durchgereicht werden kann.
    * Der Try-Catch-Block muss innerhalb des Lamdbas definiert werden.

# Syntaxerweiterungen in Interfaces
## Defaultmethoden
* Bis zum JDK 8 war es nicht möglich Interfaces zu erweitern, ohne dass alle Klassen die dieses Interface implementieren auch zu erweitern.
* Mittels Defaultmethoden ist dies möglich; Dazu gibt es das Schlüsselwort `default`
* Bsp.: 
```java
public interface Iterable<T> {
    default void forEach(Consumer<? super T> action) { 
        for(T t : this) { 
            action.accept(t);
        } 
    }
}
``` 
### Statische Methoden in Interfaces
* Im JDK 8 existieren viele Beispiele, in denen man Hilfsmethoden anstelle von zugehörigen Utility-Klassen findet
* Bsp.: Im Functional Interface `Comperator<T>` : `public static <T extends Comparable<? super T>> Comparator<T> naturalOrder() { return (Comparator<T>) Comparators.NaturalOrderComparator.INSTANCE; }`

# Methodenreferenzen
* Syntax: `Klasse::Methoden` Bsp.: `System.out::println, Person::getName, ArrayList::new, Person[]::new`
* Ziel: Verbesserung der Lesbarkeit

# Wichtige Functional Interfaces für Collections
## Das Interface `Predicate<T>`
* Angabe von booleschen Bedingungen, die durch den Aufruf von `boolean test(T)` ausgewertet werden.
```java
final Predicate<String> isNull = strg -> strg == null; isNull(""); // false
final Predicate<Person> isAdult = person -> person.getAge() >= 18; isAdult(new Person("testName", 17)); // false
```
### Komplexere Bedingungen mit Prädikaten formulieren
```java
final Predicate<Person> isYoung = isAdult().negate(); // negate(), or(), and() sind Defaultmethoden
final Predicate<Person> boys = isMale.and(isYoung);
final Predicate<Person> isYoungOrBoy = boys.or(IsYoung);
persons.removeIf(isYoungOrBoy);
```

## Das Interface `UnaryOperator<T>`
* Ein `UnaryOperator` nimmt ein Argument und returned ein Ergebnis, das denselben Typen wie das Argument hat.
 ```java
@FunctionalInterface
public interface UnaryOperator<T> extends Function<T, T> { }
 ```
* Beispiel:
 ```java
final UnaryOperator<String> markTextWithM = str -> str.startsWith("M") ? str.toUpperCase() : str;
System.out.println( markTextWithM.apply("Michael") ); //MICHAEL
 ```
