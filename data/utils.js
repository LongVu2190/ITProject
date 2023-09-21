import fs from 'fs-extra';
import { join } from 'path';

const loadSqlQueries = async (folderName) => {

    const filePath = join(process.cwd(), 'data/queries', folderName);

    const files = await fs.readdir(filePath);

    // Duyệt hết file đuôi .sql
    const sqlFiles = files.filter(f => f.endsWith('.sql'));
    const queries = {};

    // Duyệt hết files trong thư mục 
    for (const sqlfile of sqlFiles) {
        const query = fs.readFileSync(join(filePath, sqlfile), {encoding: "UTF-8"});
        queries[sqlfile.replace(".sql", "")] = query;
    }

    return queries;
}

function timeDifference(time1, time2) {
    // Convert both times to milliseconds
    var time1 = new Date("1970-01-01 " + time1);
    var time2 = new Date("1970-01-01 " + time2);

    // Calculate the difference in milliseconds
    var diff = Math.abs(time2 - time1);

    // Convert back to hours and minutes
    var hours = Math.floor(diff / 3600000); // 1 Hour = 36000 Milliseconds
    var minutes = Math.floor((diff % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds

    return hours + ":" + minutes;
}

function generateRandomID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    let randomID = '';
  
    // Generate 6 random numbers
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      randomID += numbers[randomIndex];
    }
  
    // Generate 4 random characters
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters[randomIndex];
    }
  
    // Shuffle the characters in the randomID
    randomID = randomID.split('').sort(() => Math.random() - 0.5).join('');
  
    return randomID;
}

export default {
    loadSqlQueries,
    timeDifference,
    generateRandomID
}