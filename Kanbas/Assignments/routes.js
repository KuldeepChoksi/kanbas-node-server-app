// Importing the mock database
import db from "../Database/index.js";

export default function AssignmentRoutes(app) {
    // Retrieve all assignments for a specific course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter(a => a.course === cid);
        res.json(assignments);
    });

    // Create a new assignment within a course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body, // expecting fields like title, description, dueDate, etc.
            course: cid,
            _id: new Date().getTime().toString(), // unique identifier for the assignment
        };
        db.assignments.push(newAssignment);
        res.status(201).send(newAssignment);
    });

    // Update an existing assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex(a => a._id === aid);
        if (assignmentIndex !== -1) {
            db.assignments[assignmentIndex] = {
                ...db.assignments[assignmentIndex],
                ...req.body
            };
            res.sendStatus(204); // No Content response
        } else {
            res.sendStatus(404); // Not Found if assignment does not exist
        }
    });

    // Delete an assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const initialLength = db.assignments.length;
        db.assignments = db.assignments.filter(a => a._id !== aid);
        if (db.assignments.length < initialLength) {
            res.sendStatus(200); // OK
        } else {
            res.sendStatus(404); // Not Found if no assignment was deleted
        }
    });
}
