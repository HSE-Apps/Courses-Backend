const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../middleware/auth");

const User = require("../models/User");
const Course = require("../models/Course");

//get user or create spot for new user with hse key id
router.post("/", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    console.log(requester);

    const userCourseData = await User.findOne({
      msId: requester.user.localAccountId,
    })
      .lean()
      .populate("courses.Freshman.semester1")
      .populate("courses.Freshman.semester2")
      .populate("courses.Sophomore.semester1")
      .populate("courses.Sophomore.semester2")
      .populate("courses.Junior.semester1")
      .populate("courses.Junior.semester2")
      .populate("courses.Senior.semester1")
      .populate("courses.Senior.semester2");
    if (userCourseData) {
      return res.json({ ...requester, courseData: userCourseData });
    } else {
      const newUser = new User({ msId: requester.user.localAccountId });
      console.log(newUser);
      newUser.save();
      return res.json({ ...requester, courseData: newUser });
    }
  } catch (err) {
    return res.json({ errors: [{ msg: "Server Error" }] }).status(500);
  }
});

//get student list
router.post("/list", auth(), async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    const { requester } = res.locals;
    if (requester.role !== "teacher") {
      return res.send([]);
    }

    const UserIds = await User.find().distinct("_id");
    const ids = UserIds.map((id) => id.toString());

    /*  const response = await axios.post(
      `${process.env.AUTH_API}/user/aggregate`,
      { idList: ids }
    ); */
    const userKeyData = response.data;

    ret = [];
    for (var tempKeyData of userKeyData) {
      if (tempKeyData.role == "student") {
        var yearGap = tempKeyData.class - currentYear;
        if (yearGap <= 1) {
          var tempClass = "Senior";
        } else if (yearGap === 2) {
          var tempClass = "Junior";
        } else if (yearGap === 3) {
          var tempClass = "Sophomore";
        } else {
          var tempClass = "Freshman";
        }

        ret.push({
          _id: tempKeyData._id,
          name: tempKeyData.name,
          grade: tempClass,
        });
      }
    }
    return res.json(ret);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/getbyid", async (req, res) => {
  try {
    const { id, grade } = req.body;
    var userCourseData = await User.findById(id)
      .populate(`courses.${grade}.semester1`)
      .populate(`courses.${grade}.semester2`);
    res.send({
      submitted_year: userCourseData.courses[grade],
      note: userCourseData.note,
    });
  } catch (error) {
    console.log(error);
  }
});

//add course to sched
router.post("/add/:courseid/:semesters", auth(), async (req, res) => {
  try {
    const { year, semester } = req.body;
    const { requester } = res.locals;

    const user = await User.findOne({
      msId: requester.user.localAccountId,
    });

    if (req.params.semesters === "2") {
      user.courses[year]["semester1"].push(req.params.courseid);
      user.courses[year]["semester2"].push(req.params.courseid);
    } else {
      user.courses[year][semester].push(req.params.courseid);
    }

    user.save();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

//delete course from sched
router.post("/remove/:courseid", auth(), async (req, res) => {
  try {
    const { year, semester } = req.body;
    const { requester } = res.locals;

    const user = await User.findOne({
      msId: requester.user.localAccountId,
    });
    user.courses[year][semester].splice(
      user.courses[year][semester].indexOf(req.params.courseid),
      1
    );
    user.save();
    return res.send(user);
  } catch (error) {
    return res.send(error);
  }
});

//get notes
router.post("/notes", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    const user = await User.findOne({
      msId: requester.user.localAccountId,
    });
    return res.send(user.note);
  } catch (error) {
    return console.log(error);
  }
});

//update notes
router.post("/savenotes", auth(), async (req, res) => {
  try {
    const { requester } = res.locals;
    const user = await User.findOne({
      msId: requester.user.localAccountId,
    });
    var { notes } = req.body;

    user.note = notes;
    if (!user.note || user.note === "" || user.note === " ") {
      user.note = "none";
    }

    user.save();
    return res.send(user.note);
  } catch (error) {
    return console.log(error);
  }
});

module.exports = router;
