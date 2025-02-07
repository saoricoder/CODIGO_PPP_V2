const express = require('express');
const router = express.Router();
const cie11Service = require('../../services/cie11.service');


router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await cie11Service.searchDiseases(query);
    res.json(results);
    console.log(results);
    console.log(query);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/details/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const { language } = req.query;
    const details = await cie11Service.getDiseaseDetails(code, language);
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;