// @flow strict

import panic from "../"
import test from "blue-tape"

test("test baisc", async test => {
  test.isEqual(typeof panic, "function")
})

test("panic without arguments", async test => {
  try {
    panic()
    test.fail("Shoulh have thrown exception")
  } catch (error) {
    test.ok(error instanceof Error, "throws Error instance by default")
    test.ok(error.message.includes("invariant"))
  }
})

test("panic with string argument", async test => {
  try {
    panic("Boom!")
    test.fail("Shoulh have thrown exception")
  } catch (error) {
    test.ok(
      error instanceof Error,
      "throws Error instance if invoked with string"
    )
    test.equal(error.message, "Boom!")
  }
})

test("panic with null argument", async test => {
  try {
    panic(null)
    test.fail("Shoulh have thrown exception")
  } catch (error) {
    test.equal(error, null, "throws null if passed")
  }
})

test("panic with null argument", async test => {
  const point = { x: 1, y: 2 }
  try {
    panic(point)
    test.fail("Shoulh have thrown exception")
  } catch (error) {
    test.equal(error, point, "throws whatever was passed to panic")
  }
})

test("example from readme", async test => {
  type Message = "increment" | "decrement"

  const update = (state: number, message: Message): number => {
    switch (message) {
      case "increment":
        return state + 1
      case "decrement":
        return state - 1
      default:
        return panic(`Unabel to handle invalid message: ${message}`)
    }
  }

  try {
    // $ExpectError
    update(5, "sqrt")
  } catch (error) {
    test.ok(error instanceof Error)
    test.equal(error.message, `Unabel to handle invalid message: sqrt`)
  }
})
