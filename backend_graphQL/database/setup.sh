#!/bin/bash
set -e
echo "RRIRIRIRIR"
/etc/init.d/postgresql start
sleep 5
psql -f create_fixtures.sql    
/etc/init.d/postgresql stop