# Ejercicio Tareas en Blazor

Ejercicio guiado de 60 minutos para aprender inyección de dependencias en Blazor y ver la
diferencia entre un servicio `Scoped` y uno `Singleton`.

La particularidad de esta versión es **cómo se construye la página**: el diseño y el código los
genera una IA a partir de tres prompts, y lo único que los alumnos escriben a mano son las tres
inyecciones.

## De qué trata

Los alumnos crean una aplicación Blazor Web App y arman una página con una lista de tareas que
se puede agregar, editar y quitar. La lista vive en un servicio que la página recibe por
inyección de dependencias.

El flujo es híbrido a propósito:

- **La IA arma** el boceto visual, el markup Razor y el bloque `@code`.
- **Los alumnos escriben** el `using`, el `AddScoped` y el `@inject`. Son tres líneas, pero son
  las que explican toda la arquitectura de la aplicación, y son pregunta de parcial.

Después comprueban qué pasa con los datos según cómo esté registrado el servicio. Con dos
pestañas del navegador abiertas en la misma página, cambian **una sola palabra** en
`Program.cs` (`AddScoped` por `AddSingleton`) y comparan lo que ve cada pestaña.

## Qué tiene la página

- Encabezado con el título, una descripción y los conceptos que se trabajan.
- **Antes de arrancar:** requisitos, el comando para verificar la versión de .NET y una nota de
  qué herramienta de IA sirve.
- **Reparto del trabajo:** qué hace la IA y qué hacen los alumnos, con el motivo de la
  separación.
- **Diez pasos numerados del 0 al 9**, con el tiempo estimado de cada uno.
- **Tres bloques de prompt** con botón para copiar, listos para pegar en cualquier herramienta
  de IA. Los `[ejemplo: …]` que hay que reemplazar antes de mandarlos salen resaltados.
- La **salida esperada** de cada prompt, como bloque de código, para poder comparar con lo que
  devolvió la IA.
- **Recuadros** dentro de los pasos: pistas, checkpoints, una regla de oro, una revisión de lo
  que generó la IA y preguntas «Para pensar».
- **Bitácora** en los pasos 8 y 9, con una tabla para anotar la predicción y lo que pasó.
- **Vuelta extra** opcional para quien termina antes.

## Los pasos

| Paso | Qué hacen los alumnos |
|---|---|
| 0. Crear el proyecto y el servicio | **0A** Blazor Web App en Rider (`net9.0`, llamado `LabBlazor`), lo corren y abren `localhost` para ver la plantilla. **0B** una Class Library `Servicios` con `TareaServicio.cs` ya armado: la entidad `Tarea` y el servicio con `Listar`, `Agregar`, `Quitar`, `Editar` y un código de instancia. Agregan la referencia de proyecto y compilan con `dotnet build`. |
| 1. Las tres piezas de una página | Marco mental previo: markup, `@code` e `@inject`, más `Program.cs` y `NavMenu.razor`. Deja asentado que la página no sabe si el servicio es `Scoped` o `Singleton`. |
| 2. Bocetar con IA | **Prompt 1** (rol de diseño UI/UX, con bloques de Funcionalidad / Elementos / Diseño visual / Resultado esperado) para obtener una **imagen** de la página. |
| 3. Del boceto al markup | **Prompt 2** (frontend Blazor/Razor/Bootstrap) que devuelve **solo** HTML/Razor. Lo pegan en `Tareas.razor` y agregan a mano `@page` y `@rendermode`, que el prompt prohíbe generar. **La app queda en rojo y no compila: es lo esperado.** |
| 4. Las tres inyecciones, a mano | **El paso clave.** *Conectar* (`@using`), *definir* (`AddScoped` en `Program.cs`) e *inyectar* (`@inject`). Incluye la regla de oro: detener y volver a correr la app al tocar `Program.cs`. Sigue sin compilarse. |
| 5. El `@code` con IA | **Prompt 3** (backend, arquitectura de capas) que declara la estructura de 7 secciones y los placeholders a completar. Pegan el `@code` resultante, revisan que no invente métodos del servicio y **por fin corren la app** entrando por URL directa, porque el `NavLink` todavía no existe. |
| 6. Verlo desde el menú | Agregan una opción en `NavMenu.razor` con un `NavLink` para llegar a la página desde la Home. A partir de acá los botones andan y se navega de punta a punta. |
| 7. Probalo de punta a punta | Recorrido completo desde la Home: agregar, editar, quitar y volver, sin tocar la barra de direcciones. |
| 8. Prueba 1: el servicio Scoped | Abren la página en dos pestañas, agregan tareas y recargan con `F5`. Anotan predicciones y resultados en la bitácora. |
| 9. Cambiá una palabra | Cambian `AddScoped` por `AddSingleton`, reinician la app y repiten el experimento. |

