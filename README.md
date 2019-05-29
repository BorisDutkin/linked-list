# LinkedList :smiley:

Linked lists implementation:

You can create a linked list from an existing array:

```
let list = new LinkedList([
{ id: 1, name: 'Superman'}, { id: 2, name: 'Batman' }, { id: 3, name: 'Thor' }
]);
```

or just create a new one:

`let list = new LinkedList();`

### Methods List:

1. push `list.push(value)`
2. pop `list.pop()`
3. get `list.get(3)`
4. set `list.set(3, value)`
5. insert `list.insert(3, value)`
6. remove `list.remove(3)`
7. shift `list.shift()`
8. unshift `list.unshift(value)`
9. reverse `list.reverse()`
10. toArray `list.toArray()`
11. forEach `list.forEach(item => item)`
12. map `list.map(item => item.name)`
13. filter `list.filter(item => item.id !== 3)`
14. some `list.some(item => item.id === 3)`
15. distinct `list.distinct(item => item.id)`
16. findIndex `list.findIndex(item => item.id === 3)`
16. selectMany `list.selectMany(item => item.products)`