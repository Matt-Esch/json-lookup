# json-lookup

[![build status][1]][2] [![dependency status][3]][4] [![coverage report][9]][10] [![stability index][15]][16]

[![npm stats][13]][14]

[![browser support][5]][6]

Retrieve values from a specified key or fallback to a default index

## Example

```js
var Lookup = require("json-lookup")

var config = {
    "default": {
        "port": "4125"    // by default we should use this config
    },
    "ci": "default",      // ci should result to default
    "test": "production", // Test index should be the same as production
    "production": {       // Production has it's own port config
        "port": "8085"
    }
}

// Lookup(json<Object> [, specifiedKey<Maybe<String>, defaultKey<Maybe<String>>]) -> Object
var lookup = Lookup(config, process.env.NODE_ENV)
// Equivalent to Lookup(config, process.env.NODE_ENV, "default")

var port = lookup.port
// if process.env.NODE_ENV === "production"
// port -> "8085"

// if process.env.NODE_ENV === "test"
// port -> "8085"

// if process.env.NODE_ENV === "ci"
// port -> "4125"

// if process.env.NODE_ENV === null, undefined, "default" or otherwise not a string
// port -> "4125"


```
 - By default the key `"default"` is used as a fallback. You can change this by passing in a third argument for the name of this default key
 - If the specified key and default key exists, the default value is [extended][17] with the specified value
 - If the specified key exists and the associated value is a string, we take this string to be the key with a recursive lookup
 - If specified key doesn't exist, then only the default value is used
 - If the default value doesn't exist, then only the specified value is used
 - If both the default and specified keys don't exist, an exception is thrown

## Installation

`npm install json-lookup`

## Contributors

 - Matt-Esch

## MIT Licenced

  [1]: https://secure.travis-ci.org/Matt-Esch/json-lookup.png
  [2]: https://travis-ci.org/Matt-Esch/json-lookup
  [3]: https://david-dm.org/Matt-Esch/json-lookup.png
  [4]: https://david-dm.org/Matt-Esch/json-lookup
  [5]: https://ci.testling.com/Matt-Esch/json-lookup.png
  [6]: https://ci.testling.com/Matt-Esch/json-lookup
  [9]: https://coveralls.io/repos/Matt-Esch/json-lookup/badge.png
  [10]: https://coveralls.io/r/Matt-Esch/json-lookup
  [13]: https://nodei.co/npm/json-lookup.png?downloads=true&stars=true
  [14]: https://nodei.co/npm/json-lookup
  [15]: http://hughsk.github.io/stability-badges/dist/unstable.svg
  [16]: http://github.com/hughsk/stability-badges

  [7]: https://badge.fury.io/js/json-lookup.png
  [8]: https://badge.fury.io/js/json-lookup
  [11]: https://gemnasium.com/Matt-Esch/json-lookup.png
  [12]: https://gemnasium.com/Matt-Esch/json-lookup
  
  [17]: https://github.com/Raynos/xtend
