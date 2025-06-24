// app/api/sendmail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nombre, email, telefono, mensaje } = data;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const emailContent = `
      Nuevo mensaje de contacto:
      Nombre: ${nombre}
      Email: ${email}
      Teléfono: ${telefono || 'No proporcionado'}
      Mensaje:
      ${mensaje}
    `;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #6525a0;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;">
        <h3 style="color: #333;">Mensaje:</h3>
        <p>${mensaje.replace(/\n/g, '<br>')}</p>
      </div>
    `;

    // Log de debug para ver las variables de entorno (sin mostrar la contraseña completa)
    console.log('Intentando enviar correo con las siguientes configuraciones:');
    console.log('HOST:', process.env.EMAIL_HOST);
    console.log('PORT:', process.env.EMAIL_PORT);
    console.log('USER:', process.env.EMAIL_USER);
    console.log('PASS:', process.env.EMAIL_PASS ? '********' : 'No definido');

    try {
      // Configurar el transportador con las variables de entorno
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'embdevs.com', // Valor por defecto
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || 'info@embdevs.com',
          pass: process.env.EMAIL_PASS, // No hay valor por defecto para la contraseña
        },
        tls: {
          // No rechazar certificados no válidos (útil en desarrollo)
          rejectUnauthorized: false
        }
      });

      // Definir las opciones de correo
      const mailOptions = {
        from: `"EMB Devs" <${process.env.EMAIL_USER || 'info@embdevs.com'}>`,
        to: 'info@embdevs.com',
        subject: 'Nuevo mensaje desde la web',
        text: emailContent,
        html: htmlContent,
        replyTo: email // Para poder responder directamente al remitente
      };

      console.log('Enviando correo a:', mailOptions.to);
      
      // Intentar enviar el correo
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado con éxito:', info.messageId);

      return NextResponse.json({ message: 'Correo enviado correctamente', id: info.messageId }, { status: 200 });
    } catch (smtpError: any) {
      console.error('Error SMTP específico:', smtpError.message);
      console.error('Código de error:', smtpError.code);
      console.error('Comando:', smtpError.command);
      
      // Siempre devolver un JSON válido con detalles del error
      return NextResponse.json({ 
        error: 'Error al enviar correo mediante SMTP', 
        details: smtpError.message,
        code: smtpError.code || 'unknown',
        command: smtpError.command || 'unknown'
      }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Error general en la API route:', error);
    
    // Asegurarnos de que el objeto error sea serializable a JSON
    // y que siempre devolvamos una respuesta JSON válida
    return NextResponse.json(
      { 
        error: 'Error en el servidor al procesar la solicitud',
        message: error?.message || 'Error desconocido', 
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}
