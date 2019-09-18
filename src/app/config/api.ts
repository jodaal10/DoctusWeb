export const Endpoint ={
    Autenticar:'api/Usuario/ValidarUsuario',
    GetActividades:'api/Actividad/ListarActividades?idUsuario=',
    GetTiempo:'api/Tiempo/ListarTempos?idActivity=',
    CreateAct:'api/Actividad/CrearActividad',
    CreateTime:'api/Tiempo/CrearTiempo',
    DeleteTime:'api/Tiempo/EliminarTiempo?idTiempo=',
    DeleteAct:'api/Actividad/EliminarActividad?idActivity=',
    Token: 'token'
}