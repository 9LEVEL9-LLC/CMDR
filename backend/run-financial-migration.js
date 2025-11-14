#!/usr/bin/env node

/**
 * Financial Records Migration Runner
 * Run: node run-financial-migration.js
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Read DATABASE_URL from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL not found in environment');
  console.error('💡 Set DATABASE_URL in your environment or .env file');
  process.exit(1);
}

const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

async function runMigration() {
  console.log('🚀 Starting Financial Records database migration...\n');
  
  const migrationFile = path.join(__dirname, 'migrations', 'create_financial_records.sql');
  
  if (!fs.existsSync(migrationFile)) {
    console.error('❌ Migration file not found:', migrationFile);
    process.exit(1);
  }
  
  const sql = fs.readFileSync(migrationFile, 'utf8');
  
  try {
    // Execute the migration
    await pool.query(sql);
    console.log('✅ Successfully created Financial Records table:');
    console.log('   - financial_records (with indexes)');
    console.log('   - Supports monthly contract values');
    console.log('   - Tracks both consistent MRR and custom monthly values\n');
    
    // Verify table was created
    const result = await pool.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'financial_records'
      ORDER BY ordinal_position
    `);
    
    if (result.rows.length > 0) {
      console.log('📊 Verified table structure:');
      result.rows.forEach(row => {
        console.log(`   ✓ ${row.column_name} (${row.data_type})`);
      });
    }
    
    console.log('\n🎉 Migration completed successfully!');
    console.log('\n📌 Next steps:');
    console.log('   1. Run: node seed-financial-data.js (to import CSV data)');
    console.log('   2. Test the Financial View page in the advisor dashboard');
    
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log('ℹ️  Table already exists, skipping creation');
    } else {
      console.error('❌ Migration failed:', error.message);
      console.error('\nFull error:', error);
      process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

runMigration();

