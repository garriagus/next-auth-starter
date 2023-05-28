import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";

// Definición de la interfaz para el cuerpo de la solicitud
interface RequestBody {
  name: string;
  email: string;
  password: string;
}

// Función principal que maneja la solicitud POST
export async function POST(request: Request) {
  // Obtener el cuerpo de la solicitud JSON
  const body: RequestBody = await request.json();

  // Crear un nuevo usuario en la base de datos utilizando el módulo Prisma
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
    },
  });

  // Remover la contraseña del objeto de usuario antes de devolver la respuesta
  const { password, ...result } = user;

  // Devolver una respuesta JSON con los datos del usuario
  return new Response(JSON.stringify(result));
}
