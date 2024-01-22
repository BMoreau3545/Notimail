const axios = require('axios');

const sendSMS = async (formattedPhoneNumber, message) => {
  try {
    // const formattedPhoneNumber = `+33${phoneNumber.slice(1)}`;
    console.log(formattedPhoneNumber);

    const smsOptions = {
      method: 'POST',
      url: 'https://api.allmysms.com/sms/send',
      headers: {
        'cache-control': 'no-cache',
        'Authorization': `Basic ${process.env.CLE_SMS}`, // Remplacez par votre auth token
        'Content-Type': 'application/json',
      },
      data: {
        from: 'allmysms',
        to: formattedPhoneNumber,
        text: message,
        // Ajoutez d'autres paramètres si nécessaire, comme la date
      },
    };

    const smsResponse = await axios(smsOptions);

    if (smsResponse.data.success) {
      return true;
    } else {
      throw new Error(`Erreur lors de l'envoi du SMS à ${formattedPhoneNumber}: ${smsResponse.data.message}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Erreur lors de l'envoi du SMS: ${error.message}`);
  }
};

module.exports = {
  sendSMS,
};