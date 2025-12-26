const User = require('../models/User');

// Demo users for testing
const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@labourcrm.com',
    password: 'admin123',
    phone: '+91 9876543210',
    role: 'admin'
  },
  {
    name: 'Project Manager',
    email: 'manager@labourcrm.com',
    password: 'manager123',
    phone: '+91 9876543211',
    role: 'manager'
  },
  {
    name: 'Site Supervisor',
    email: 'supervisor@labourcrm.com',
    password: 'supervisor123',
    phone: '+91 9876543212',
    role: 'supervisor'
  },
  {
    name: 'Accounts Officer',
    email: 'accounts@labourcrm.com',
    password: 'accounts123',
    phone: '+91 9876543213',
    role: 'accounts'
  }
];

async function seedUsers() {
  try {
    // Check if users already exist
    const existingUsers = await User.count();
    
    if (existingUsers > 0) {
      console.log('✓ Users already exist. Skipping seeding.');
      return;
    }

    // Create users
    for (const userData of demoUsers) {
      const user = await User.create(userData);
      console.log(`✓ Created user: ${user.name} (${user.email})`);
    }

    console.log('✓ Demo users seeded successfully');
  } catch (error) {
    console.error('Error seeding users:', error.message);
  }
}

module.exports = seedUsers;
