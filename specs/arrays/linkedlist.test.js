/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _find(index) {
    let i = 0;
    let current = this.head;
    if ( i >= this.length) return null
    while(i < index) {
      current = current.next;
      i++;
    }
    return current;
  }

  /**
   * Cases:
   * 1. The list is empty
   * 2. The list in not empty
   * /
   /** this.tail = last node in the lists
   * this.tail.next = lastNode.next
   */
  push(val) {
    // the list is empty
    if (!this.head) {
      this.head = new Node(val);
      this.tail = this.head;
    } else {
      this.tail.next = new Node(val);
      this.tail = this.tail.next;
    }

    this.length++;
  }

  /**
   * 
   * Cases:
   * 1. The list is empty
   * 2. The list has only one element
   * 3. The list has more than one element
   */
  /*pop() {
    if (!this.head) {
      return null;
    } 
    if (this.length === 1) {
      let val = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return val.value;
    }
    let prevNode = this._find(this.length - 2);
    let elem = prevNode.next.value;
    prevNode.next = null;
    this.tail = prevNode;
    this.length--;
    return elem;
  }*/

  pop() {
   return this.delete(this.length - 1);
  }

  get(index) {
    if (!this.head) {
      return null;
    } 
    let nodeToBuFound = this._find(index);
    return nodeToBuFound.value;
  }

  /**
   * Cases:
   * 1. This list is empty
   * 2. The list has one elements
   * 3. The list has more than 1 element, but index is out of bounds
   * 4. The index to be deleted is the last index
   * 
   */
  delete(index) {
     if (!this.head || index >= this.length) return null;
     // There's only one element in the list
     let val = null;

     if (index === 0) {
        val = this.head.value;
        this.head = this.head.next;
        if (this.length === 1) {
           this.tail = null;
        } 
        this.length--;
        return val;
     }

     let prevNode = this._find(index-1);
     val = prevNode.next.value;
     prevNode.next = prevNode.next.next;
     
     if (!prevNode.next) {
       this.tail = prevNode;
     }
     this.length--;

     return val;

  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// unit tests
// do not modify the below code
describe.skip("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
