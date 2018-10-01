# Design Patterns
A design pattern names, abstracts, and identifies the key aspeccts of a common design structure that make it useful for creating a reusable object-oriented design. The design pattern identifies the participating classes and their instances, their roles and colllaborations, and the distribution of responsibilities.

Each design pattern focuses on a particular object-oriented design problem or issue. It describes when it applies, whehter or not ican be applied in view of other design constraints, and the consequences and trade-offs of its use. Since we must eventually implement our designs, a design pattern also provides sample ... code to illustrate an implmentation.

Although design patterns describe object-oriented designs, they are based on practical solutions that have been implemented in mainstream object-oriented programming languages.

## Categories of Design Patterns

1. Creational Design Patterns

    Focuses on hanlding object creation mechanisms where objects are created in a manner suitable for the situation you are working in. eg: _Constructor, Factory, Abstract, Prototype, Singleton, Builder_

3. Structural Design Patterns

    related with object composition and typically identify simple ways to realize relationships between different objects. They help ensure that when one part of a system changes, the entire structure of the system doesn't need to the same. They also assist on recasting parts of the system which don't fit a particular purpose into those that do. eg: _Decorator, Facade, Flyweight, Adapter, Proxy_

5. Behavioral Design Patterns

    Focuses on improving or streamlining the communication between disparate objects in a system. eg: _Iterator, Mediator, Observer, Visitor_

|            | Creational       | Structural | Behavioral              |
| ---------- | ---------------- | ---------- | ----------------------- |
| **Class**  | Factory Method   | Adapter    | Interpreter             |
|            |                  |            | Template Method         |
| **Object** | Abstract Factory | Adapter    | Chain of Responsibility |
|            | Builder          | Bridge     | Command                 |
|            | Prototype        | Composite  | Iterator                |
|            | Singleton        | Decorator  | Mediator                |
|            |                  | Facade     | Memento                 |
|            |                  | Flyweight  | Observer                |
|            |                  | Proxy      | State                   |
|            |                  |            | Strategy                |
|            |                  |            | Visitor                 |

