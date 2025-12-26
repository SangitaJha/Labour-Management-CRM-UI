const models = require('./models');

// Sync all models with database
async function syncDatabase() {
  try {
    console.log('🔄 Syncing database models...');
    
    // This creates tables if they don't exist
    // alter: true updates existing tables without dropping data
    await models.sequelize.sync({ alter: true });
    
    console.log('✅ Database models synced successfully');
  } catch (error) {
    console.error('❌ Database sync error:', error.message);
    console.log('💡 Tip: Update DB credentials in backend/.env file');
  }
}

if (require.main === module) {
  syncDatabase().then(() => process.exit(0));
} else {
  module.exports = syncDatabase;
}
