export function resetPasswordTemplate(params: { name: string | null; resetUrl: string }) {
  const { name, resetUrl } = params;
  
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réinitialisation de mot de passe - Pulsar360</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #7C3AED; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 8px; margin: 20px 0; }
        .button { display: inline-block; padding: 12px 24px; background: #7C3AED; color: white; text-decoration: none; border-radius: 6px; font-weight: 500; }
        .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 6px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">Pulsar360</div>
        </div>
        
        <div class="content">
            <h2>Réinitialisation de mot de passe</h2>
            <p>Bonjour${name ? ` ${name}` : ''},</p>
            
            <p>Vous avez demandé la réinitialisation de votre mot de passe pour votre compte Pulsar360.</p>
            
            <p>Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
            
            <p style="text-align: center; margin: 30px 0;">
                <a href="${resetUrl}" class="button">Réinitialiser mon mot de passe</a>
            </p>
            
            <div class="warning">
                <strong>⚠️ Important :</strong>
                <ul>
                    <li>Ce lien expire dans <strong>1 heure</strong></li>
                    <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
                    <li>Ne partagez jamais ce lien avec personne</li>
                </ul>
            </div>
            
            <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
            <p style="word-break: break-all; font-size: 14px; color: #666;">${resetUrl}</p>
        </div>
        
        <div class="footer">
            <p>Cet email a été envoyé par Pulsar360</p>
            <p>Si vous avez des questions, contactez notre support.</p>
        </div>
    </div>
</body>
</html>
  `.trim();
}
