function validateBody(schema) {
  return (req, res, next) => {
    try {
      const body = req.body || {};
      for (const [key, rule] of Object.entries(schema)) {
        const rules = String(rule).split('|');
        const v = body[key];
        if (rules.includes('required') && (v === undefined || v === null)) {
          const err = new Error(`${key} is required`); err.status = 400; throw err;
        }
        if (v != null) {
          if (rules.find(r => r.startsWith('string')) && typeof v !== 'string') {
            const err = new Error(`${key} must be string`); err.status = 400; throw err;
          }
          const min = rules.find(r => r.startsWith('min:'));
          if (min && String(v).trim().length < parseInt(min.split(':')[1], 10)) {
            const err = new Error(`${key} too short`); err.status = 400; throw err;
          }
          const max = rules.find(r => r.startsWith('max:'));
          if (max && String(v).length > parseInt(max.split(':')[1], 10)) {
            const err = new Error(`${key} too long`); err.status = 400; throw err;
          }
        } else {
          // allow missing fields if not required
        }
      }
      next();
    } catch (e) { next(e); }
  };
}

module.exports = { validateBody };
