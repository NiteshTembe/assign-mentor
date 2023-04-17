import express from "express";
import {
   getAllMentors,
  getMentorById,
  // deleteBookById,
  addMentor,
  updateMentorById,
  getAllStudentsForMentor,
  assignStudentToMentor,
} from "../helper.js";
const router = express.Router();

//get all mentors

router.get("/", async (req, res) => {
  const mentor = await getAllMentors();
  res.send(mentor);
});

//get mentors by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const mentor = await getMentorById(id);
  mentor ? res.send(mentor) : res.status(404).send({ message: "No Mentor found" });
});

//Show all Students For particular Mentor id

router.get("/:id/students", async (req, res) => {
  const { id } = req.params;
  const query = await getAllStudentsForMentor(id);
  console.log(query)
  query.length ? res.send(query) : res.status(404).send({ message: "No Students Assigned" });
});

//Assigned multiple Students to particular Mentor by id
router.put("/:id/students", async (req, res) => {
  const { id } = req.params;
  const studentsArray = req.body;
  const result = await assignStudentToMentor(id,studentsArray);
  res.send(result);
});


//Add New Mentor data

router.post("/", async (req, res) => {
  const newMentor = req.body;
  console.log(req.body);
  const result = await addMentor(newMentor);
  res.send(result);
});

// update the Mentor Data

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateMentor = req.body;
  const result = await updateMentorById(id, updateMentor);
  res.send(result);
});

export const mentorsRouter = router;
