/**
 * Module for generating CSS objects.
 *
 * @module css
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

    var core = exports.core;
    exports.css = (function() {
        /**
         * Class describing a generated CSS content.
         * The class contains the original object and the string representation.
         *
         * @class CSSContent
         * @memberOf svgparse.css
         * @property {object} o Object corresponding to the CSS content.
         * @property {string} s String representation of the CSS content.
         * @constructor
         */
        function CSSContent(obj, str) {
            return {o: obj, s: str};
        }

        /**
         * Generates a random CSS integer.
         *
         * @method integer
         * @memberOf svgparse.css
         * @returns {CSSContent} Random CSS integer.
         */
        function integer() {
            var s = core.char("+- ") + core.int(10);
            return this.CSSContent(
                parseInt(s),
                s.trim()
            );
        }

        /**
         * Generates a random CSS number.
         *
         * @method number
         * @memberOf dice.css
         * @returns {CSSContent} Random CSS number.
         */
        function number() {
            var s = core.char("+- ") + core.coin(0.5, core.int(100), "") + "." + core.int(100);
            return this.CSSContent(
                parseFloat(s),
                s.trim()
            );
        }

        /**
         * Generates a random CSS length.
         *
         * @method length
         * @memberOf dice.css
         * @returns {CSSContent} Random CSS length.
         */
        function length() {
            var s = core.coin(0.5, core.int(100), "") + "." + core.int(100);
            if (parseFloat(s) != 0) {
                s += core.choice(["em", "ex", "px", "in", "cm", "mm", "pt", "pc", "%"]);
            } else {
                s = "0";
            }
            return this.CSSContent(
                parseFloat(s),
                s.trim()
            );
        }

        /**
         * Generates a random CSS opacity-value.
         *
         * @method opacityValue
         * @memberOf dice.css
         * @returns {CSSContent} Random CSS opacityValue.
         */
        function opacityValue() {
            var s = core.choice([
                "1", "0",
                core.int(9) + "." + core.int(1, 1000) + core.char("Ee") + core.int(-10, -1),
                core.char(" 0") + "." + core.int(1, 1000)
            ]);
            return this.CSSContent(
                parseFloat(s),
                s.trim()
            );
        }

        /**
         * Generates a random CSS color.
         *
         * @method color
         * @memberOf dice.css
         * @returns {CSSContent} Random CSS color.
         */
        function color() {
            var o = {
                r: core.int(255),
                g: core.int(255),
                b: core.int(255)
            };

            // 6 digit hex
            if (Math.random() < 1/5) {
                return this.CSSContent(
                    o,
                    "#" + Math.floor(o.r/16).toString(16) + (o.r%16).toString(16)
                    + Math.floor(o.g/16).toString(16) + (o.g%16).toString(16)
                    + Math.floor(o.b/16).toString(16) + (o.b%16).toString(16)
                );
            }
            // 3 digits hex
            if (Math.random() < 1/4) {
                o = {
                    r: Math.floor(o.r/16),
                    g: Math.floor(o.g/16),
                    b: Math.floor(o.b/16)
                };
                return this.CSSContent(
                    o,
                    "#" + o.r.toString(16) + o.g.toString(16) + o.b.toString(16)
                );
            }
            // rgb with integers
            if (Math.random() < 1/3) {
                return this.CSSContent(
                    o,
                    "rgb(" + o.r + "," + o.g + "," + o.b + ")"
                );
            }
            // rgb with percentages
            if (Math.random() < 1/2) {
                return this.CSSContent(
                    o,
                    "rgb(" + Math.floor(o.r/2.55) + "%," + Math.floor(o.g/2.55) + "%," + Math.floor(o.b/2.55) + "%)"
                );
            } else {
                var index = core.int(146);
                var s = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black",
                    "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
                    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan",
                    "darkgoldenrod", "darkgray", "darkgreen", "darkgrey", "darkkhaki", "darkmagenta",
                    "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen",
                    "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink",
                    "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen",
                    "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow",
                    "grey", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender",
                    "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan",
                    "lightgoldenrodyellow", "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon",
                    "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue",
                    "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine",
                    "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue",
                    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream",
                    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange",
                    "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred",
                    "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown",
                    "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver",
                    "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan",
                    "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow",
                    "yellowgreen"][index];
                var c = ["#F0F8FF", "#FAEBD7", "#00FFFF", "#7FFFD4", "#F0FFFF", "#F5F5DC", "#FFE4C4", "#000000",
                    "#FFEBCD", "#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E",
                    "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C", "#00FFFF", "#00008B", "#008B8B", "#B8860B",
                    "#A9A9A9", "#006400", "#A9A9A9", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00", "#9932CC",
                    "#8B0000", "#E9967A", "#8FBC8F", "#483D8B", "#2F4F4F", "#2F4F4F", "#00CED1", "#9400D3",
                    "#FF1493", "#00BFFF", "#696969", "#696969", "#1E90FF", "#B22222", "#FFFAF0", "#228B22",
                    "#FF00FF", "#DCDCDC", "#F8F8FF", "#FFD700", "#DAA520", "#808080", "#008000", "#ADFF2F",
                    "#808080", "#F0FFF0", "#FF69B4", "#CD5C5C", "#4B0082", "#FFFFF0", "#F0E68C", "#E6E6FA",
                    "#FFF0F5", "#7CFC00", "#FFFACD", "#ADD8E6", "#F08080", "#E0FFFF", "#FAFAD2", "#D3D3D3",
                    "#90EE90", "#D3D3D3", "#FFB6C1", "#FFA07A", "#20B2AA", "#87CEFA", "#778899", "#778899",
                    "#B0C4DE", "#FFFFE0", "#00FF00", "#32CD32", "#FAF0E6", "#FF00FF", "#800000", "#66CDAA",
                    "#0000CD", "#BA55D3", "#9370DB", "#3CB371", "#7B68EE", "#00FA9A", "#48D1CC", "#C71585",
                    "#191970", "#F5FFFA", "#FFE4E1", "#FFE4B5", "#FFDEAD", "#000080", "#FDF5E6", "#808000",
                    "#6B8E23", "#FFA500", "#FF4500", "#DA70D6", "#EEE8AA", "#98FB98", "#AFEEEE", "#DB7093",
                    "#FFEFD5", "#FFDAB9", "#CD853F", "#FFC0CB", "#DDA0DD", "#B0E0E6", "#800080", "#FF0000",
                    "#BC8F8F", "#4169E1", "#8B4513", "#FA8072", "#F4A460", "#2E8B57", "#FFF5EE", "#A0522D",
                    "#C0C0C0", "#87CEEB", "#6A5ACD", "#708090", "#708090", "#FFFAFA", "#00FF7F", "#4682B4",
                    "#D2B48C", "#008080", "#D8BFD8", "#FF6347", "#40E0D0", "#EE82EE", "#F5DEB3", "#FFFFFF",
                    "#F5F5F5", "#FFFF00", "#9ACD32"][index].replace('#', '');
                return this.CSSContent(
                    {r: parseInt(c[0] + c[1], 16), g: parseInt(c[2] + c[3], 16), b: parseInt(c[4] + c[5], 16)},
                    s
                );
            }
        }

        return {
            CSSContent: CSSContent,
            integer: integer,
            number: number,
            length: length,
            opacityValue: opacityValue,
            color: color
        };
    })();
})));