import { emails } from "../../../data/emails";

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(emails);
  } else if (req.method === "POST") {
    const email = req.body.email;
    const newEmail = {
      id: Date.now(),
      text: email,
    };
    emails.push(newEmail);
    res.status(201).json(newEmail);
  }
}
