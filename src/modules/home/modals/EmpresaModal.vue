<template v-if="getOpenModalEmpresa">

    <div 
        class="modal fade" 
        id="empresaModal" 
        data-backdrop="static" 
        tabindex="-1" 
        role="dialog" 
        aria-labelledby="staticBackdropLabel" 
        aria-hidden="true">

        <div class="modal-dialog" role="document">
            <div class="modal-content">
                
                <div class="modal-header">
                    <h5 class="modal-title">{{ getEmpresa.EMPRESA_NOMBRE }}</h5>
                    <button type="button" class="btn-close" @click=" onHidden "></button>
                </div>

                <div class="modal-body">

                    <div class="row">
                        <div class="col">
                            <img 
                                :src="urlSite(getEmpresa.EMPRESA_LOGOTIPO)" 
                                :alt="getEmpresa.EMPRESA_NOMBRE" 
                                class="img-fluid rounded float-center logo" 
                                v-if=" getEmpresa.EMPRESA_LOGOTIPO " 
                                loading="lazy" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <p class="descripcion" v-html="nl2br(getEmpresa.EMPRESA_DESCRIPCION)"></p>
                        </div>
                    </div>

                    <RedesPage estilo="mdl-empresa" />

                    <div class="row" id="direccion" v-if="getEmpresa.EMPRESA_DIRECCION">
                        <div class="col">
                            {{ getEmpresa.EMPRESA_DIRECCION ? `${getEmpresa.EMPRESA_DIRECCION}, ` : '' }}
                            {{ getEmpresa.comuna }}
                        </div>
                    </div>
                    

                </div><!-- FIN MODAL BODY -->

            </div>
        </div>
    </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from "vuex";
import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

  export default {

    props: {
    },
    components: {
        RedesPage: defineAsyncComponent(() => import('../components/RedesPage.vue'))
    },
    data() {
      return {
        title: '',
      }
    },
    watch: {
        getOpenModalEmpresa(newVal,oldVal){
            if( newVal ){
                $('#empresaModal').modal({backdrop:'static', keyboard:false});
                $('#empresaModal').modal('show');
            }
        }
    },
    computed:{        
        ...mapGetters('home',['getEmpresa','getOpenModalEmpresa'])
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        onHidden(){
            this.$store.commit('home/setOpenModalEmpresa', false);
            $('#empresaModal').modal('hide');
        },
    }

  };
</script>

<style scoped lang="scss">
    img.logo{
        max-height: 100px;
        max-width: 100px;
        margin: 0 0;
    }
    p.descripcion{
        font-size: 1.0rem;
        text-align: justify;
        margin: 0 0 0;
    }
</style>