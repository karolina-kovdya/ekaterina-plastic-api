const router = require("express").Router();
const {
  createdSection,
  getSections,
  deleteSection,
  updateSection,
  deleteFile,
} = require("../controllers/section");
const upload = require("../middlewares/upload");

router.post("/technical/section", createdSection);
router.get("/technical", getSections);
router.delete("/technical/section/:_id", deleteSection);
router.patch("/technical/section/:_id", upload.single("image"), updateSection);
router.patch('/technical/section/img/:_id', deleteFile)

module.exports = router;
