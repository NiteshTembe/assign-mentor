import { client } from "./index.js";

//-----------------MongoDB queries for Mentors Collection------------------
export async function getAllMentors(req) {
    return await client.db("assign-mentors").collection("mentors").find().toArray();
}
export async function getMentorById(id) {
    return await client.db("assign-mentors").collection("mentors").findOne({ mentor_id: id });
}
export async function getAllStudentsForMentor(id) {
    return await client.db("assign-mentors").collection("students").find({ mentor_id: id }).toArray();
}
export async function addMentor(newMentor) {
return await client.db("assign-mentors").collection("mentors").insertMany(newMentor);
}
export async function assignStudentToMentor(id,studentArray) {
    return (await client.db("assign-mentors").collection("students")
    .updateMany({ 
        $and: [
            { mentor_id: { $eq: null } },
            { student_id: {
                $in: studentArray
            } }
         ]
         }, { $set: {mentor_id:id} }));
}



export async function updateMentorById(id, updateMentor) {
return await client
    .db("assign-mentors")
    .collection("mentors")
    .updateOne({ mentor_id: id }, { $set: updateMentor });
}

//-----------------MongoDB queries for Students Collection------------------
export async function getAllStudents(req) {
    return await client.db("assign-mentors").collection("students").find().toArray();
}
export async function getStudentById(id) {
    return await client.db("assign-mentors").collection("students").findOne({ student_id: id });
}
export async function addStudent(newStudent) {
return await client.db("assign-mentors").collection("students").insertMany(newStudent);
}
export async function deletetStudentById(id) {
return await client.db("assign-mentors").collection("students").deleteOne({ student_id: id });
}
export async function updateStudentById(id, updateStudent) {
return await client
    .db("assign-mentors")
    .collection("students")
    .updateOne({ student_id: id }, { $set: updateStudent });
}