const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching projects' });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Private
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching project' });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      created_by: req.user.id
    });

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error creating project' });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await project.update(req.body);

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error updating project' });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error deleting project' });
  }
};
