# +archi

> Easy math with decimals for Javascript

## Install

Using `npm`

```
npm install archi
```

## Native simple Javascript sum

```js
var num = 0.1 + 0.2; // 0.30000000000000004;
0.1 + 0.2; // 0.30000000000000004;
```

## Solving the issue with archi

```
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

## License

MIT