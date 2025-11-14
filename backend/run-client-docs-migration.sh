#!/bin/bash
# Run this on Render to create the client_documents table

echo "Running client_documents migration..."

node run-migration.js migrations/create_client_documents_table.sql

echo "Migration complete!"

