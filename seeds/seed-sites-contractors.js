require('dotenv').config();
const { sequelize, Site, Contractor } = require('../models');

async function seedSite1Contractors() {
  try {
    console.log('🚀 Starting seed: Site 1 + Contractors');
    await sequelize.authenticate();
    console.log('✅ DB connected');

    // Ensure models are synced
    await sequelize.sync({ alter: true });

    // Create or find Site 1
    const [site, created] = await Site.findOrCreate({
      where: { site_code: 'SITE001' },
      defaults: { site_name: 'Site 1', is_active: true }
    });
    console.log(`📍 Using Site: ${site.site_name} (id=${site.id}) ${created ? '[created]' : ''}`);

    const list = [
      { code: 'CON001', name: 'Civil Work Contractor', specialty: 'civil' },
      { code: 'CON002', name: 'Centring Work Contractor', specialty: 'centring' },
      { code: 'CON003', name: 'Sand Filling Contractor', specialty: 'sand-filling' },
      { code: 'CON004', name: 'Electrical Contractor', specialty: 'electrical' },
      { code: 'CON005', name: 'Plumber Contractor', specialty: 'plumbing' },
      { code: 'CON006', name: 'Carpenter Contractor', specialty: 'carpentry' },
      { code: 'CON007', name: 'Tiles Layer Contractor', specialty: 'tiling' },
      { code: 'CON008', name: 'Jally Contractor', specialty: 'jally' },
      { code: 'CON009', name: 'Grill Contractor', specialty: 'grill' },
      { code: 'CON010', name: 'Painter Contractor', specialty: 'painting' }
    ];

    for (const item of list) {
      const [contr, createdC] = await Contractor.findOrCreate({
        where: { contractor_code: item.code },
        defaults: {
          contractor_name: item.name,
          specialty: item.specialty,
          site_id: site.id,
          is_active: true
        }
      });
      if (!createdC) {
        await contr.update({
          contractor_name: item.name,
          specialty: item.specialty,
          site_id: site.id,
          is_active: true
        });
      }
      console.log(`👷  ${item.name} -> ${createdC ? 'created' : 'updated'} (id=${contr.id})`);
    }

    console.log('✅ Seed completed successfully');
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seedSite1Contractors();
