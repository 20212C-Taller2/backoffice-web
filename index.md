# Manual de usuario de Backoffice de Ubademy

## Indice
-----------

1. [Inicio de sesión](#login) 
2. [Home](#home) 
3. [Administrar usuarios](#users)
4. [Detalle de usuario](#user)
5. [Administrar cursos](#courses) 
6. [Detalle de curso](#course)
7. [Agregar administrador](#addadmin)
8. [Métricas](#metrics)   


</br></br></br>

## Inicio de sesión <a name="login"></a>
---
</br>
En la pantalla principal se deberá ingresar el email y la contraseña de un usuario de tipo admin para ingresar al sistema.

</br>

![login](/img/login.jpg)

</br></br>

## Home <a name="home"></a>
---
</br>

Luego de haber iniciado sesión llegaremos a la pantalla principal. En ella encontraremos un listado de las distintas funciones que nos encontraremos en el backoffice.
</br>

![home1](/img/home1.jpg)

</br>

En la parte superior se encontrará la barra de navegación, que nos servirá para dirigirnos a las distintas partes de la web.
Las distintas opciones que hay son (de izquierda a derecha):
* Administrar usuarios
* Administrar cursos
* Agregar administrador
* Ver estadisticas
* Botón de perfil

</br>

![home2](/img/home2.jpg)

</br>

Si hacemos click en el botón de perfil veremos los datos de nuestro usuario y también tendremos la opción de cerrar sesión.

</br>

![home3](/img/home3.jpg)

</br>

Por último, el la parte inferior se encuentra el footer de la página con un poco de información sobre la misma.

</br></br>

## Administrar usuarios <a name="users"></a>
---
</br>

En la pantalla de administrar usuarios veremos una tabla con información de todos los usuarios.
Se podrá visualizar en la tabla lo siguiente sobre el usuario:
* Id 
* Apellido y nombre
* Email
* Id de orden
* Estado de cuenta

</br>

![users1](/img/users1.jpg)

</br>

El estado de cuenta se puede deducir de la acción que nos permite el sistema. Si podemos bloquear el usuario, quiere decir que su cuenta actualmente se encuentra desbloqueada, lo mismo sucede para el caso contrario.
Por lo que tenemos los botones para bloquear/desbloquear un usuario y además tendremos uno para ir al detalle de su perfil.

</br>

![users2](/img/users1.jpg)

</br>

En caso de hacer click en bloquear/desbloquear, se nos abrirá una ventana para confirmar la operación.

</br>

![users3](/img/users2.jpg)

</br>

En el ejemplo de arriba vemos un mensaje de éxito tras realizar la operación de bloqueo.

</br></br>

## Detalle de usuario <a name="user"></a>
---
</br>

Desde la pantalla de administrar usuarios se podrá acceder a la sección del detalle de los mismos. En esta parte podremos encontrar información más detallada del usuario. Se podrá ver en detalle: id, apellido y nombre, si es una cuenta de Google, mail, foto de perfil, intereses y el estado de la cuenta.

</br>

![user1](/img/user1.jpg)

</br>

Al igual que desde la tabla general de usuarios, en el detalle de los mismos se podrá tanto bloquear como desbloquear sus cuentas. Al iniciar el botón, nuevamente se nos abrirá una ventana para confirmar la operación.

</br>

![user2](/img/user2.jpg)

</br>

![user3](/img/user3.jpg)

</br>

Luego de haber bloqueado al usuario veremos también como el estado de su cuenta se actualiza.

</br></br>

## Administrar cursos <a name="courses"></a>
---
</br>

Si vamos a administrar cursos nos encontraremos con la tabla general de información sobre todos los cursos disponibles actualmente en la aplicación.

</br>

![courses1](/img/courses1.jpg)

</br>

La información que se podrá ver sobre los cursos en la tabla será:
* Id de curso
* Nombre de curso
* Tipo de curso
* Tipo de suscripción
* Descripción del curso
* Cantidad de alumnos 
* Cantidad de colaboradores
* Cantidad de examenes

Por último, habrá un botón para acceder al detalle del curso 

</br></br>

## Detalle de curso <a name="course"></a>
---
</br>

En la pantalla de detalle de curso, veremos una información ampliada sobre los mismos.

</br>

![course1](/img/course1.jpg)

</br>

Además de la información que ya se encontraba en la tabla, podremos ver detalles sobre el creador del curso, los nombres de los colaboradores (pudiendo acceder eventualmente a su perfil) y por último una lista de los exámenes disponibles.

</br>

![course2](/img/course2.jpg)

</br>

Se tendrá la opción de abrir el detalle de cada uno de los exámenes (si es que los hay), pudiendo ver el número de exámen, el nombre y las preguntas disponibles.

</br></br>

## Agregar administrador <a name="addadmin"></a>
---
</br>

En la pantalla agregar administrador, tendremos la opción de agregar distintos usuarios de tipo administrador para que puedan manejar este mismo backoffice.

</br>

![addadmin1](/img/addadmin1.jpg)

</br>

Como se puede ver, hasta que no se cumplan con los requisitos de la contraseña (al menos 8 caracteres de largo, 1 mayúscula y 1 número) el sistema no nos permitirá crear el nuevo usuario

</br>

![addadmin2](/img/addadmin2.jpg)

</br>

Luego de introducir todos datos válidos, se nos habilitará el botón para registrar el nuevo administrador.

</br>

![addadmin3](/img/addadmin3.jpg)

</br>

Por último si fue exitosa la operación se nos mostrará una ventana con los datos del nuevo administrador.

</br></br>

## Métricas <a name="metrics"></a>
---
</br>

En la última sección de la web tendremos las métricas. En caso de no indicarse ningún parámetro, se nos mostrarán las estadisticás durante el día mediante un gráfico de barras horizontal.

</br>

![metricas1](/img/metricas1.jpg)

</br>

Hay 6 tipos de métricas:
* Usuarios Bloqueados: indicará cuantas veces se ejecuto la acción de bloqueo
* Usuarios Desbloqueados: indicará cuantas veces se ejecuto la acción de desbloqueo
* Cuentas nuevas: indicará cuantas cuentas nuevas fueron creadas con mail y contraseña
* Logueos: indicará cuantas usuarios de cuentas corrientes se estuvieron logueando a las aplicaciones 
* Cuentas nuevas con Google: indicará cuantas cuentas nuevas fueron creadas con un usuario de Google
* Logueos: indicará cuantas usuarios con cuentas de Google se estuvieron logueando a las aplicaciones

</br>

![metricas2](/img/metricas2.jpg)

</br>

Para visualizar las métricas se podrá elegir un rango de fechas para ver las ocurrencias de las métricas mencionadas arriba durante ese período.
A su vez también se podrá elegir entre dos tipos de gráficos: de barras y torta.

</br>

![metricas3](/img/metricas3.jpg)

</br>

En caso de no haber métricas (no hubo acciones) durante el período seleccionado el sistema nos lo informará.

</br>

![metricas4](/img/metricas4.jpg)

</br>