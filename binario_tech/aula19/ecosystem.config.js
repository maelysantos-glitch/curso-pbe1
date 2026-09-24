module.exports = {
  apps: [
    {
      name: 'aula19',
      script: './server.js', // Ou o arquivo principal da sua aplicação (ex: app.js, server.js)
      
      // Variáveis de ambiente padrão / Desenvolvimento
      env: {
        NODE_ENV: 'development',
        PORT: 3023
      },
      
      // Variáveis de ambiente para Produção
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080
      }
    }
  ]
}; 
