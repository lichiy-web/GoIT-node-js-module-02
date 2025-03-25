import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();

  res.status(200).json({
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  if (studentId.length !== 24) throw createHttpError(404, 'Student not found');
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json({
    data: student,
  });
};

export const createStudentController = async (req, res, next) => {
  const student = await createStudent(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const deleteStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  if (studentId.length !== 24) throw createHttpError(404, 'Student not found');

  const student = await deleteStudent(studentId);
  console.log(`deleteStudentController: student = `, student);

  if (!student) {
    throw createHttpError(404, 'Student not found');
  }

  res.status(204).json({
    status: 204,
    message: `Successfully deleted a student!`,
    data: student,
  });
};

export const upsertStudentController = async (req, res, next) => {
  const { studentId } = req.params;

  const result = await updateStudent(studentId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a student!`,
    data: result.student,
  });
};

export const patchStudentController = async (req, res, next) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
