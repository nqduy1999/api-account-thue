const MailTemplate = (url) => {
    `
    <div>
    <a href=${url} style="background: crimson; text-decoration:none; color:white; padding: 10px 20px"/>
    <p>If the doesn't work for any reason, you can also click on the link below:</p>
    <div>
    ${url}
    </div>
    </div>
    `
}

module.exports = MailTemplate;