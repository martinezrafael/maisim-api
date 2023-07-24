require("dotenv").config();
const Sequelize = require("sequelize");

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

if (!dbName || !dbUser || !password || !dbHost) {
  console.error("Erro de configuração: Verifique as variáveis de ambiente.");
  process.exit(1);
}

const sequelize = new Sequelize(dbName, dbUser, password, {
  host: dbHost,
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: true,
      port: 1433,
      connectTimeout: 60000,
    },
  },
  pool: {
    max: 10, // Número máximo de conexões no pool
    min: 0, // Número mínimo de conexões no pool
    acquire: 30000, // Tempo máximo, em milissegundos, para obter uma conexão do pool
    idle: 10000, // Tempo máximo, em milissegundos, para uma conexão ficar inativa no pool
  },
});

// Testa a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados bem-sucedida.");
  })
  .catch((err) => {
    console.error("Erro ao conectar-se ao banco de dados:", err);
    process.exit(1);
  });

module.exports = sequelize;
