import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { productos, type Producto } from "../data/productos"
import { useLocation } from 'react-router-dom';

export const Catalogo = () => {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const categoria = params.get('categoria') || '';

    const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>(productos);
    const [busqueda, setBusqueda] = useState('');
    // inicializa desde el query param si viene
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>(() => categoria || 'todos');

    // si cambia el query param, sincroniza el selector
    useEffect(() => {
        setCategoriaSeleccionada(categoria || 'todos');
    }, [categoria]);

    // Filtrar productos cuando cambia la búsqueda o categoría
    useEffect(() => {
        let resultados = productos;

        // Filtrar por categoría
        if (categoriaSeleccionada !== 'todos') {
            resultados = resultados.filter(producto =>
                String(producto.categoria).toLowerCase() === categoriaSeleccionada.toLowerCase()
            );
        }

        // Filtrar por búsqueda (busca en título y descripción)
        if (busqueda.trim() !== '') {
            resultados = resultados.filter(producto =>
                producto.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
            );
        }

        setProductosFiltrados(resultados);
    }, [busqueda, categoriaSeleccionada]);

    const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBusqueda(e.target.value);
    };

    const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoriaSeleccionada(e.target.value);
    };

    return (
        <>
            <main className="container">
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
                                    value={categoriaSeleccionada}
                                    onChange={handleCategoriaChange}
                                >
                                    <option value="todos">Todas las categorias</option>
                                    <option value="Tortas Cuadradas">Tortas Cuadradas</option>
                                    <option value="Tortas Circulares">Tortas Circulares</option>
                                    <option value="Postres Individuales">Postres Individuales</option>
                                    <option value="Productos sin Azúcar">Productos sin Azúcar</option>
                                    <option value="Pastelería Tradicional">Pastelería Tradicional</option>
                                    <option value="Productos Sin Gluten">Productos Sin Gluten</option>
                                    <option value="Productos Veganos">Productos Veganos</option>
                                    <option value="Tortas Especiales">Tortas Especiales</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </header>

                <section className="row g-4">
                    {productosFiltrados.length > 0 ? (
                        productosFiltrados.map((p) => (
                            <div key={p.id} className="col-lg-4 col-md-6 col-12">
                                <article className="card h-100 bg-dark text-light border-secondary-subtle">
                                    <div className="ratio ratio-16x9">
                                        <img src={p.imagen} className="card-img-top object-fit-contain" alt={p.titulo}/>
                                    </div>
                                    <div className="card-body">
                                        <span className="badge rounded-pill text-bg-secondary mb-2">{p.categoria}</span>
                                        <h3 className="h4 card-title tTer">{p.titulo}</h3>
                                        <p className="card-text small tTer">{p.descripcion}</p>
                                    </div>
                                    <div className="card-footer d-flex align-items-center justify-content-between">
                                        <h5 className="fw-bold tTer">${p.precio.toLocaleString('es-CL')}</h5>
                                        <Link className="btn btn-outline-light btn-sm tSec" to={`/detalleproducto/${p.id}`}>Ver detalle</Link>
                                    </div>
                                </article>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-info text-center" role="alert">
                                No se encontraron productos que coincidan con tu búsqueda
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}