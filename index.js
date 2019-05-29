class Node {    
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}

class LinkedList {
    constructor(array) {
        this.head = null;
        this.tail = null;
        this.length = 0;

        if(array) {
            for(let i = 0; i < array.length; i++) {
                this.push(array[i]);
            }
        }        
    }

    push(value) {

        let node = new Node(value);

        if (!this.head || this.length === 0) {
            this.head = node;
            this.tail = this.head;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.length++;
        return this;

    }

    pop() {

        if (!this.head || this.length === 0) return undefined;

        let poped = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = poped.prev;
            this.tail.next = null;
            poped.prev = null;
        }

        this.length--;
        
        return this;

    }

    get(index) {

        if (index < 0 || index >= this.length) return null;

        if (Math.round(this.length / 2) >= index) {
            return search_up(this.head);
        } else {
            index = this.length - (index + 1);
            return search_down(this.tail);
        }

        function search_down(node) {
            if (index === 0) { return node; }
            index--;
            return search_down(node.prev);
        }

        function search_up(node) {
            if (index === 0) { return node; }
            index--;
            return search_up(node.next);
        }

    }    

    set(index, value) {

        if (index < 0 || index >= this.length) return null;

        let node = this.get(index);
        node.value = value;

        return node;

    }

    insert(index, value) {

        if (index < 0 || index > this.length) return null;

        if (index === 0) { this.unshift(value); return this; }
        if (index === this.length - 1) { this.push(value); return this; }

        let node = new Node(value);
        let previous = this.get(index - 1);
        let next = this.get(index);

        previous.next = node;
        node.prev = previous;
        node.next = next;

        this.length++;
        
        return this;
    }

    remove(index) {

        if (index < 0 || index > this.length) return null;

        if (index === 0) { return this.shift(value); }
        if (index === this.length - 1) { return this.pop(value); }

        let current = this.get(index);
        let next = current.next;
        let previous = current.prev;
        current.prev = null;
        current.next = null;

        previous.next = next;
        next.prev = previous;

        this.length--;
        
        return this;

    }

    shift() {

        if (!this.head || this.length === 0) return undefined;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
            this.length--;
        } else {
            let temp = this.head;
            this.head = temp.next;
            this.head.prev = null;
            temp.next = null;
            this.length--;
        }

    }

    unshift(value) {

        if (!this.head || this.length === 0) { return this.push(value); }

        let node = new Node(value);
        this.head.prev = node;
        node.next = this.head;
        this.head = node;

        this.length++;

    }

    reverse() {

        let node = this.head;
        this.head = this.tail;
        this.tail = node;

        let next;
        let prev = null;

        for (let i = 0; i < this.length; i++) {
            next = node.next;
            node.prev = next;
            node.next = prev;
            prev = node;
            node = next;
        }

        return this;

    }

    toArray() {        
        let values = [];
       
        if (this.head) {
            helper(this.head);
        }

        function helper(node) {
            values.push(node.value);
            if (node.next === null) { return node; }
            return helper(node.next);
        }

        return values;
    }
    
    forEach(func) {        
        if (this.head) {
            helper(this.head);
        }

        function helper(node) {            
            func.apply(this, [node.value]);
            if (node.next === null) { return node; }                        
            return helper(node.next);
        }
    }

    map(func) {    
        let list = new LinkedList();

        if (this.head) {
            helper(this.head);            
            return list;
        }

        function helper(node) {         
            if (func.apply(this, [node.value])) {                                          
                list.push(func.apply(this, [node.value]));
            }
            if (node.next === null) { return node; }                        
            return helper(node.next);
        }
    }

    filter(func) {
        let list = new LinkedList();

        if (this.head) {
            helper(this.head);            
            return list;
        }

        function helper(node) {                                                
            if (func.apply(this, [node.value])) {
                list.push(node.value);
            }            
            if (node.next === null) { return node; }                        
            return helper(node.next);
        }
    }

    some(func) {
        if (this.head) {
            return helper(this.head);            
        }

        function helper(node) {
            if(func.apply(this, [node.value])) { return true; }                                                            
            if (node.next === null) { return false; }                        
            return helper(node.next);
        }
    }

    distinct(func) {
        let list = new LinkedList();
        let distincted = [];

        if (this.head) {
            helper(this.head);     
            return list;       
        }

        function helper(node) {            
            if(!distincted.includes(func.apply(this, [node.value])) && func.apply(this, [node.value])) {
                distincted.push(func.apply(this, [node.value]));
                list.push(node.value);
            }
            
            if (node.next === null) { return node; }                        
            helper(node.next);
        }
    }

    findIndex(func) {
        let index = -1;

        if (this.head) {
            return helper(this.head);            
        }

        function helper(node) {                         
            index++;
            if (func.apply(this, [node.value])) { return index; }                                         
            if (node.next === null) { return undefined; }                        
            return helper(node.next);
        }
    }    

    selectMany(func) {        
        let many = [];

        if (this.head) {
            helper(this.head);            
            return new LinkedList(many);
        }

        function helper(node) {                                                
            if (func.apply(this, [node.value])) {                
                many = [...many, ...func.apply(this, [node.value])];
            }            
            if (node.next === null) { return node; }                        
            return helper(node.next);
        }
    }

}

module.exports = {
    Node,
    LinkedList
};