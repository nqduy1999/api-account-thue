require('dotenv').config()
const client = require('twilio')(process.env.ACCOUNT_SID_TWILIO, process.env.AUTH_TOKEN_TWILIO);
/**
 * method to send smst verify otp
 */
const sendSmsOTP = async (phone) => {
  console.log(process.env.ACCOUNT_SID_TWILIO);
  try {
    const verification = await client.verify.services(process.env.SERVICE_ID_TWILIO)
      .verifications
      .create({ to: `+84${phone}`, channel: 'sms' })
    if (verification) return true
    else return false
  } catch (error) {
    return false
  }
}

const verifyOtp = async (phone, code) => {
  try {
    // eslint-disable-next-line 
    const verification_check = await client.verify.services(process.env.SERVICE_ID_TWILIO)
      .verificationChecks
      .create({ to: `+84${phone}`, code: code })
    if (verification_check.valid) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.log(error)
    return false
  }
}
module.exports = {
  sendSmsOTP: sendSmsOTP,
  verifyOtp: verifyOtp
}
