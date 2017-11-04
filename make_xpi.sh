#!/bin/sh

cd addon
zip -r ../randomua-$(git rev-parse --short=6 HEAD).xpi *
