import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const BtnCarrito = () => {
  const { cart } = useCart();

  const totalQuantity = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <>
      <button
        id="btnCart"
        className="navbar-toggler btn-dark position-relative"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasCarrito"
        aria-controls="offcanvasCarrito"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-cart2"></i>

        {totalQuantity > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalQuantity}
          </span>
        )}
      </button>

      <div
        className="offcanvas offcanvas-end"
        id="offcanvasCarrito"
        aria-labelledby="offcanvasCarritoLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title tSec" id="offcanvasCarritoLabel">
            Carrito
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body d-flex flex-column justify-content-between">

          {cart.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
                <div className="cuadroPrevCart text-center mt-4 px-5">
                    <i id="logoBtnCarrito" className="bi bi-cart-x"></i>
                    <h4 className="tSec pt-1">Carrito vacío</h4>
                    <a href="/catalogo" className="btn btn-secondary my-3 mb-4">
                        Ver Catalogo
                    </a>
                </div>
            </div>
          ) : (
            <>
              <div className="prevCart py-1 px-2">
                <div className="row fw-bold text-secondary mb-2 px-2 py-1">
                  <div className="tTer col-6">Nombre</div>
                  <div className="tTer col-3 text-center">Precio</div>
                  <div className="tTer col-3 text-center">Cantidad</div>
                </div>

                <hr className="mt-0 tTer" />

                {cart.map(item => (
                  <div key={item.id} className="row align-items-center py-2 px-2 mb-2">
                    <div className="tTer col-6">{item.titulo}</div>
                    <div className="tTer col-3 text-center">${item.precio}</div>
                    <div className="tTer col-3 text-center">{item.cantidad}</div>
                    <hr className="mt-2 tTer" />
                  </div>
                ))}

                <h4 className="tTer">
                  Total: ${cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}
                </h4>
              </div>

              <div className="mt-4 mb-3 text-center ">
                <Link to="/carrito" className="btn btn-dark">
                  <i className="bi bi-cart2"></i> Ver Carrito <i className="bi bi-cart2"></i>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
