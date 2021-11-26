import { withIronSession } from "next-iron-session";
import { tryLogin } from "./login";

export default withIronSession(
  async (req, res) => {
    if (req.method === "POST") {
      
      const { email, password } = req.body;

      const user = await tryLogin(email, password);
      if (user) {
        await req.session.set("user", { user });
        await req.session.save();
        return user.userType != "Client" ? (user.userType != "Trader" ? res.status(202).send("") : res.status(201).send("")) : res.status(200).send("");
      }

      return res.status(403).send("");
    }
    else if(req.method === "DELETE"){
      await req.session.destroy();
      return res.status(200).send("");
    }

    return res.status(404).send("");
  },
  {
    cookieName: "BTSCOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.NEXT_APPLICATION_SECRET ? process.env.NEXT_APPLICATION_SECRET : "dev",
  }
);