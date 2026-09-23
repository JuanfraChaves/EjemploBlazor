# Ejercicio Tareas en Blazor

Ejercicio guiado de 45 minutos para aprender inyección de dependencias en Blazor y ver la
diferencia entre un servicio `Scoped` y uno `Singleton`.

## De qué trata

Los alumnos crean una aplicación Blazor Web App y arman una página con una lista de tareas que
se puede agregar, editar y quitar. La lista vive en un servicio que la página recibe por
inyección de dependencias.

Después comprueban qué pasa con los datos según cómo esté registrado el servicio. Con dos
pestañas del navegador abiertas en la misma página, cambian **una sola palabra** en
`Program.cs` (`AddScoped` por `AddSingleton`) y comparan lo que ve cada pestaña.

## Qué tiene la página

- Encabezado con el título, una descripción y los conceptos que se trabajan.
- **Antes de arrancar:** requisitos y el comando para verificar la versión de .NET.
- **Siete pasos numerados del 0 al 6**, con el código que hay que pegar y los `TODO` (del 1 al 8)
  que el alumno completa.
- **Recuadros** dentro de los pasos: pistas, checkpoints, una regla de oro y preguntas
  «Para pensar».
- **Bitácora** en los pasos 4 y 5, con una tabla para anotar la predicción y lo que pasó.
- **Vuelta extra** opcional para quien termina antes.

## Los pasos

| Paso | Qué hacen los alumnos |
|---|---|
| 0. Crear el proyecto Blazor | Crean un Blazor Web App en Rider (`net9.0`, llamado `LabBlazor`), lo corren y abren `localhost` en el navegador para ver la plantilla. |
| 1. Tu primera página | Crean `Tareas.razor` con `@page "/tareas"`, un título, contenido y un bloque `@code`. |
| 2. El servicio y la entidad | Pegan `TareaServicio.cs`, ya armado: la entidad `Tarea` y el servicio con `Listar`, `Agregar`, `Quitar`, `Editar` y un código de instancia. Compilan con `dotnet build`. |
| 3. Registrar, inyectar y conectar | Registran el servicio en `Program.cs` como `Scoped`, lo inyectan en la página con `@inject` y completan las llamadas para agregar, editar y quitar. Incluye la regla de oro: detener y volver a correr la app al tocar `Program.cs`. |
| 4. Prueba 1: el servicio Scoped | Abren la página en dos pestañas, agregan tareas y recargan con `F5`. Anotan predicciones y resultados en la bitácora. |
| 5. Cambiá una palabra | Cambian `AddScoped` por `AddSingleton`, reinician la app y repiten el experimento. |
| 6. Enlazar la página desde el menú | Agregan una opción en `NavMenu.razor` con un `NavLink` para llegar a la página desde la Home. |

**Vuelta extra:** agregar una property `Hecha` a `Tarea` y un botón para marcar una tarea como
hecha.

## Qué se busca mostrar

Con el servicio `Scoped`, cada pestaña del navegador trabaja con su propia lista y un `F5` la
vacía. Con el servicio `Singleton`, todas las pestañas comparten la misma lista mientras la
aplicación siga corriendo. El código de la página es el mismo en los dos casos: lo único que
cambia es una palabra en `Program.cs`.

## Conceptos que cubre

- Páginas Blazor con `@page` y bloques `@code`
- Interactividad del servidor con `@rendermode InteractiveServer`
- Registro de servicios en `Program.cs` y contenedor de inyección de dependencias
- Inyección en una página con `@inject`
- Vida de un servicio: `Scoped` y `Singleton`
- Menú de navegación con `NavLink`
