
import menuApi from "@/api/menuApi";
import Swal from 'sweetalert2';
// export const myActions = async ({ commit }) => {

// }

export const getMenuApi = async ({ commit }, data) => {

    const resp = await menuApi.post('/apirest',{
                    slug: data
                });

    commit('setMenu',resp.data);
    commit('setRedes');
    
    //INSERT VISTA
    if(!resp.data.error){
        await menuApi.post('/apirest/vista/',{
            idEmpresa: resp.data.info.empresa.EMPRESA_ID
        });
    }

}

export const insertPedidoApi = async ({ commit }, value) => {

    new Swal({
        title: "Espere por favor",
        allowOutsideClick: false
    });
    Swal.showLoading();

    const resp = await menuApi.post('/apirest/pedido',{
                    value
                });
    
    if( resp.data.info ){
        commit('setResetPedido');
        Swal.fire('Enviado', 'Tu pedido ha sido realizado con éxito. Pronto te contactaremos', 'success');
    }else{
        Swal.fire('Error', 'Se ha producido un error, favor volver a intentar', 'error');
    }

}