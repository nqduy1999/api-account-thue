require('dotenv').config()
const configTwilio = require('../utils/configTwilio');
const client = require('twilio')(configTwilio.accountSID, configTwilio.authToken);
/**
 * method to send smst verify otp
 */
const sendSmsOTP = async (phone) => {
  try {
    const verification = await client.verify.services(configTwilio.serviceID)
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
    const verification_check = await client.verify.services(configTwilio.serviceID)
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
