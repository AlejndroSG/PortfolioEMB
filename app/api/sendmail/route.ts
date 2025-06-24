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

    // Obtener fecha y hora actual en formato español
    const ahora = new Date();
    const fechaHora = ahora.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // ID único para este mensaje (para seguimiento)
    const mensajeId = `EMB-${Date.now().toString().slice(-6)}`;
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nueva solicitud de contacto: ${nombre}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; color: #333;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.08);">
                <!-- Cabecera con logo y color corporativo -->
                <tr>
                  <td style="background-color: #6525a0; padding: 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">EMB Devs</h1>
                    <p style="color: #ffffff; opacity: 0.9; margin: 5px 0 0;">Nueva solicitud de contacto</p>
                  </td>
                </tr>
                
                <!-- Resumen de la solicitud -->
                <tr>
                  <td style="padding: 25px 30px; background-color: #f9f4ff;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <p style="margin: 0; color: #6525a0; font-size: 18px; font-weight: 600;">Información del contacto</p>
                          <p style="margin: 5px 0 0; color: #666; font-size: 14px;">ID: ${mensajeId} | Recibido: ${fechaHora}</p>
                        </td>
                        <td align="right">
                          <!-- Botón de acción rápida (responder) -->
                          <a href="mailto:${email}?subject=Re: Consulta EMB Devs&body=Hola ${nombre},%0D%0A%0D%0AGracias por contactar con EMB Devs." style="background-color: #6525a0; color: white; padding: 8px 15px; text-decoration: none; border-radius: 4px; font-size: 14px; font-weight: 500; display: inline-block;">Responder</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Detalles del contacto -->
                <tr>
                  <td style="padding: 0 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid #eee;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="120" style="color: #888; font-size: 14px; vertical-align: top;">Nombre:</td>
                              <td style="font-weight: 600; font-size: 16px;">${nombre}</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid #eee;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="120" style="color: #888; font-size: 14px; vertical-align: top;">Email:</td>
                              <td>
                                <a href="mailto:${email}" style="color: #6525a0; text-decoration: none; font-weight: 500;">${email}</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid #eee;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="120" style="color: #888; font-size: 14px; vertical-align: top;">Teléfono:</td>
                              <td>
                                ${telefono ? `<a href="tel:${telefono}" style="color: #6525a0; text-decoration: none; font-weight: 500;">${telefono}</a>` : '<span style="color: #999; font-style: italic;">No proporcionado</span>'}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Contenido del mensaje -->
                <tr>
                  <td style="padding: 30px;">
                    <p style="margin: 0 0 10px; font-weight: 600; color: #333; font-size: 18px;">Mensaje del cliente:</p>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 6px; border-left: 4px solid #6525a0;">
                      <p style="margin: 0; line-height: 1.6; white-space: pre-line;">${mensaje.replace(/\n/g, '<br>')}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Metadatos y acciones -->
                <tr>
                  <td style="padding: 0 30px 30px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <p style="color: #888; font-size: 13px; margin: 0;">IP: ${req.headers.get('x-forwarded-for') || 'No disponible'}</p>
                          <p style="color: #888; font-size: 13px; margin: 5px 0 0;">Origen: Formulario web EMB Devs</p>
                        </td>
                        <td align="right">
                          <!-- Etiqueta de prioridad -->
                          <span style="background-color: #FFCA28; color: #333; font-size: 12px; font-weight: 500; padding: 4px 8px; border-radius: 20px;">Nuevo cliente</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px; text-align: center; background-color: #f1f1f1; font-size: 12px; color: #666;">
                    <p style="margin: 0 0 5px;">&copy; ${new Date().getFullYear()} EMB Devs | <a href="https://www.embdevs.com" style="color: #6525a0; text-decoration: none;">www.embdevs.com</a></p>
                    <p style="margin: 0;">Este es un mensaje automático. Por favor, no responda a este correo directamente.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
