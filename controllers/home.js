// const nodeMail = require("nodemailer")

module.exports = {
    getIndex: (req, res) => {
        const paginatedResults = res.paginatedResults;
        res.render('index.ejs', {paginatedResults: paginatedResults});
    },
    getAbout: (req, res) => {
        res.render('about.ejs');
    },
    getContact: (req, res) => {
        res.render('contact.ejs')
    },
    postContact: async (req, res) => {
        const nodeMail = require('nodemailer')
        const {name, email, message} = req.body;
        try {
            await mainMail(name, email, message);
            res.render('about.ejs')
        } catch(err) {
            res.render('about.ejs')
        }

        async function mainMail(name, email, message) {
            const transporter = await nodeMail.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PASSWORD
                }
            })
            const mailOption = {
                from: email,
                to: process.env.GMAIL_USER,
                subject: `Blog contact from ${name}`,
                html: `You got a message from
                <p><strong>Email</strong>:<br>${email}</p>
                <p><strong>Name</strong>:<br>${name} </p>
                <p><strong>Message</strong>:<br>${message}</p>`,
            }
            try {
                await transporter.sendMail(mailOption);
                return Promise.resolve("Message sent succesfully!");
            } catch (err) {
                console.log(err)
                return Promise.reject(err);
            }
        }
    }
}