'use strict';

require('dotenv').config();

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const MONGO_URL = process.env.DB_URL;