#!/bin/bash  
echo "Running app"  
./scripts/backend.sh &./scripts/frontend.sh && fg
echo "App built"