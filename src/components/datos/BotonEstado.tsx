import DropdownMenu from "../DropdownMenu";

export default function BotonEstado({manejoEstados, setIndiceEstado, indiceEstado}): JSX.Element {
  if (manejoEstados.estadosPosibles !== undefined) {
    if (manejoEstados.slider === false) {
      return (
        <button onClick={() => {
          manejoEstados.setEstado(manejoEstados.estadosPosibles[(indiceEstado + 1) % (manejoEstados.estadosPosibles.length)]);
          setIndiceEstado((indiceEstado + 1) % (manejoEstados.estadosPosibles.length));
          }} className='absolute ml-1 sm:text-xl sm:p-1'>
          {manejoEstados.estadosPosibles[indiceEstado].charAt(0).toUpperCase() + manejoEstados.estadosPosibles[indiceEstado].slice(1)}
        </button>
      );
    }

    else {
      return (
        <DropdownMenu optionArray={manejoEstados.estadosPosibles} selectedOption={manejoEstados.estado} setOption={manejoEstados.setEstado}/>
      );
    }
  }

  else return <></>;
};

