import { NextPage } from "next";
import Link from "next/link";

const Clients: NextPage = () => {
  const clients = [
    { id: "richard", name: "Richard" },
    {
      id: "john",
      name: "John",
    },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
