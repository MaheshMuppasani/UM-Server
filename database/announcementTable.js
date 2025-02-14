import pool from './database.js';

export async function getAnnouncementsBySectionID(sectionID) {
    const [rows] = await pool.query(`
            SELECT f.Faculty_ID, CONCAT_WS(' ', f.LastName, f.FirstName) as FacultyName, an.announcementID, an.sectionID, an.announcementTitle, an.announcementContent, an.postedON, an.postedBy
            FROM Announcement an
            inner join Faculty f on f.Faculty_ID = an.postedBy
            where an.sectionID = ?
            order by an.postedON DESC`, [sectionID])
    return rows; 
}

export async function getAnnouncementByID(id) {
    const [rows] = await pool.query(`
            SELECT f.Faculty_ID, CONCAT_WS(' ', f.LastName, f.FirstName) as FacultyName, an.announcementID, an.sectionID, an.announcementTitle, an.announcementContent, an.postedON, an.postedBy
            FROM Announcement an
            inner join Faculty f on f.Faculty_ID = an.postedBy
            where an.announcementID = ?
        `, [id]);
    return rows;
}

export async function postNewAnnouncement(params) {
    const columns = Object.keys(params);
    const [result] = await pool.query(`
            INSERT INTO Announcement (${columns.join(',')})
            VALUES (${Array(columns.length).fill('?').join(',')})
            `, [...Object.values(params)]);
    return getAnnouncementByID(result.insertId);
}