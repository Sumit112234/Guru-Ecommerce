import { Resend } from 'resend';
import { configDotenv } from 'dotenv';
configDotenv();


const resend = new Resend(process.env.Resend_api);


async function sendEmail({sendTo,subject,html}){
    const { data, error } = await resend.emails.send({
        from: 'Guru Electronics <onboarding@resend.dev>',
        to: sendTo,
        subject:subject,
        html: html,
      });
    
      if (error) {
        return console.error({ error });
      }
      console.log({ data });

      return data;

}

export default sendEmail;
