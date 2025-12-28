const Site = require('../models/Site');
const { Op } = require('sequelize');

exports.getSites = async (req, res) => {
  try {
    const { project_id, q, is_active } = req.query;
    const where = {};
    if (project_id) where.project_id = project_id;
    if (is_active !== undefined) where.is_active = is_active === 'true';
    if (q) where.site_name = { [Op.like]: `%${q}%` };

    const sites = await Site.findAll({ where, order: [['created_at', 'DESC']] });
    res.json({ success: true, data: sites });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSite = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);
    if (!site) return res.status(404).json({ success: false, error: 'Site not found' });
    res.json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createSite = async (req, res) => {
  try {
    const site = await Site.create(req.body);
    res.status(201).json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);
    if (!site) return res.status(404).json({ success: false, error: 'Site not found' });
    await site.update(req.body);
    res.json({ success: true, data: site });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    const site = await Site.findByPk(req.params.id);
    if (!site) return res.status(404).json({ success: false, error: 'Site not found' });
    await site.destroy();
    res.json({ success: true, message: 'Site deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
