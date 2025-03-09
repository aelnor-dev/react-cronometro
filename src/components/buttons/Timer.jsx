import React, { useEffect, useState } from "react";
import "./Timer.css";
import useSound from 'use-sound';


const Timer = () => {
  const [count, setCount] = useState(0); //para modificar el estado de count siempre tienes que usar
  // la función de modificación (setCount) para que React lo maneje de forma asíncrona
  const [running, setRunning] = useState(false);

  const [play] = useSound("beep.mp3"); //si está en public no hay que importarlo porque las carpetas llamadas public son ya accesibles
  //para el navegador
  //useSound devuelve un array en el que estará la función de reproducir en primera posición, y tendrá más valores como para parar.
  //Por lo tanto al querer solo que se reproduzca queremos coger solo el primer valor del array, por eso no usamos play sin
  //corchetes para que no nos devuelva el array entero. UseSound es una dependencia que instalamos que tiene distintos valores y
  //al hacer destructuración cogemos los valores que nos interesan de los que creó el autor.

  const handleRunning = () => {
    setRunning(!running);
  };

  const handleRestart = () => {
    setCount(0);
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCount(count + 1);
        // setCount((count) => {
        //   return (count += 1);
        // });
      }, 1000);
    }

    return () => {
      clearInterval(interval); //lo necesitamos para que no se acumule mientras se recarga la página (iría de dos en dos números).
      // Hace que pare la ejecución.
    };
  }, [count, running]); //el array vacío es para que se ejecute solo la primera vez que se monte/renderice el componente (en este caso cuando abrimos o refrescamos la página web)
  //count y running son dependencias, cuando una de las dos cambie, se ejecuta el useEffect()

  useEffect(() => {
    if (count === 10) {
      //las dependencias no necesitan ser instaladas de nuevo como los scripts(como las bases de datos)
      //  con npm en el VScode de quien lo use.
      //Necesitamos que el usuario interactue con la página para que se reproduzca el sonido por lo que running tiene que empezar false
      play();
    }
  }, [count]); //array de dependencias

  return (
    <>
      <div className="container">
        <p>Count is {count} seconds.</p>
        <button onClick={handleRunning}>{running ? "Stop" : "Resume"}</button>
        <br />
        <button onClick={handleRestart}>Restart</button>
      </div>
    </>
  );
};

export default Timer;
