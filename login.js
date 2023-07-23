class Login {
  static logado = false;
  static matlogado = null;
  static nomelogado = null;
  static acessologado = null;
  static estilocss = null;
  static callback_ok = null;
  static callback_not = null;
  static config = {
    cor: null, //488
    img: null,
    endpoint: null, // "https://loginv1.sonleco.repl.co/"
  };

  static login = (callback_ok, callback_not, config = null) => {
    if (config != null) this.config = config;
    this.callback_ok = () => {
      callback_ok();
    };
    this.callback_not = () => {
      callback_not();
    };
    // this.endpoint += `?matricula=${this.mat}&senha=${this.pas}`;
    this.estilocss = `.fundoLogin{display:flex;justify-content:center;align-items:center;width:100%;height:100vh;position:absolute;top:0px;left:0px;background-color:rgba(0,0,0,0.75);box-sizing:border-box;}.baseLogin{display:flex;justify-content:flex-start;align-items:stretch;width:500px;box-sizing:inherit;}.elementosLogin{display:flex;justify-content:center;align-items:flex-start;flex-direction:column;width:250px;background-color:#eee;padding:10px;border-radius:10px 0px 0px 10px;box-sizing:inherit;}.logoLogin{display:flex;justify-content:center;align-items:center;width:250px;background-color:#000;padding:10px;border-radius:0px 10px 10px 0px;box-sizing:inherit;}.logoLogin img{width:90%;box-sizing:inherit;}.campoLogin{display:flex;justify-content:flex-start;align-items:flex-start;flex-direction:column;box-sizing:inherit;margin-bottom:10px;}.campoLogin label{font-size:18px;width:100%;}.campoLogin input{width:100%;font-size:18px;padding:5px;background-color:#fff;border-radius:5px;}.botoesLogin{display:flex;justify-content:space-around;align-items:center;width:100%;box-sizing:inherit;}.botoesLogin button{cursor:pointer;background-color:#${this.config.cor};color:#fff;border-radius:5px;padding:10px;width:80px;box-sizing:inherit;}`;

    const styleEstilo = document.createElement("style");
    styleEstilo.setAttribute("id", "id_estiloLogin");
    styleEstilo.setAttribute("rel", "stylesheet");
    styleEstilo.setAttribute("type", "text/css");
    styleEstilo.innerHTML = this.estilocss;
    document.head.appendChild(styleEstilo);

    const fundoLogin = document.createElement("div");
    fundoLogin.setAttribute("id", "fundoLogin");
    fundoLogin.setAttribute("class", "fundoLogin");
    document.body.prepend(fundoLogin);

    // Base de todo login
    const baseLogin = document.createElement("div");
    baseLogin.setAttribute("id", "baseLogin");
    baseLogin.setAttribute("class", "baseLogin");
    fundoLogin.appendChild(baseLogin);

    //  Elementos somente do Login usuario e senha
    const elementosLogin = document.createElement("div");
    elementosLogin.setAttribute("id", "elementosLogin");
    elementosLogin.setAttribute("class", "elementosLogin");
    baseLogin.appendChild(elementosLogin);

    // Campo usuario
    const campoLoginUsername = document.createElement("div");
    campoLoginUsername.setAttribute("class", "campoLogin");
    elementosLogin.appendChild(campoLoginUsername);

    const labelUsername = document.createElement("label");
    labelUsername.innerHTML = "Username";
    campoLoginUsername.appendChild(labelUsername);

    const inputUsername = document.createElement("input");
    inputUsername.setAttribute("id", "f_username");
    inputUsername.setAttribute("type", "text");
    inputUsername.setAttribute("name", "f_username");
    campoLoginUsername.appendChild(inputUsername);

    // Campo senha
    const campoLoginPass = document.createElement("div");
    campoLoginPass.setAttribute("class", "campoLogin");
    elementosLogin.appendChild(campoLoginPass);

    const labelPass = document.createElement("label");
    labelPass.innerHTML = "Senha";
    campoLoginPass.appendChild(labelPass);

    const inputPass = document.createElement("input");
    inputPass.setAttribute("id", "f_senha");
    inputPass.setAttribute("type", "password");
    inputPass.setAttribute("name", "f_senha");
    campoLoginPass.appendChild(inputPass);

    // Campo Botoes
    const botoesLogin = document.createElement("div");
    botoesLogin.setAttribute("class", "botoesLogin");
    elementosLogin.appendChild(botoesLogin);

    // Botao login
    const btn_login = document.createElement("button");
    btn_login.setAttribute("id", "btn_login");
    btn_login.innerHTML = "Login";
    btn_login.addEventListener("click", (evt) => {
      this.verifiLogin();
    });
    botoesLogin.appendChild(btn_login);

    // Botao Cancelar
    const btn_cancelar = document.createElement("button");
    btn_cancelar.setAttribute("id", "btn_cancelar");
    btn_cancelar.innerHTML = "Cancelar";
    btn_cancelar.addEventListener("click", (evt) => {
      this.fechar();
    });
    botoesLogin.appendChild(btn_cancelar);

    // Imagem login
    const logoLogin = document.createElement("div");
    logoLogin.setAttribute("id", "logoLogin");
    logoLogin.setAttribute("class", "logoLogin");
    baseLogin.appendChild(logoLogin);

    // src da IMG
    const img = document.createElement("img");
    img.setAttribute("src", `${this.config.img}`);
    img.setAttribute("title", "WAIX");
    logoLogin.appendChild(img);
  };

  static verifiLogin = () => {
    const mat = document.querySelector("#f_username").value;
    const pass = document.querySelector("#f_senha").value;

    const endpoint = `${this.config.endpoint}/?matricula=${mat}&senha=${pass}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          sessionStorage.setItem("logado", "true");
          sessionStorage.setItem("matlogado", mat);
          sessionStorage.setItem("nomelogado", res.nome);
          sessionStorage.setItem("acessologado", res.acesso);
          this.callback_ok();
          this.fechar();
        } else {
          sessionStorage.setItem("logado", "false");
          sessionStorage.setItem("matlogado", "");
          sessionStorage.setItem("nomelogado", "");
          sessionStorage.setItem("acessologado", "");
          this.callback_not();
        }
      });
  };

  static fechar = () => {
    const fundoLogin = document.querySelector("#fundoLogin");
    fundoLogin.remove();
    const id_estiloLogin = document.querySelector("#id_estiloLogin");
    id_estiloLogin.remove();
  };
}
