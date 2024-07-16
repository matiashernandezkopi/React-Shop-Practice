export const ropaGuardada: Prenda[] = [{
  ip: "01423",
  name: "REMERA BASICA",
  description: "prueba",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfkla_g2_AYZPJdwnNYLm_ooQVQ-z9Fk0derTRsHRXrITALynLbHsuZeUG-t628Tqj3U&usqp=CAU",
  amount: 2,
  price: 5.5
}, {
  ip: "idpruba",
  name: "REMERA CON LINEA LATERAL",
  description: "prueba mas larga para ver como queda",
  img: "https://img.ws.mms.shopee.sg/db2d764b820786c1fcbcde1ca671818f",
  amount: 96,
  price: 25
}, {
  ip: "01423fdfs",
  name: "REMERA BASICA",
  description: "prueba",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEfkla_g2_AYZPJdwnNYLm_ooQVQ-z9Fk0derTRsHRXrITALynLbHsuZeUG-t628Tqj3U&usqp=CAU",
  amount: 0,
  price: 5.5
}, {
  ip: "idprub1231331a",
  name: "REMERA CON LINEA LATERAL",
  description: "prueba mas larga para ver como queda",
  img: "https://img.ws.mms.shopee.sg/db2d764b820786c1fcbcde1ca671818f",
  amount: 96,
  price: 25
}];

/**TODO 
 * el carrito necestia una actualizacion para podes agregar y eliminar multiples veces la misma prenda.
 * 
 * creo que podria hacer algo asi como removeFromCarrito(state, action: PayloadAction<{ ip: string; units: number }>)
 *  siendo units la cantidad de unidades agregadas. y que lo utilice para restarlo al carritoArray
 *  
 *  de paso mantiene el id cada prenda, y no hace falta agregar mas de una ves la misma
 * 
 * 
 * tambien: que se puedan comprar variables (ej:distintos colores) y que eso modifique el id (newID = id + idDelColor),
 * para poder eliminar o modificar la cantidad de unidades especifica de ese articulo, con esas cualidades
 * 
*/



const deepCopy = (array: Prenda[]): Prenda[] => {
  return array.map(item => ({ ...item }));
};

export const updateRopaGuardada = (carritoArray: prendaCarrito[]) => {
  
  const ropaGuardadaMutable = deepCopy(ropaGuardada);

  carritoArray.forEach(ropa => {
    const prenda = ropaGuardadaMutable.find(item => item.ip === ropa.ip);
    if (prenda) {
      prenda.amount -= 1;
    }
  });

  ropaGuardada.length = 0;
  ropaGuardada.push(...ropaGuardadaMutable);
  
};