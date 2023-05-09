const router = require("express").Router();
const conn = require("../db/dbConnection");
const authorized = require("../middleware/authorized");
const admin = require("../middleware/admin");
const { body, validationResult } = require("express-validator");
const upload = require("../middleware/uploadLogo");
const util = require("util"); 
const fs = require("fs"); 


router.post(
  "",
  admin,
  upload.single("logo"),
  body("position")
    .isString()
    .withMessage("please enter a valid job position")
    .isLength({ min: 10 })
    .withMessage("job position should be at lease 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),

  body("max candidate number")
    .isString()
    .withMessage("please enter a valid max candidate number"),
    
    body("qualifications")
    .isString()
    .withMessage("please enter a valid qualifications ")
    .isLength({ min: 20 })
    .withMessage("qualifications name should be at lease 20 characters"),
    
    body("offer")
    .isString()
    .withMessage("please enter a valid offer "),  
  async (req, res) => {
    try {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "logo is Required",
            },
          ],
        });
      }

      
      const job = {
        position: req.body.position,
        description: req.body.description,
        max_candidate_number: req.body.max_candidate_number,
        qualifications: req.body.qualifications,
        offer: req.body.offer,
        image_url: req.file.filename,
      };

      
      const query = util.promisify(conn.query).bind(conn);
      await query("insert into jobs set ? ", job);
      res.status(200).json({
        msg: "job created successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


router.put(
  "/:id", 
  admin,
  upload.single("logo"),
  body("position")
    .isString()
    .withMessage("please enter a valid job position")
    .isLength({ min: 10 })
    .withMessage("job position should be at lease 10 characters"),

  body("description")
    .isString()
    .withMessage("please enter a valid description ")
    .isLength({ min: 20 })
    .withMessage("description name should be at lease 20 characters"),

  body("max candidate number")
    .isString()
    .withMessage("please enter a valid max candidate number"),
    
    body("qualifications")
    .isString()
    .withMessage("please enter a valid qualifications ")
    .isLength({ min: 20 })
    .withMessage("qualifications name should be at lease 20 characters"),
    
    body("offer")
    .isString()
    .withMessage("please enter a valid offer "), 
  async (req, res) => {
    try {
      
      const query = util.promisify(conn.query).bind(conn);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      
      const job = await query("select * from job where id = ?", [
        req.params.id,
      ]);
      if (!job[0]) {
        res.status(404).json({ ms: "job not found !" });
      }

      
      const jobObj = {
        position: req.body.position,
        description: req.body.description,
        max_candidate_number: req.body.max_candidate_number,
        qualifications: req.body.qualifications,
        offer: req.body.offer,
      };

      if (req.file) {
        jobObj.logo = req.file.filename;
        fs.unlinkSync("./upload/" + job[0].logo); 
      }

      
      await query("update jobs set ? where id = ?", [jobObj, job[0].id]);

      res.status(200).json({
        msg: "job updated successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


router.delete(
  "/:id", 
  admin,
  async (req, res) => {
    try {
      
      const query = util.promisify(conn.query).bind(conn);
      const job = await query("select * from jobs where id = ?", [
        req.params.id,
      ]);
      if (!movie[0]) {
        res.status(404).json({ ms: "job not found !" });
      }
      
      fs.unlinkSync("./upload/" + jobs[0].logo); 
      await query("delete from jobs where id = ?", [jobs[0].id]);
      res.status(200).json({
        msg: "job delete successfully",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


router.get("", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  let search = "";
  if (req.query.search) {
    
    search = `where position LIKE '%${req.query.search}%' or description LIKE '%${req.query.search}%' or qualifications LIKE '%${req.query.search}%'`;
  }
  const jobs = await query(`select * from jobs ${search}`);
  jobs.map((jobs) => {
    jobs.logo = "http://" + req.hostname + ":4000/" + jobs.logo;
  });
  res.status(200).json(jobs);
});


router.get("/:id", async (req, res) => {
  const query = util.promisify(conn.query).bind(conn);
  const job = await query("select * from jobs where id = ?", [
    req.params.id,
  ]);
  if (!job[0]) {
    res.status(404).json({ ms: "job not found !" });
  }
  job[0].logo = "http://" + req.hostname + ":4000/" + job[0].logo;
  job[0].qualification = await query(
    "select * from description where job_id = ?",
    job[0].id
  );
  res.status(200).json(job[0]);
});


router.post(
  "/qualifications",
  authorized,
  body("job_ID").isString().withMessage("please enter a valid ID"),
  body("description").isString().withMessage("please enter a valid description"),
  async (req, res) => {
    try {
      const query = util.promisify(conn.query).bind(conn);
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const job = await query("select * from job where id = ?", [
        req.body.job_id,
      ]);
      if (!job[0]) {
        res.status(404).json({ ms: "job not found !" });
      }

      const qualificationjob = {
        job_id: job[0].id,
        description: req.body.description,
      };
      await query("insert into qualifications set ?", qualificationObj);

      res.status(200).json({
        msg: "description added successfully !",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
