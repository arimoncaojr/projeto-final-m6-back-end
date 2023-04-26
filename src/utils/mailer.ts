import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendResetPasswordEmail = async (
  userEmail: string,
  resetToken: string
) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Recuperação de senha",
    text: `Você está recebendo este e-mail porque você solicitou a recuperação da senha de sua conta.
Por favor, clique no link abaixo ou cole-o em seu navegador para concluir o processo:
http://${process.env.PGHOST}:3001/resetpassword/${resetToken}
Se você não solicitou isso, por favor ignore este e-mail e sua senha permanecerá inalterada.`,
  };

  await transporter.sendMail(mailOptions);
};
