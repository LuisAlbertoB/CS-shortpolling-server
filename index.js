const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const notificaciones = [
  {id: 1, cuerpo: "tienes una nueva notificacion"},
  {id: 2, cuerpo: "Migue comento tu notificacion"}
];

app.get('/notificaciones', (req, res) => {
  
  res.status(200).json({
    sucess: true,
    notificaciones
  });
});

app.post('/notificaciones', (req, res) => {

  const idNotificacion = notificaciones.length > 0 ?
  notificaciones[notificaciones.length -1].id + 1 : 1;

  const notificacion = {
    id: idNotificacion,
    cuerpo: req.body.cuerpo
  };

  notificaciones.push(notificacion);

  res.json({
    suces:true,
    notificacion
  });
});

app.get('/notificaciones-nuevas', (req, res) => {

  const idLastNoti = parseInt(req.query.idLastNoti, 10);
  const nuevasNotificaciones = notificaciones.filter(notificacion => {
    return notificacion.id > idLastNoti;
  });

  res.status(200).json({
    suces: true,
    notificaciones: nuevasNotificaciones
  });
});

app.listen(3000, () => console.log('server starter on port 3000'));