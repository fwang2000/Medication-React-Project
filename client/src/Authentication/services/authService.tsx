class AuthService {

    login(username: string, password: string) {

        return fetch("/login", {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            username: username,
            password: password
          })
        }).then(async response => {

          const resJson = await response.json();

          if (resJson.accessToken) {
            
                localStorage.setItem("user", resJson);

          } else {

            if (!response.ok) {

                const error = (resJson && resJson.message) || response.status;
                return Promise.reject(error);

            } else {

                return Promise.reject("Missing Token");
            }
          }

          return response.body;

        });
    }

    logout() {

        localStorage.removeItem("user");
    }

    register(username: string, password: string) {

        return fetch("/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              username: username,
              password: password
            })
        }).then(async response => {

          const resJson = await response.json();

          if (!response.ok) {

              const error = (resJson && resJson.message) || response.status;
              return Promise.reject(error);
  
          }

          return response.body;
          
        });
    }

    getCurrentUser() {

        const userString = localStorage.getItem("user");
        if (userString) return JSON.parse(userString);

        return null;
    }
}

export default new AuthService();