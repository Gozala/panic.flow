// @flow strict

const defaultReason =
  "Typesystem established invariant was broken at runtime, likely due to incorrect call from untyped JS."

export default <error>(reason: string | error = defaultReason): empty => {
  throw typeof reason === "string" ? Error(reason) : reason
}
