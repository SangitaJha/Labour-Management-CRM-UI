require('dotenv').config();
const { sequelize, Site } = require('../models');

async function seedSites() {
  try {
    console.log('🚀 Seeding Sites 1–10');
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const sites = Array.from({ length: 10 }, (_, i) => {
      const id = i + 1;
      return {
        site_code: `SITE${String(id).padStart(3,'0')}`,
        site_name: `Site ${id}`,
        is_active: true
      };
    });

    for (const s of sites) {
      const [site, created] = await Site.findOrCreate({
        where: { site_code: s.site_code },
        defaults: s
      });
      if (!created) await site.update(s);
      console.log(`📍 ${site.site_name} ${created ? '[created]' : '[updated]'}`);
    }

    console.log('✅ Sites seeded');
  } catch (err) {
    console.error('❌ Seed sites error:', err.message);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
}

seedSites();
