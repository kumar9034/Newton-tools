// import axios from "axios";

// const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
// const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

// export const sendWhatsAppMessage = async (toNumber) => {
//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
//       {
//         messaging_product: "whatsapp",
//         to: toNumber,
//         type: "template",
//         template: {
//           name: "hello_world",
//           language: {
//             code: "en_US"
//           }
//         }
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//           "Content-Type": "application/json"
//         }
//       }
//     );

//     console.log("Message sent:", response.data);
//   } catch (error) {
//     console.log("Error:", error.response.data);
//   }
// };