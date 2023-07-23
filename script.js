import { Login } from "./login.js";
import { Cxmsg } from "../aula135/cxmsg.js";

const callback_ok = (nome) => {
  const config = {
    cor: "#433",
    tipo: "ok",
  };
  Cxmsg.mostrar(config, "Sucesso!", `Seja bem vindo ${nome}`);
};

const callback_not = () => {
  const config = {
    cor: "#488",
    tipo: "ok",
  };
  Cxmsg.mostrar(config, "Login", "Usuário ou senha incorretos!");
};

const configLogin = {
  cor: "488",
  img: "jpg.jpg",
  endpoint: "https://loginv1.sonleco.repl.co",
};
Login.login(callback_ok, callback_not, configLogin);
