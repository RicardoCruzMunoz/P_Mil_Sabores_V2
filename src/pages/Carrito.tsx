import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Carrito = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container mt-4">
      <div className="cuadroCarrito p-4">
        <h2 className="tTer">Carrito de Compras</h2>
        <hr className="mt-0 tTer d-none d-md-block" />

        {cart.length === 0 ? (
          <>
            <p className="tTer">Tu carrito está vacío.</p>
            <div className="mt-4 mb-3 text-center ">
                  <Link to="/catalogo" className="btn btn-dark">
                    Ver Catalogo
                  </Link>
                </div>
          </>
        ) : (
          <>

            {/* Encabezado — oculto en sm */}
            <div className="row fw-bold text-secondary mb-2 px-2 py-1 d-none d-md-flex">
              <div className="tTer col-md-4">Nombre</div>
              <div className="tTer col-md-2 text-center">Precio Unitario</div>
              <div className="tTer col-md-2 text-center">Cantidad</div>
              <div className="tTer col-md-2 text-center">Total (U×C)</div>
              <div className="tTer col-md-2 text-center"></div>
            </div>

            <hr className="mt-0 tTer d-none d-md-block" />

            {/* Productos */}
            {cart.map((item) => (
              <div key={item.id}>
                <div className="row align-items-center px-3 my-3">

                  {/* Nombre */}
                  <div className="tTer col-12 col-md-4 mb-2 mb-md-0">
                    <strong className="d-md-none">Nombre: </strong>
                    {item.titulo}
                  </div>

                  {/* Precio unitario */}
                  <div className="tTer col-6 col-md-2 text-start text-md-center">
                    <strong className="d-md-none">Precio Unitario: </strong>
                    ${item.precio}
                  </div>

                  {/* Cantidad */}
                  <div className="tTer col-6 col-md-2 text-start text-md-center">
                    <strong className="d-md-none">Cantidad: </strong>
                    {item.cantidad}
                  </div>

                  {/* Total multiplicado */}
                  <div className="tTer col-6 col-md-2 text-start text-md-center mt-2 mt-md-0">
                    <strong className="d-md-none">Total: </strong>
                    ${item.cantidad * item.precio}
                  </div>

                  {/* Botones */}
                  <div className="col-6 col-md-2 d-flex justify-content-center gap-2 mt-3 mt-md-0">

                    <button
                      className="btn btn-outline-light btn-sm rounded-circle"
                      onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>

                    <button
                      className="btn btn-outline-light btn-sm rounded-circle"
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>

                    <button
                      className="btn btn-outline-light btn-sm ms-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>

                </div>

                <hr />
              </div>
            ))}

            {/* Total */}
            <h4 className="tTer mt-4">Total a Pagar: ${total}</h4>

            {/* Vaciar Carrito */}
            <button
              className="btn btn-outline-light mt-2"
              onClick={clearCart}
            >
              Vaciar carrito
            </button>
            <button className="btn btn-outline-light ms-3 mt-2">Finalizar Compra</button>
          </>
        )}
      </div>
    </div>
  );
};
