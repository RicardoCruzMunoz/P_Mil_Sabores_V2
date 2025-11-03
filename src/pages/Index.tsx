import { Carrusel } from '../components/Carrusel';
import { CarruselDest } from '../components/CarruselDest';
import { SecNuestrosProd } from '../components/SecNuestrosProd';
import { productos } from '../data/productos';

export const Index = () => {
  return (
    <>
      <Carrusel />
      <CarruselDest
        elementos={productos}
        ids={["TC001", "TT002", "TE001", "PT001", "PSA002"]}
      />
      <SecNuestrosProd />
    </>
  );
}