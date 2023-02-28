import express from 'express';
import {  body,  validationResult } from 'express-validator';

body('title').isLen