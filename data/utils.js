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

export default {
    loadSqlQueries,
    timeDifference
}