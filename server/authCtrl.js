const bcrypt = require("bcryptjs");

module.exports = {
  /*
    1. db call to check if user exist -> send stop message if so
    2. gen salt and hash
    3. if user no exists, create them in user table of db
    4. put user data on session
    5.send back user data/info
    */
  register: async (req, res) => {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const accountArr = await db.find_acc_by_email([email]); // selecting first item of array which is $1 in db find_acc file; will return either array of 1 if exists or 0 if doesn't exist
    if (accountArr[0]) {
      // if email is found aka there's a value in Arr[0]
      return res.status(200).send({ message: `Email already in use dog.` });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    let newAccArr = await db.create_acc([email, hash]);
    // console.log('test')
    req.session.user = {
      email: accountArr[0].acc_email,
      id: accountArr[0].acc_id
    };
    res.status(200).send({
      message: "logged in",
      userData: req.session.user,
      loggedIn: true
    });
  },
  async login(req, res) {
    const { email, password } = req.body;
    const db = req.app.get("db");
    const accountArr = await db.find_acc_by_email([email]);
    if (!accountArr[0]) {
      return res.status(200).send({ message: `No account found.` });
    }
    const result = bcrypt.compareSync(password, accountArr[0].acc_hash); // compares password to hash and returns true if same, else false
    if (result === false) {
      return res.status(401).send({ message: `Incorrect password.` });
    }
    req.session.user = {
      email: accountArr[0].acc_email,
      id: accountArr[0].acc_id
    };
    res.status(200).send({ message: `Login successful!`, loggedIn: true });
  },
  userData(req, res) {
    if (req.session.user) res.status(200).send(req.session.user);
    else res.status(401).send("Please log in");
  }
};
