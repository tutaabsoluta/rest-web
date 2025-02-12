import http2 from 'http2';
import fs from 'fs';


// Webserver con http que sirve archivos estaticos desde public
// que se solicita y que respondemos
// basado en la URL podemos regresar diferentes cosas
// nuestro web server responde a una peticion y retorna contenido estatico

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},(req, res) => {

    if ( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-type': 'text/html' })
        res.end(htmlFile) 
        return
    }

    if ( req.url?.endsWith('.js' ) ) {
        res.writeHead(200, {'Content-type': 'application/javascript'})

    } else if ( req.url?.endsWith('.css') ) {
        res.writeHead(200, {'Content-type': 'text/css'})
    }

    try {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.end(responseContent)
    } catch (error) {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end()
    }


})

const port = 8080;

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
