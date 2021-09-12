const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();


// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});