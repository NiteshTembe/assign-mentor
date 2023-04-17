import express from "express";
import {
  getAllStudents, getStudentById,
  deletetStudentById,
  addStudent,
  updateStudentById,
  getMentorById,
} from "../helper.js";
const router = express.Router();

//get all students

router.get("/", async (req, res) => {
  const student = await getAllStudents();
  res.send(student);
});

//get student by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);
  student ? res.send(student) : res.status(404).send({ message: "No Student found" });
});

//delete Student by id

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const student = await deletetStudentById(id);
  res.send(student);
});

//Add New Student data

router.post("/", async (req, res) => {
    const newStudent = req.body;
    console.log(req.body);
    const result = await addStudent(newStudent);
    res.send(result);
  });
  
  // update the Student Data
  
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updateStudent = req.body;
    const result = await updateStudentById(id, updateStudent);
    res.send(result);
  });

  // assign mentor to the Student
  
  router.put("/:id/assign-mentor", async (req, res) => {
    const { id } = req.params;
    const {mentor_id} = req.body;
    const student = await getStudentById(id);
    if(student){
      if(student.mentor_id===mentor_id){
        res.status(400).send({"message":"Same Mentor is Already Assigned"});
      }
      else{
        const result = await updateStudentById(id, {mentor_id:mentor_id,previous_mentors_id:student.mentor_id});
        res.send(result);
      }
    }
    else{
      res.status(400).send({"message":"Student ID is Not Present"})
    }
    
  });

  //get previous mentor of student

router.get("/:id/previous-mentor", async (req, res) => {
  const { id } = req.params;
  const student = await getStudentById(id);
  if(student){
    const mentor = await getMentorById(student.previous_mentors_id);
    if(mentor){
      res.send(mentor);
    }
    else{
      res.status(404).send({ message: "No Previous Mentor" });
    }
  }
  else{
    res.status(404).send({ message: "No Student found" });
  }
  
  
});

export const studentsRouter = router;
