import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // El nombre que se mostrará en el formulario de inicio de sesión (por ejemplo, "Iniciar sesión con...")
      name: "Credenciales",
      // `credentials` se utiliza para generar un formulario en la página de inicio de sesión.
      // Puedes especificar qué campos deben enviarse agregando claves al objeto `credentials`.
      // Por ejemplo, dominio, nombre de usuario, contraseña, token de 2FA, etc.
      // Puedes pasar cualquier atributo HTML a la etiqueta <input> a través del objeto.
      credentials: {
        username: { label: "Nombre de usuario", type: "text", placeholder: "jsmith" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        // Agrega lógica aquí para buscar al usuario según las credenciales proporcionadas
        const res = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (user) {
          // Cualquier objeto devuelto se guardará en la propiedad `user` del JWT
          return user;
        } else {
          // Si devuelves null, se mostrará un error y se le pedirá al usuario que verifique sus detalles.
          return null;

          // También puedes rechazar esta devolución de llamada con un Error, lo que enviará al usuario a la página de error con el mensaje de error como parámetro de consulta.
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
