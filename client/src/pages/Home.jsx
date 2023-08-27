import React from "react";

export default function Home() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        Hi ! This is a simple Authetication App
      </h1>
      <p className="mb-4 text-slate-700">
        {" "}
        A MERN stack authentication app typically uses the MERN stack, which
        stands for MongoDB, Express, React, and Node.js. These technologies are
        used to build a full-stack web application with a focus on user
        authentication.{" "}
      </p>

      <ul className="mb-4 text-slate-700 list-disc">
        <li>
          {" "}
          <span className="font-bold">MongoDB</span> is a NoSQL database that
          stores data in a flexible, JSON-like format. It is used to store user
          data, such as usernames and hashed passwords.
        </li>
        <li>
          {" "}
          <span className="font-bold">Express</span> is a web application
          framework for Node.js that provides a robust set of features for
          building web applications. It is used to handle HTTP requests and
          responses, and to define routes for the application.{" "}
        </li>
        <li>
          {" "}
          <span className="font-bold">React</span> is a JavaScript library for
          building user interfaces. It is used to create the front-end of the
          application, including the login and registration forms.{" "}
        </li>
        <li>
          {" "}
          <span className="font-bold">Node.js</span> is a JavaScript runtime
          built on Chrome’s V8 JavaScript engine. It is used to run the
          server-side code of the application.
        </li>
      </ul>

      <p className="mb-4 text-slate-700">
        In a MERN stack authentication app, the user enters their username and
        password into a login form. The data is then sent to the server via an
        HTTP request. The server checks the provided credentials against the
        data stored in the MongoDB database. If the credentials are valid, the
        server generates a session token and sends it back to the client. The
        client can then use this token to authenticate subsequent requests to
        protected routes.
      </p>
    </div>
  );
}
