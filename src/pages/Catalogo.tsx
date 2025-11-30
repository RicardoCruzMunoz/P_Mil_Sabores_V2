import { useEffect, useState } from "react";
import type { Producto } from "../interfaces/Producto";
import { getProducto } from "../api/producto";
import { Link, useLocation } from "react-router-dom";
import { base_url_img } from "../api/config";

export const Catalogo = () => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        getProducto().then(setProductos).catch(console.error);
    }, []);

    const location = useLocation();
    const categoriaDesdeIndex = location.state?.categoria;

    const [busqueda, setBusqueda] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');

    const categories = ['todos', ...new Set(productos.map(p => p.categoria))];

    useEffect(() => {
        if (categoriaDesdeIndex) {
            setSelectedCategory(categoriaDesdeIndex);
        }
    }, [categoriaDesdeIndex]);

    const filteredProducts = selectedCategory === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === selectedCategory);

    const productosFiltrados = busqueda.trim() !== ''
        ? filteredProducts.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
          )
        : filteredProducts;

    const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
    };

    const getImagenSrc = (ruta: string) => {
        if (!ruta) return "/img/placeholder.png";
        if (ruta.startsWith("http")) return ruta;
        return `${base_url_img}/img/${ruta}`;
    };

  return (
    <>
        <main className="container mb-3">
            <header className="my-3">
                <div className="busqFiltro">
                    <div className="row g-3 w-100 align-items-center">
                        <div className="col-lg-3 col-md-12 col-sm-12">
                            <h1 className="tPrin mb-0">Productos</h1>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <input 
                                type="text" 
                                className="form-control" 
                                id="buscar" 
                                placeholder="Buscar producto"
                                value={busqueda}
                                onChange={handleBusquedaChange}
                            />
                        </div>
                        <div className="col-lg-3 col-md-12 col-sm-12">
                            <select 
                                id="categorias" 
                                className="form-select"
                                value={selectedCategory}
                                onChange={handleCategoriaChange}
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat === 'todos' ? 'Todas las categorías' : cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>

            <section className="row g-4">
                {productosFiltrados.length > 0 ? (
                    productosFiltrados.map((p) => (
                        <div key={p.upc} className="col-lg-4 col-md-6 col-12">
                            <article className="card h-100 bg-dark text-light border-secondary-subtle">
                                <div className="ratio ratio-16x9">
                                    <img 
                                        src={getImagenSrc(p.imagenUrl)} 
                                        className="card-img-top object-fit-contain" 
                                        alt={p.nombre}
                                    />
                                </div>
                                <div className="card-body">
                                    <span className="badge rounded-pill text-bg-secondary mb-2">{p.categoria}</span>
                                    <h3 className="h4 card-title tTer">{p.nombre}</h3>
                                    <p className="card-text small tTer">{p.descripcion}</p>
                                </div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <h5 className="fw-bold tTer">${p.precio.toLocaleString('es-CL')}</h5>
                                    <Link className="btn btn-outline-light btn-sm tSec" to={`/detalleproducto/${p.upc}`}>Ver detalle</Link>
                                </div>
                            </article>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-dark text-center" role="alert">
                            <h5 className="tSec">No se encontraron productos que coincidan con tu búsqueda</h5>
                        </div>
                    </div>
                )}
            </section>
        </main>
    </>
  )
}