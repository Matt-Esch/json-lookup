var extend = require("xtend")
var format = require("string-template")

var CIRCULAR_REFERENCE = "JSON index '{0}' causes circular reference"
var NO_TRANSLATIONS = "No value for index '{0}'"
var KEY_NOT_FOUND = "Key '{0}' not found in '{1}'"

module.exports = Lookup

function Lookup(json, index, defaultIndex) {
    var locales = []
    var t

    if (typeof defaultIndex !== "string") {
        defaultIndex = "default"
    }

    if (index === null || index === undefined) {
        index = defaultIndex
    }

    while (true) {
        t = json[index]
        locales.push(index)

        if (typeof t === "string") {
            if (locales.indexOf(t) !== -1) {
                throw new Error(format(CIRCULAR_REFERENCE, t))
            }

            index = t
            continue
        } else if (!t) {
            t = json[defaultIndex]

            if (!t) {
                throw new Error(format(NO_TRANSLATIONS, defaultIndex))
            }

            break;
        }

        t = extend(json[defaultIndex], t)
        break
    }

    return t
}
