const Worker = require('../models/Worker');
const Contractor = require('../models/Contractor');
const { Op } = require('sequelize');

// Get all workers
exports.getAllWorkers = async (req, res) => {
  try {
    const { skill_type, contractor_id, project_id, site_id, is_active } = req.query;
    
    const where = {};
    if (skill_type) where.skill_type = skill_type;
    if (contractor_id) where.contractor_id = contractor_id;
    if (project_id) where.project_id = project_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (site_id) where.site_id = site_id;

    const workers = await Worker.findAll({ where, order: [['created_at', 'DESC']] });
    res.json({ success: true, data: workers });
  } catch (error) {
    console.error('Get workers error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get single worker
exports.getWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, error: 'Worker not found' });
    }
    res.json({ success: true, data: worker });
  } catch (error) {
    console.error('Get worker error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create worker
exports.createWorker = async (req, res) => {
  try {
    const worker = await Worker.create(req.body);
    res.status(201).json({ success: true, data: worker });
  } catch (error) {
    console.error('Create worker error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update worker
exports.updateWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, error: 'Worker not found' });
    }
    await worker.update(req.body);
    res.json({ success: true, data: worker });
  } catch (error) {
    console.error('Update worker error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete worker
exports.deleteWorker = async (req, res) => {
  try {
    const worker = await Worker.findByPk(req.params.id);
    if (!worker) {
      return res.status(404).json({ success: false, error: 'Worker not found' });
    }
    await worker.destroy();
    res.json({ success: true, message: 'Worker deleted' });
  } catch (error) {
    console.error('Delete worker error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all contractors (optional filters)
exports.getAllContractors = async (req, res) => {
  try {
    const { site_id, specialty, is_active } = req.query;
    const where = {};
    if (site_id) where.site_id = site_id;
    if (specialty) where.specialty = specialty;
    if (is_active !== undefined) where.is_active = is_active === 'true';

    const contractors = await Contractor.findAll({ where, order: [['created_at', 'DESC']] });
    res.json({ success: true, data: contractors });
  } catch (error) {
    console.error('Get contractors error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Create contractor
exports.createContractor = async (req, res) => {
  try {
    const contractor = await Contractor.create(req.body);
    res.status(201).json({ success: true, data: contractor });
  } catch (error) {
    console.error('Create contractor error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
