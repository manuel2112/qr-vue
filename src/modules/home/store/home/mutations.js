
// export const myMutations = ( state ) => {
    
// }

export const setMenu = ( state, data ) => {

    if( !data.error){
        state.empresa       = data.info.empresa;
        state.pagoBool      = data.info.empresa.EMPRESA_PAGO == 1 ? true : false;
        state.menu          = data.info.menu;
        state.validate.menu = true;
        state.tipoPago      = data.info.tipoPago;
        state.tipoEntrega   = data.info.tipoEntrega;
        document.title      = state.empresa.EMPRESA_NOMBRE;
        
        //OBJ LOGO
        state.logo.img      = state.empresa.EMPRESA_LOGOTIPO;
        state.logo.nombre   = state.empresa.EMPRESA_NOMBRE;
    }else{
        state.validate.existe  = data.info.existe;
        state.validate.limite  = data.info.limite;
    }
    
}
export const setRedes = ( state ) => {

    state.dataRedes.fono         = state.empresa.EMPRESA_FONO;
    state.dataRedes.whatsapp     = state.empresa.EMPRESA_WHATSAPP ? state.empresa.EMPRESA_WHATSAPP.slice(1) : null;
    state.dataRedes.email        = state.empresa.EMPRESA_EMAIL;
    state.dataRedes.web          = state.empresa.EMPRESA_WEB;
    state.dataRedes.facebook     = state.empresa.EMPRESA_FACEBOOK;
    state.dataRedes.instagram    = state.empresa.EMPRESA_INSTAGRAM;
    
}
export const setProducto = ( state, value ) => {
    state.producto = value;
}
export const setOpenModalEmpresa = ( state, value ) => {
    state.openModalEmpresa = value;
}
export const setOpenModalProducto = ( state, value ) => {
    state.openModalProducto = value;
}
export const setOpenModalAddShop = ( state, value ) => {
    state.openModalAddShop = value;
    if( !value ){
        state.vvSelected = {};
    }
}
export const setOpenModalShop = ( state, value ) => {
    state.openModalShop = value;
}
export const setOpenModalTipoPago = ( state, value ) => {
    state.openModalTipoPago = value;
}
export const setOpenModalDatosPago = ( state, value ) => {
    state.openModalDatosPago = value;
}
export const setVVSelected = ( state, value ) => {
    state.vvSelected = value;
}
export const setIsTipoData = ( state, value ) => {
    state.isTipoData = value;
}
export const setAddShop = ( state, value ) => {
    state.shop      = value;
    state.isShop    = true;
    state.isClean   = false;
}
export const setCleanShop = ( state ) => {
    state.shop      = [];
    state.isShop    = false;
    state.isClean   = true;
}
export const setTipoDetalle = ( state, value ) => {
    state.tipoDetalle.entrega  		= value.entrega;
    state.tipoDetalle.pago     		= value.pago;
    state.tipoDetalle.idEmpresa     = state.empresa.EMPRESA_ID;
}
export const setTotal = ( state, value ) => {
    state.tipoDetalle.total  = value;
}

export const setResetPedido = ( state ) => {

    state.tipoDetalle           = {};
    state.shop                  = [];
    state.openModalDatosPago    = false;
    state.isShop                = false;
    state.isTipoData            = false;
    $('#showModalDatosPago').modal('hide');
    
}