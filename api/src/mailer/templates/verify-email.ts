export function verifyEmailTemplate(params: {
    name?: string | null;
    verifyUrl: string;
}) {
    const { name, verifyUrl } = params;
    return `
  <!doctype html>
  <html>
    <body style="font-family:Arial,Helvetica,sans-serif;background:#f7f7f8;padding:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;padding:24px;">
        <tr>
          <td>
            <h2 style="margin:0 0 12px 0;color:#111827;">Bienvenue chez Pulsar360${name ? ', ' + name : ''} 👋</h2>
            <p style="color:#374151;line-height:1.5;margin:0 0 16px 0;">
              Confirme ton adresse e-mail pour activer ton compte.
            </p>
            <p style="margin:0 0 24px 0;">
              <a href="${verifyUrl}" style="display:inline-block;background:#111827;color:#fff;text-decoration:none;padding:12px 16px;border-radius:8px;">
                Activer mon compte
              </a>
            </p>
            <p style="color:#6b7280;font-size:12px;margin:0 0 8px 0;">
              Ce lien expire dans 30 minutes. Si tu n’es pas à l’origine de cette inscription, ignore cet e-mail.
            </p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0;">
            <p style="color:#9ca3af;font-size:12px;margin:0;">Pulsar360 — Marketing qui va vite 🚀</p>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}
