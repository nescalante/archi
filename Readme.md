# +archi

> Easy math with decimals for Javascript

![Archimedes](http://i.imgur.com/o22kQDq.jpg)

## Install

Using `npm`

```
npm install archi
```

## Native simple Javascript sum

```js
0.1 + 0.2; // 0.30000000000000004;
0.3 - 0.1; // 0.19999999999999998;
```

## Solving the issue with archi

```js
var archi = require('archi');
var num = +archi
  .calc(0.1)
  .plus(0.2)
  .plus(0.1)
  .minus(0.1); // 0.3
num === 0.3; // true
```

## But, why the `+` ahead?

Do this to do a fast conversion from the `ArchiNumber` instance to the native `Number` type.

## Methods

- `.plus(num)`: current num + other num
- `.minus(num)`: current num - other num
- `.mod(num)`: current num % other num

## License

MIT
