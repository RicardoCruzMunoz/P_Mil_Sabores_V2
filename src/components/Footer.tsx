export const Footer = () => {
  return (
    <>
        <footer className="py-3 mt-3">
          <div className="bloqueFooter p-3">
            <h4 className="tPrin">Redes Sociales</h4>
            <div className="gap-3">
              <a href="https://www.facebook.com/" className="btnFooter" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook fs-4"></i>
              </a>
              <a href="https://www.instagram.com/" className="btnFooter" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram fs-4"></i>
              </a>
              <a href="https://wa.me/0000000000" className="btnFooter" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <i className="bi bi-whatsapp fs-4"></i>
              </a>
            </div>
          </div>
        </footer>
    </>
  )
}
