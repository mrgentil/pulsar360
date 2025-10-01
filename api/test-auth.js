// Script de test pour vérifier l'authentification
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3001/api';

async function testAuth() {
  try {
    // 1. Créer un utilisateur de test
    console.log('🔍 Création utilisateur de test...');
    const registerResponse = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@pulsar360.com',
        password: 'TestPassword123!',
        name: 'Test User'
      })
    });
    
    const registerData = await registerResponse.json();
    console.log('📝 Inscription:', registerData);
    
    // 2. Simuler la vérification d'email (en dev, on peut directement mettre isEmailVerified = true)
    // Pour l'instant, on va essayer de se connecter directement
    
    // 3. Se connecter
    console.log('🔍 Connexion...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@pulsar360.com',
        password: 'TestPassword123!'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('🔑 Connexion:', loginData);
    
    if (loginData.token) {
      // 4. Tester la création d'une marque
      console.log('🔍 Test création marque...');
      const brandResponse = await fetch(`${API_BASE}/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${loginData.token}`
        },
        body: JSON.stringify({
          name: 'Test Brand',
          slug: 'test-brand',
          description: 'Une marque de test',
          primaryColor: '#3b82f6',
          secondaryColor: '#10b981'
        })
      });
      
      const brandData = await brandResponse.json();
      console.log('🏢 Création marque:', brandData);
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testAuth();
