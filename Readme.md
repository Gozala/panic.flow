# panic.flow

[![travis][travis.icon]][travis.url]
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]

Utility for enforcing type encoded invariants at runtime for untyped call site.
More simply a way to throw an exception from code paths that aren't possible
accordnig to a type checker but still possible by incorrect call from untyped JS.

## Usage

```js
import panic from "panic.flow"

type Message = "increment" | "decrement"

export const update = (state: number, message: Message): number => {
  switch (message) {
    case "increment":
      return state + 1
    case "decrement":
      return state - 1
    default:
      return panic(`Unabel to handle invalid message: ${message}`)
  }
}
```

Note that above code type checks fine, but following call site on the other
hand does not:

```js
update(5, "sqrt")
//        ^ Cannot call `update` with `"sqrt"` bound to `message` because
// string [1] is incompatible with enum [2].
// References:
// update(5, "sqrt")
//           ^ [1]
// export const update = (state:number, message:Message):number => {
//                                              ^ [2]
```

But call site may not use type checker, in that case `panic` could be utilized
to produce runtime error.

If `panic` is invoked with a string argument `Error` instance with a given
message is thrown:

```js
try {
  panic("Boom!")
} catch (error) {
  console.log(error) // Error("Boom!")
}
```

If `panic` is invoked without any argument `Error` with default message is
thrown:

```js
try {
  panic()
} catch (error) {
  console.log(error)
  // Error("Unreachable code (according to type-checker) was exectude, likely due to invalid usage.")
}
```

If `panic` is invoked with any other argument it's will be thrown as is:

```js
try {
  panic(NaN)
} catch (error) {
  console.log(error) // NaN
}
```

## Install

    npm install panic.flow

[travis.icon]: https://travis-ci.org/Gozala/panic.flow.svg?branch=master
[travis.url]: https://travis-ci.org/Gozala/panic.flow
[version.icon]: https://img.shields.io/npm/v/panic.flow.svg
[downloads.icon]: https://img.shields.io/npm/dm/panic.flow.svg
[package.url]: https://npmjs.org/package/panic.flow
[downloads.image]: https://img.shields.io/npm/dm/panic.flow.svg
[downloads.url]: https://npmjs.org/package/panic.flow
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
