function authorization_server() {
    let login_user = [];

    function login(username, password) {
        if (username == 'demo' && password == 'demo') {
            login_user.push(username);
            return true
        }

        return false
    }

    function islogin() {
        if (login_user.length > 0) {
            return true
        }

        return false
    }

    function logout() {
        login_user = [];
    }

    return {
        login: login,
        islogin: islogin,
        logout: logout
    }
}

let authorization = new authorization_server();

export default authorization;