"use strict"

const express = require('express')
let router = express.Router()

const db = require('../db')

// Get data for specific user
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const user = db.users.find(u => u.id == userId)

    if (!user) return res.json({ ok: false })

    const userInfo = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
        gender: user.gender,
        picture: user.picture,
        location: user.location,
        table: user.table,
        session: {
            participantCount: db.users.length,
            active: db.session.active,
            completed: db.session.completed,
            current: db.session.current,
            max: db.session.max
        },
        time: {
            minutes: db.session.time.minutes,
            seconds: db.session.time.seconds
        }
    }

    return res.json({ ok: true, result: userInfo })
})

module.exports = router