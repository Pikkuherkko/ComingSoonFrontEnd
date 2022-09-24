import { emails } from "../../../data/emails";

export default function handler(req, res) {
  const { emailId } = req.query;

  if (req.method === "GET") {
    const email = emails.find((email) => email.id === parseInt(emailId));
    res.status(200).json(email);
  } else if (req.method === "DELETE") {
    const deletedEmail = emails.find((email) => email.id === parseInt(emailId));
    const index = emails.findIndex((email) => email.id === parseInt(emailId));
    emails.splice(index, 1); // removes 1 element from list starting from index id

    res.status(200).json(deletedEmail);
  }
}
