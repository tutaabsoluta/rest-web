import http from 'http';
import fs from 'fs';


// Webserver con http que sirve archivos estaticos desde public
// que se solicita y que respondemos
// basado en la URL podemos regresar diferentes cosas
// nuestro web server responde a una peticion y retorna contenido estatico

const server = http.createServer((req, res) => {

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
    const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
    res.end(responseContent)

    const todos = [];

})

const port = 8080;

server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
