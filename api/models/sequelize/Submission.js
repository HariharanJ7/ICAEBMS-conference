import { DataTypes } from 'sequelize';
import { sequelize } from './index.js';

export const Submission = sequelize.define('Submission', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  abstract: { type: DataTypes.TEXT, allowNull: false },
  track: {
    type: DataTypes.ENUM(
      'Applied Science',
      'Engineering & Technological Advancements',
      'Education & Pedagogical Innovations',
      'Business & Management Studies',
      'Social Science and Humanities',
      'Finance, Accountancy and Marketing'
    ),
    allowNull: false
  },
  authorName: { type: DataTypes.STRING, allowNull: false },
  authorEmail: { type: DataTypes.STRING, allowNull: false },
  filePath: { type: DataTypes.STRING }, // uploaded file relative path
  status: {
    type: DataTypes.ENUM('submitted', 'under_review', 'accepted', 'rejected'),
    defaultValue: 'submitted'
  }
});
