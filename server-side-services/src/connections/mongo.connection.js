import mongoose from 'mongoose';
import { config } from '../config/var.config.js';

const getSecodaryConnection = async () => {
    try {
        const connection = mongoose.connect(config.SecondaryDatabase);
        console.log("Secondary database connected successfully")
    } catch (error) {
        console.error("Error occurred while getting secondary connection", error);
    }
}

export default getSecodaryConnection;