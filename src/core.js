/**
 * Module implementing various random generators.
 *
 * @module core
 * @memberOf svgparse
 * @author Enys Mones (enys.mones@gmail.com)
 */
(function (global, factory) {
    if (typeof exports === "object" && typeof module !== "undefined") {
        factory(exports);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory((global.svgparse = global['svgparse'] || {}));
    }
} (this, (function (exports) {
    "use strict";

    exports.core = (function () {
        /**
         * Generates a random float.
         * If min > max, a random number in (max, min) is generated.
         *
         * @method r
         * @memberOf svgparse.core
         * @param {number} min Lower boundary.
         * @param {number} max Upper boundary.
         * @returns {number} Random number.
         */
        function r(min, max) {
            return min < max ? Math.random() * (max - min) + min : Math.random() * (min - max) + max;
        }

        /**
         * Runs a generator once or several times to return a single value or an array of values.
         *
         * @method some
         * @memberOf svgparse.core
         * @param {function} generator Random generator to use.
         * @param {number=} n Number of values to generate.
         * @returns {(number|string|Array)} Single value or array of generated values.
         */
        function some(generator, n) {
            if (n === null || n === undefined || n < 2)
                return generator();
            else {
                var values = new Array(n);
                for (var i = 0; i < n; i++)
                    values[i] = generator();
                return values;
            }
        }

        /**
         * Generates some uniformly distributed random floats in (min, max).
         * If min > max, a random float in (max, min) is generated.
         * If no parameters are passed, generates a single random float between 0 and 1.
         * If only min is specified, generates a single random float between 0 and min.
         *
         * @method float
         * @memberOf svgparse.core
         * @param {number=} min Lower boundary, or upper if max is not given.
         * @param {number=} max Upper boundary.
         * @param {number=} n Number of floats to generate.
         * @returns {(number|Array)} Single float or array of random floats.
         */
        function float(min, max, n) {
            if (arguments.length == 0)
                return r(0, 1);
            if (arguments.length == 1)
                return r(0, min);
            return some(function () {
                return r(min, max);
            }, n);
        }

        /**
         * Generates some uniformly distributed random integers in (min, max).
         * If min > max, a random integer in (max, min) is generated.
         * If only min is specified, generates a single random integer between 0 and min.
         *
         * @method int
         * @memberOf svgparse.core
         * @param {number} min Lower boundary, or upper if max is not specified.
         * @param {number=} max Upper boundary.
         * @param {number=} n Number of integers to generate.
         * @returns {(number|Array)} Single integer or array of random integers.
         */
        function int(min, max, n) {
            if (arguments.length == 1)
                return Math.floor(r(0, min + 1));
            return some(function () {
                return Math.floor(r(min, max + 1));
            }, n);
        }

        /**
         * Samples some elements with replacement from an array with uniform distribution.
         *
         * @method choice
         * @memberOf svgparse.core
         * @param {Array} values Array to sample from.
         * @param {number=} n Number of elements to sample.
         * @returns {(object|Array)} Single element or array of sampled elements.
         * If array is invalid, null pointer is returned.
         */
        function choice(values, n) {
            if (values === null || values === undefined || values.length == 0)
                return null;
            return some(function () {
                return values[Math.floor(r(0, values.length))];
            }, n);
        }

        /**
         * Samples some characters with replacement from a string with uniform distribution.
         *
         * @method char
         * @memberOf svgparse.core
         * @param {string} string String to sample characters from.
         * @param {number=} n Number of characters to sample.
         * @returns {(string|Array)} Random character if k is not given or less than 2, an array of random characters otherwise.
         */
        function char(string, n) {
            if (string === null || string === undefined || string.length == 0)
                return "";
            return some(function () {
                return string.charAt(Math.floor(r(0, string.length)));
            }, n);
        }

        /**
         * Shuffles an array in-place using the Fisher--Yates algorithm.
         *
         * @method shuffle
         * @memberOf svgparse.gen.core
         * @param {Array} values Array to shuffle.
         * @return {Array} The shuffled array.
         */
        function shuffle(values) {
            var i, temp, l = values.length;
            while (l) {
                i = Math.floor(Math.random() * l--);
                temp = values[l];
                values[l] = values[i];
                values[i] = temp;
            }
            return values;
        }

        /**
         * Flips a biased coin several times and returns the associated head/tail value or array of values.
         *
         * @method coin
         * @memberOf svgparse.core
         * @param {object} head Head value.
         * @param {object} tail Tail value.
         * @param {number=} p Bias (probability of head). If not specified, 0.5 is used.
         * @param {number=} n Number of coins to flip.
         * @returns {(object|Array)} Object of head/tail value or an array of head/tail values.
         */
        function coin(head, tail, p, n) {
            var prob = p ? p : 0.5;
            return some(function () {
                return Math.random() < prob ? head : tail;
            }, n);
        }

        // Exposed methods
        return {
            float: float,
            int: int,
            choice: choice,
            char: char,
            shuffle: shuffle,
            coin: coin
        };
    }());
})));