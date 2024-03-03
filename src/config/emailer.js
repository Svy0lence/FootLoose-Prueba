import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "jordan009002@gmail.com",
      pass: "hlnj zpbl itgj unpt",
    },
  });

export const sendEmail = async (destinatario, idProducto, antiguoPrecio, nuevoPrecio) => {

    const asunto = 'Actualización de Precio';
    const mensaje = `El precio del producto con codigo ${idProducto} se ha actualizado de ${antiguoPrecio} precio a ${nuevoPrecio}.`;

    const html = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
            <h2 style="color: #333;">${asunto}</h2>
            <p style="margin-bottom: 20px;">${mensaje}</p>
            <p style="font-weight: bold; color: green;">Antiguo Precio: ${antiguoPrecio}</p>
            <p style="font-weight: bold; color: green;">Nuevo Precio: ${nuevoPrecio}</p>
        </div>`;

    const mailOptions = {
        from: 'jordan009002@gmail.com',
        to: destinatario,
        subject: asunto,
        text: mensaje,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
};

