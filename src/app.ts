import { Server } from "./presentation/server";


( async () => {
    main()
})();

function main () {
    const server = new Server()
    server.start()
};

// all lo de express va en la capa de presentacion