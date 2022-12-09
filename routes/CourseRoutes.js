const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

const Course = require("../models/Course");

//get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.json(err);
  }
});

//create a course
router.post("/create", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    if (requester.role !== "teacher") {
      return res.send("non teacher user");
    }

    const form = req.body;
    if (!form.additional_info || form.additional_info == "") {
      form.additional_info = "none";
    }
    if (!form.contact || form.contact == "") {
      form.contact = "none";
    }
    const newcourse = new Course(form);

    newcourse.save();
    res.send(newcourse);
  } catch (err) {
    res.send(err);
  }
});

//edit a course
router.put("/edit/:courseurl", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    if (requester.role !== "teacher") {
      return res.send("non teacher user");
    }

    const form = req.body;
    const course = await Course.findOne({ url: req.params.courseurl });

    for (const [key, value] of Object.entries(form)) {
      if (course[key] || course[key] === 0) {
        course[key] = value;
      } else {
        console.log(`Can not find key ${key} in this course`);
        S;
      }
    }
    if (!course.additional_info || course.additional_info == "") {
      course.additional_info = "none";
    }
    if (!course.contact || course.contact == "") {
      course.contact = "none";
    }
    course.save();
    res.send(course);
  } catch (error) {
    res.send(error);
  }
});

//delete a course
router.delete("/delete/:courseurl", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    if (requester.role !== "teacher") {
      return res.send("non teacher user");
    }
    const course = await Course.findOneAndDelete({ url: req.params.courseurl });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
