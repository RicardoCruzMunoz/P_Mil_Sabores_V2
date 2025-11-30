import { useEffect, useState, type FormEvent } from "react";
import type { Producto } from "../../interfaces/Producto";
import { useLocation } from "react-router-dom";
import { getProducto } from "../../api/producto";
import { base_url_img } from "../../api/config";

export const AdminProd = () => {
  // 1. ESTADOS
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  
  // Estado para los campos de texto del nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
      upc: '',
      nombre: '',
      precio: '',
      categoria: '',
      descripcion: ''
  });

  // Estados exclusivos para manejar la imagen
  const [archivoSeleccionado, setArchivoSeleccionado] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // --- FUNCIÓN PARA CARGAR PRODUCTOS (Reutilizable) ---
  const cargarProductos = () => {
    getProducto().then(setProductos).catch(console.error);
  };

  // 2. CARGA INICIAL
  useEffect(() => {
    cargarProductos();
  }, []);

  // 3. LÓGICA DE FILTROS
  const location = useLocation();
  const categoriaDesdeIndex = location.state?.categoria;
  const [busqueda, setBusqueda] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const categories = ['todos', ...new Set(productos.map(p => p.categoria))];

  useEffect(() => {
    if (categoriaDesdeIndex) setSelectedCategory(categoriaDesdeIndex);
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

  // 4. HANDLERS BÁSICOS
  const handleBusquedaChange = (e: React.ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value);
  const handleCategoriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value);

  const getImagenSrc = (ruta: string) => {
    if (!ruta) return "/img/placeholder.png";
    if (ruta.startsWith("http")) return ruta;
    return `${base_url_img}/img/${ruta}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNuevoProducto({
        ...nuevoProducto,
        [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setArchivoSeleccionado(file);
        setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  // --- 5. FUNCIÓN PARA ELIMINAR (DELETE) ---
  const handleEliminar = async (upc: string) => {
    try {
        const response = await fetch(`${base_url_img}/api/productos/${upc}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert("Producto eliminado correctamente");
            cargarProductos(); // Recargamos la lista para que desaparezca visualmente
        } else {
            const errorText = await response.text();
            alert("Error al eliminar: " + errorText);
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión al intentar eliminar");
    }
  };

  // --- 6. FUNCIÓN PARA GUARDAR (POST) ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validación de UPC duplicado
    const upcExiste = productos.some(p => p.upc === nuevoProducto.upc);
    if (upcExiste) {
        alert(`Error: El código UPC "${nuevoProducto.upc}" ya existe.`);
        return; 
    }

    const formData = new FormData();
    formData.append('upc', nuevoProducto.upc);
    formData.append('nombre', nuevoProducto.nombre);
    formData.append('precio', nuevoProducto.precio);
    formData.append('categoria', nuevoProducto.categoria);
    formData.append('descripcion', nuevoProducto.descripcion);

    if (archivoSeleccionado) {
        formData.append('imagen', archivoSeleccionado);
    }

    try {
        const response = await fetch(`${base_url_img}/api/productos`, {
            method: 'POST',
            body: formData, 
        });

        if (response.ok) {
            alert("Producto guardado exitosamente");
            setMostrarFormulario(false);
            cargarProductos(); // Recargar lista
            
            // Resetear formulario
            setNuevoProducto({ upc: '', nombre: '', precio: '', categoria: '', descripcion: '' });
            setArchivoSeleccionado(null);
            setPreviewUrl(null);
        } else {
            const errorText = await response.text(); 
            alert("Error al guardar: " + errorText);
        }
    } catch (error) {
        console.error(error);
        alert("Error de conexión");
    }
  };
  
  return (
    <>
      <div className="px-4">
        {/* ENCABEZADO */}
        <div className="row align-items-center">
          <div className="col-md-10">
            <h2 className="tTer mb-3">
              {mostrarFormulario ? "Agregar Nuevo Producto" : "Gestión de Productos"}
            </h2>
          </div>
          <div className="col-md-2 text-end pe-3">
            {!mostrarFormulario && (
                <button 
                    className="btn-sm btn-outline-light p-2"
                    onClick={() => setMostrarFormulario(true)}
                >
                    <i className="bi bi-plus-lg me-2"></i> Agregar
                </button>
            )}
          </div>
        </div>

        {mostrarFormulario ? (
            
            // --- VISTA FORMULARIO ---
            <div className="fade-in mt-4">
              <div className="card bg-light border-secondary p-4">
                  <h4 className="tTer mb-4">Datos del nuevo producto</h4>
                  <form onSubmit={handleSubmit}>
                      <div className="row">
                          <div className="col-md-8">
                              <div className="row">
                                  <div className="col-md-4 mb-3">
                                      <label className="form-label tTer">UPC</label>
                                      <input 
                                          type="text" name="upc" className="form-control" placeholder="Ej: TC001" required
                                          onChange={handleInputChange} value={nuevoProducto.upc}
                                      />
                                  </div>
                                  <div className="col-md-8 mb-3">
                                      <label className="form-label tTer">Nombre del Producto</label>
                                      <input 
                                          type="text" name="nombre" className="form-control" placeholder="Ej: Torta de Chocolate" required
                                          onChange={handleInputChange} value={nuevoProducto.nombre}
                                      />
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-md-6 mb-3">
                                      <label className="form-label tTer">Precio</label>
                                      <input 
                                          type="number" name="precio" className="form-control" placeholder="0" required
                                          onChange={handleInputChange} value={nuevoProducto.precio}
                                      />
                                  </div>
                                  <div className="col-md-6 mb-3">
                                      <label className="form-label tTer">Categoría</label>
                                      <select 
                                          className="form-select" name="categoria" required defaultValue=""
                                          onChange={handleInputChange}
                                      >
                                          <option value="" disabled>Seleccione...</option>
                                          {categories.filter(c => c !== 'todos').map(c => <option key={c} value={c}>{c}</option>)}
                                      </select>
                                  </div>
                              </div>
                              <div className="mb-4">
                                  <label className="form-label tTer">Descripción</label>
                                  <textarea 
                                      className="form-control" name="descripcion" rows={3} placeholder="Detalles..."
                                      onChange={handleInputChange} value={nuevoProducto.descripcion}
                                  ></textarea>
                              </div>
                          </div>

                          {/* IMAGEN */}
                          <div className="col-md-4 d-flex flex-column align-items-center justify-content-center border-start">
                                <label className="form-label tTer mb-2">Imagen del Producto</label>
                                <div className="border rounded p-1 mb-3 bg-white d-flex align-items-center justify-content-center" style={{width: '180px', height: '180px'}}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Preview" className="w-100 h-100 object-fit-contain" />
                                    ) : (
                                        <div className="text-muted text-center">
                                            <i className="bi bi-image fs-1"></i>
                                            <p className="m-0 small">Sin imagen</p>
                                        </div>
                                    )}
                                </div>
                                <input 
                                    type="file" className="form-control form-control-sm" accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <div className="form-text text-center small mt-1 tTer">Formatos: .jpg, .png</div>
                          </div>
                      </div>

                      <hr className="text-secondary opacity-25 my-4" />
                      
                      <div className="d-flex gap-2 justify-content-end">
                          <button 
                              type="button" className="btn btn-outline-light"
                              onClick={() => {
                                  setMostrarFormulario(false);
                                  setArchivoSeleccionado(null);
                                  setPreviewUrl(null);
                              }}
                          >
                              Cancelar / Volver
                          </button>
                          <button type="submit" className="btn btn-outline-light">
                              Guardar Producto
                          </button>
                      </div>
                  </form>
              </div>
            </div>
        ) : (
            // --- VISTA LISTA DE PRODUCTOS ---
            <>
                <div className="row mt-2 mb-3">
                    <hr />
                    <div className="col-lg-10 col-md-7 col-sm-12">
                        <input 
                            type="text" className="form-control" id="buscar" placeholder="Buscar producto"
                            value={busqueda} onChange={handleBusquedaChange}
                        />
                    </div>
                    <div className="col-lg-2 col-md-5 col-sm-12">
                        <select 
                            id="categorias" className="form-select"
                            value={selectedCategory} onChange={handleCategoriaChange}
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat === 'todos' ? 'Todas las categorías' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <section className="row g-4">
                    <hr />
                    {productosFiltrados.length > 0 ? (
                        <div className="adminListProd mt-1 pt-2">
                            <div className="d-none d-md-flex row fw-bold text-secondary mb-2 px-3">
                                <div className="col-md-3">Producto</div>
                                <div className="col-md-3">Categoria</div>
                                <div className="col-md-3 text-end">Precio</div>
                                <div className="col-md-3 text-end">Eliminar</div>
                            </div>
                            <hr className="mt-0 d-none d-md-block" />
                            {productosFiltrados.map((item) => (
                                <div key={item.upc}>
                                    <div className="row align-items-center px-2 my-2">
                                        <div className="col-12 col-md-3 d-flex align-items-center gap-3 mb-2 mb-md-0">
                                            <div className="imgAdminProdFond">
                                                <img 
                                                    src={getImagenSrc(item.imagenUrl)} 
                                                    alt={item.nombre} 
                                                    className="imgAdminProd p-1 object-fit-contain"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            </div>
                                            <span className="tTer">{item.nombre}</span>
                                        </div>
                                        <div className="col-6 col-md-3">
                                            <span className="tTer">{item.categoria}</span>
                                        </div>
                                        <div className="col-6 col-md-3 text-start text-md-end">
                                            <span className="tTer">${item.precio.toLocaleString('es-CL')}</span>
                                        </div>
                                        <div className="col-6 col-md-3 text-md-end px-5">
                                            <div className="dropdown">
                                                <button className="btn btn-outline-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><p className="tSec px-3">¿Desea eliminar este producto?</p></li>
                                                    <li className="text-center"> 
                                                        {/* --- BOTÓN DE ELIMINAR CONECTADO --- */}
                                                        <button 
                                                            className="btn btn-outline-light"
                                                            onClick={() => handleEliminar(item.upc)}
                                                        >
                                                            Confirmar
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="m-0 text-secondary opacity-25" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-dark text-center" role="alert">
                                <h5 className="tSec">No se encontraron productos que coincidan con tu búsqueda</h5>
                            </div>
                        </div>
                    )}
                </section>
            </>
        )}
      </div>
    </>
  )
}