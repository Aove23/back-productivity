const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const loginRouter = require("express").Router();
const User = require("../models/User");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

loginRouter.get("/:username", async (request, response) => {
  const parametro = request.params;
  const { username } = parametro;
  console.log(username);
  response.json({ exit: username });
});

loginRouter.post("/", async (request, response) => {
  const { body } = request;
  // console.log("BODY", body);
  const { email, password } = body;

  const user = await User.findOne({ email });
  console.log(user);

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    response.status(401).json({
      status: "invalid user or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.json({ email: user.email, token });
});

loginRouter.post("/google", async (request, response) => {
  const { body } = request;
  const flags = { flagRegister:"Register by google", flagLogin: "Login by google and our service" }
  console.log("BODY-GOOGLE-AUTH-REQUEST", body);
  //  response.json({ message: "Recibida", flag: flags.flagRegister });

  try{
    const user = await User.findOne({ email });
    console.log(user);
    if(user){
      console.log('Ya esta registrado, loguea normal y mandar flag para que se loguee con el btn');

      const userForToken = {
      email: user.email,
      id: user._id,
      };

  const token = jwt.sign(userForToken, process.env.SECRET);
  return response
        .status(200)
        .json({message:"ok", data: {userToken: token,  email: user.email, auth: 'google'}, success: flags.flagLogin });
        
    }else{
      console.log('Se registra y loguea');
    }
  }catch(err){
    console.log('ERROR-GOOGLE-AUTH', err)
  }
});

loginRouter.post("/recover-password", async (request, response) => {
  const body = request.body;
  const { email } = body;

  try{

  const user = await User.findOne({ email });
  console.log(user);

  if (!user) {
    response.status(401).json({
      status: "invalid user or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: "120s",
  });

  // Tercer parametro de sign {expiresIn:"120"}
  async function main() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "recover@agustinoweb.com", // generated ethereal user
        pass: "Aoveliz23", // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <recover@agustinoweb.com>', // sender address
      to: `${email}`,
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>Por favor ingrese en este enlace <a href="http://localhost:3001/reset-password/?hash=${token}" target="_blank">Aqui</a></b>`,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  main().catch(console.error);

  console.log(">>>>>>>>>> Entra Peticion");
  response.json({ email: user.email, token });

  } catch(e) {

    console.log('ERROR-RECOVER-SERVICE', e);
  }
});

loginRouter.post("/reset-password", async (request, response) => {
  const body = request.body;
  const { hashToken, newPasss } = body;

  const decodedToken = await jwt.verify(hashToken, process.env.SECRET);
  if (!decodedToken.id || !decodedToken.email) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  console.log("DECODED --->", decodedToken);

  const query = decodedToken.email;
  // console.log(typeof query, query);

  try {
    const user = await User.findOne({ email: query });
    console.log("---> Recupera por Token", user);
    if (!user || !newPasss) {
      return response
        .status(401)
        .json({ error: "Does not have access to change passsword" });
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPasss, saltRounds);
    const updatePasssword = await User.findOneAndUpdate(
      { email: query },
      { passwordHash: newPasswordHash },
      { new: true }
    );

    response.json({ res: updatePasssword });
  } catch (e) {
    console.log(e);
    response.json({ res: e });
  }
});

//Prueba llamada a un servicio externo con node-fetch v2.6.5
// loginRouter.get("/", async (request, response) => {
//   const body = request.body;
//   try {
//     const config = {
//       method: "GET",
//       headers: {
//         "x-rapidapi-host": "free-nba.p.rapidapi.com",
//         "x-rapidapi-key": "7be5c831c5msh06314b923939b63p1b8be8jsnf080565fc9bf",
//       },
//     };
//     const res = await fetch(
//       "https://free-nba.p.rapidapi.com/players?page=0&per_page=5",
//       config
//     );
//     const data = await res.json();
//     console.log("****** Llega Data *******", data);
//     response.json(data);
//   } catch (err) {
//     console.log("****** Error *******", err);
//   }
// });

module.exports = loginRouter;
