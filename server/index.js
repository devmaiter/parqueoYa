const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const moment = require('moment-timezone');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcryptjs");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3002"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "parking",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role; // Get role from request body

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password, role) VALUES (?,?,?)",
      [username, hash, role], // Include role in query
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("User registered successfully");
        }
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.send({ success: false, message: 'Could not log out, please try again' });
    }
    res.clearCookie('sid');
    return res.send({ success: true, message: 'Logged out successfully' });
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            req.session.userId = result[0].id; // Guarda el ID del usuario en la sesión
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


app.post('/regVehiculo', function(request, response) {
  // Get the vehicle details from the request body
  let cedulaPropietario = request.body.cedulaPropietario;
  let placa = request.body.placa;
  let tipoVehiculo = request.body.tipoVehiculo;
  // Get the user's id from the session
  let vigilante_id = request.session.userId;
  // Check that all required details are present
  if (cedulaPropietario && placa && tipoVehiculo && vigilante_id) {
      // Insert the new vehicle into the database
      db.query('INSERT INTO vehiculos (cedulaPropietario, placa, tipoVehiculo, vigilante_id) VALUES (?, ?, ?, ?)', [cedulaPropietario, placa, tipoVehiculo, vigilante_id], function(error, results, fields) {
          if (error) throw error;
          // Check if the vehicle was registered successfully
          if (results.affectedRows > 0) {
              response.send('Vehiculo registrado exitosamente!');
          } else {
              response.send('Hubo un problema al registrar el vehiculo.');
          }			
          response.end();
      });
  } else {
      // If any details are missing, send an error message
      response.send('Por favor ingresa la placa, el tipo de vehiculo, la cedula y el id del vigilante!');
      response.end();
  }
});

app.get('/userId', function(req, res) {
  // Check if the user is logged in
  if (req.session.userId) {
      // Send the user's id
      res.send({ userId: req.session.userId });
  } else {
      // If the user is not logged in, send an error message
      res.status(401).send({ message: 'No estás conectado' });
  }
});

app.get('/getAllNumParqueadero', function(request, response) {
  db.query('SELECT numParqueadero, disponibilidad FROM parqueaderos', function(error, results, fields) {
      if (error) throw error;
      response.send(results);
  });
});

app.post('/updateEntrada', function(request, response) {
  // Get the vehicle's plate and parking number from the request body
  let placa = request.body.placa;
  let numParqueadero = request.body.numParqueadero;

  if (placa && numParqueadero) {
      // Get the current date and time in the 'America/Bogota' timezone
      let entrada = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

      // Update the 'entrada' and 'numParqueadero' columns for the specified vehicle
      db.query('UPDATE vehiculos SET entrada = ?, numParqueadero = ? WHERE placa = ?', [entrada, numParqueadero, placa], function(error, results, fields) {
          if (error) throw error;
          // Check if the update was successful
          if (results.affectedRows > 0) {
              // If the update was successful, update the parking availability
              db.query('UPDATE parqueaderos SET disponibilidad = 0 WHERE numParqueadero = ?', [numParqueadero], function(error, results, fields) {
                  if (error) throw error;
                  // Check if the update was successful
                  if (results.affectedRows > 0) {
                      response.json({ message: 'Entrada, parqueadero y disponibilidad de parqueadero actualizadas exitosamente!' });
                  } else {
                      response.json({ message: 'Hubo un problema al actualizar la disponibilidad del parqueadero.' });
                  }
                  response.end();
              });
          } else {
              response.json({ message: 'Placa no registrada' });
              response.end();
          }			
      });
  } else {
      // If the vehicle's plate or parking number is missing, send an error message
      response.json({ message: 'Por favor ingresa la placa del vehiculo y el número de parqueadero!' });
      response.end();
  }
});

app.post('/Salida', function(request, response) {
  // Get the vehicle's plate and parking number from the request body
  let placa = request.body.placa;
  let numParqueadero = request.body.numParqueadero;

  if (placa && numParqueadero) {
      // Get the current date and time in the 'America/Bogota' timezone
      let entrada = moment().tz('America/Bogota').format('YYYY-MM-DD HH:mm:ss');

      // Update the 'entrada' column for the specified vehicle
      db.query('UPDATE vehiculos SET salida = ? WHERE placa = ?', [entrada, placa], function(error, results, fields) {
          if (error) throw error;
          // Check if the update was successful
          if (results.affectedRows > 0) {
              // If the update was successful, update the parking availability
              db.query('UPDATE parqueaderos SET disponibilidad = 1 WHERE numParqueadero = ?', [numParqueadero], function(error, results, fields) {
                  if (error) throw error;
                  // Check if the update was successful
                  if (results.affectedRows > 0) {
                      response.send('Entrada y disponibilidad de parqueadero actualizadas exitosamente!');
                  } else {
                      response.send('Hubo un problema al actualizar la disponibilidad del parqueadero.');
                  }
                  response.end();
              });
          } else {
              response.send('Hubo un problema al actualizar la entrada.');
              response.end();
          }			
      });
  } else {
      // If the vehicle's plate or parking number is missing, send an error message
      response.send('Por favor ingresa la placa del vehiculo y el número de parqueadero!');
      response.end();
  }
});


app.get('/vehiculos', function(request, response) {
  db.query('SELECT * FROM vehiculos', function(error, results, fields) {
      if (error) throw error;
      response.send(results);
  });
});
app.get('/getAvailableParkings', function(request, response) {
  db.query('SELECT numParqueadero FROM parqueaderos WHERE disponibilidad = 1', function(error, results, fields) {
      if (error) throw error;
      response.send(results);
  });
});

app.listen(3001, () => {
  console.log("running server");
});