> **Por qué el orden es este:** el markup del paso 3 llama a `Guardar`, `Editar`, `Quitar`,
> `tareas` y `mensaje`, y nada de eso existe hasta el paso 5. Como Razor compila la página
> entera antes de mostrarla, un solo nombre que falte tumba el proyecto. Por eso los pasos 3 y
> 4 se hacen con la app en rojo a propósito, el primer `Run` es en el paso 5 y el menú se agrega
> después (paso 6) para que no quede un link que lleva a una página inexistente.

**Vuelta extra:** agregar una property `Hecha` a `Tarea` (pidiéndoselo a la IA, con un método
nuevo en el servicio) y pedir una segunda versión del diseño cambiando el bloque de «Diseño
visual» del prompt 1.

## Los tres prompts

| # | Paso | Qué genera | Rol |
|---|---|---|---|
| 1 | 2 | una **imagen** | experto en diseño UI/UX |
| 2 | 3 | **markup** Razor + Bootstrap | desarrollador frontend Blazor Server |
| 3 | 5 | **bloque `@code`** | desarrollador backend en arquitectura de capas |

El prompt 2 está deliberadamente acotado: prohíbe devolver `@code`, `@inject`, `@page`, CSS,
JavaScript y Markdown, para que el markup y la lógica se generen por separado y la IA no mezcle
las dos cosas.

La página no nombra ninguna herramienta en particular: sirve cualquiera que genere texto e
imágenes, y cada prompt indica qué tiene que producir.

## Qué se busca mostrar

Con el servicio `Scoped`, cada pestaña del navegador trabaja con su propia lista y un `F5` la
vacía. Con el servicio `Singleton`, todas las pestañas comparten la misma lista mientras la
aplicación siga corriendo. El código de la página es el mismo en los dos casos: lo único que
cambia es una palabra en `Program.cs`.

Y, en paralelo: una IA genera código plausible pero no necesariamente correcto. Por eso el
paso 5 incluye un recuadro de revisión antes de pegar, y el paso 1 deja claro desde el
principio que la página no conoce el ciclo de vida de lo que recibe.

## Conceptos que cubre

- Páginas Blazor con `@page` y bloques `@code`
- Interactividad del servidor con `@rendermode InteractiveServer`
- Registro de servicios en `Program.cs` y contenedor de inyección de dependencias
- Servicios repartidos en un proyecto aparte (referencia de proyecto entre `LabBlazor` y `Servicios`)
- Inyección en una página con `@inject`
- Vida de un servicio: `Scoped` y `Singleton`
- Menú de navegación con `NavLink`
- Construcción de una interfaz por prompting: rol, requisitos, restricciones y formato de salida

## Archivos

```
index.html                la guía
css/styles.css            estilos, tema claro/oscuro
js/main.js                cabeceras de código, resaltado, copiar prompt, bitácora
img/boceto.png            ejemplo de salida del prompt 1
img/ejemploCodigo1.jpg    ejemplo de salida del prompt 2 (markup)
```