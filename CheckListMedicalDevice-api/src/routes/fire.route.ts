import { Request, Response } from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { Model, Op } from "sequelize";
import jwt from "jsonwebtoken";