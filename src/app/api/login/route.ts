// Importación de módulos y dependencias
//import { signJwtAccessToken } from "@/lib/jwt";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

// Definición de la interfaz para el cuerpo de la solicitud
interface RequestBody {
  username: string;
  password: string;
}

// Función principal que maneja la solicitud POST
export async function POST(request: Request) {
  // Obtener el cuerpo de la solicitud JSON
  const body: RequestBody = await request.json();

  // Buscar el usuario en la base de datos utilizando el módulo Prisma
  const user = await prisma.user.findFirst({
    where: {
      email: body.username,
    },
  });

  // Verificar si el usuario existe y la contraseña es correcta
  if (user && (await bcrypt.compare(body.password, user.password))) {
    // Si la verificación es exitosa, se crea un token de acceso JWT
    const { password, ...userWithoutPass } = user;
    //const accessToken = signJwtAccessToken(userWithoutPass);

    // Crear un objeto con los datos del usuario y el token de acceso
    const result = {
      ...userWithoutPass,
      //accessToken,
    };

    // Devolver una respuesta JSON con los datos del usuario y el token de acceso
    return new Response(JSON.stringify(result));
  } else {
    // Si la verificación no es exitosa, se devuelve una respuesta JSON nula
    return new Response(JSON.stringify(null));
  }
}