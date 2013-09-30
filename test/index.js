var test = require("tape")

var Lookup = require("../index")

test("Lookup is a function", function (assert) {
    assert.equal(typeof Lookup, "function")
    assert.end()
})

var example = {
    "default": {
        "greeting": "Hello {0}, how are you?",
        "thanks": "Thank you",
        "fallback": "No other locale has this string"
    },
    "magical": {
        "greeting": "Hello alternative"
    },
    "es_ES": {
        "greeting": "¿Hola {0}, que tal?",
        "thanks": "Gracias"
    },
    "es_AR": "es_ES",
    "circular": "circular",

    "this": "is",
    "is": "deeply",
    "deeply": "circulating",
    "circulating": "this"
}

test("Lookup yields correct value for a given index", function (assert) {
    var lookup = Lookup(example, "es_ES")
    var greeting = lookup.greeting
    var thanks = lookup.thanks

    assert.equal(greeting, "¿Hola {0}, que tal?")
    assert.equal(thanks, "Gracias")
    assert.end()
})

test("Lookup yields default value for a missing index",
    function (assert) {
        var lookup = Lookup(example, "en_GB")
        var greeting = lookup.greeting
        var thanks = lookup.thanks

        assert.equal(greeting, "Hello {0}, how are you?")
        assert.equal(thanks, "Thank you")
        assert.end()
    })

test("Lookup yields default value for a missing key",
    function (assert) {
        var lookup = Lookup(example, "es_AR")
        var fallbackAR = lookup.fallback
        lookup = Lookup(example, "es_ES")
        var fallbackES = lookup.fallback

        assert.equal(fallbackAR, "No other locale has this string")
        assert.equal(fallbackES, "No other locale has this string")
        assert.end()
    })

test("Lookup keys redirect as required", function (assert) {
    var lookup = Lookup(example, "es_AR")
    var greeting = lookup.greeting

    assert.equal(greeting, "¿Hola {0}, que tal?")
    assert.end()
})

test("Missing key throws exception", function (assert) {
    var lookup = Lookup(example)
    var result
    try {
        result = lookup.blob
        assert.error()
    } catch (e) {
        assert.equal(e.message, "Key 'blob' not found in 'default'")
    }
    assert.end()
})

test("Circular index throws exception", function (assert) {
    try {
        Lookup(example, "circular")
        assert.error()
    } catch (e) {
        assert.equal(e.message,
            "JSON index 'circular' causes circular reference")
    }
    assert.end()
})

test("Deep circular index throws exception", function (assert) {
    try {
        Lookup(example, "this")
        assert.error()
    } catch (e) {
        assert.equal(e.message,
            "JSON index 'this' causes circular reference")
    }
    assert.end()
})

test("Custom default is used", function (assert) {
    var lookup = Lookup(example, null, "magical")
    var result = lookup.greeting
    assert.equal(result, "Hello alternative")
    assert.end()
})

test("Error is thrown if no default fallback", function (assert) {
    try {
        Lookup(example, "a", "b")
        assert.error()
    } catch (e) {
        assert.equal(e.message, "No value for index 'b'")
    }
    assert.end()
})
