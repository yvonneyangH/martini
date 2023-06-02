const { conn, User } = require('./db');
const express = require('express');
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const path = require('path');

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use('/api/auth', require('./routes/auth'));

app.get('/api/users', async(req, res, next)=> {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    });
    res.send(users);
  }
  catch(ex){
    next(ex);
  }
});

app.listen(port, async()=> {
  try {
    await conn.sync({ force: true });
    console.log(`listening on port ${port}`);
    const [moe, lucy] = await Promise.all([
      User.create({ username: 'moe', password: '123'}),
      User.create({ username: 'lucy', password: '123'})
    ]);
    console.log('seeded');
  }
  catch(ex){
    console.log(ex);
  }
});


