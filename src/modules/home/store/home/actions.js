
import menuApi from "@/api/menuApi";
// export const myActions = async ({ commit }) => {

// }

export const getMenuApi = async ({ commit }, data) => {

    const resp = await menuApi.post('/apirest',{
                    slug: data
                });
    console.log(resp.data);

    commit('setMenu',resp.data);
    commit('setRedes');
    
    //INSERT VISTA
    if(!resp.data.error){
        await menuApi.post('/apirest/vista/',{
            idEmpresa: resp.data.info.empresa.EMPRESA_ID
        });
    }

}