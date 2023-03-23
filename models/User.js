import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Create table users
const User = db.define('users', {
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	token: DataTypes.STRING,
	confirmed: DataTypes.BOOLEAN,
});

export default User;
