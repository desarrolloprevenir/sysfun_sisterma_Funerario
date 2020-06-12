export class Usuario {

    constructor(
        public _id?: string,
        public cedula?: string,
        public nombres?: string,
        public apellidos?: string,
        public correo?: string,
        public cargo?: string,
        public contrasena?: string,
        public telefono?: number,
        public nit?: string,
        public roles_id?: number,
        public menu?: [],
        public rol?: { rol: string, opciones: [] },
        public empresa?: {_id: string, nombre: string, nit: string, direccion: string, telefono: string}
    ) { }

}
