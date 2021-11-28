#!/bin/bash

gunicorn wsgi:app --bind 0.0.0.0:9001 --log-level=debug --workers=1