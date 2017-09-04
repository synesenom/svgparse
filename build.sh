#!/usr/bin/env bash

uglifyjs \
    src/gen.js \
    -m \
    --output svgparse.min.js