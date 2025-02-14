import express from 'express';
import { getAnnouncementsBySectionID, postNewAnnouncement } from '../database/announcementTable.js';
const announcement_router = express.Router();

announcement_router.get("/getAllSectionAnnouncements/:sectionID", async(req, res) => {
    const id = req.params.sectionID;
    const sectionAnnouncements = await getAnnouncementsBySectionID(id);
    res.send(sectionAnnouncements);
})

announcement_router.post("/postAnnouncement", async (req, res) => {
    const { sectionID, announcementTitle, announcementContent } = req.body;
    const postedBy = req.user.userID;
    const announcement = await postNewAnnouncement({ sectionID, announcementTitle, announcementContent, postedBy })
    res.status(201).send(announcement);
})

export default announcement_router;
