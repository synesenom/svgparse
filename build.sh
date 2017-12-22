#!/usr/bin/env bash

uglifyjs \
    src/core.js src/css.js \
    -m \
    --output svgparse.min.js