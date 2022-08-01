<template v-if="getOpenModalTipoPago">

  <div class="modal fade" id="showModalTipoPago" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
          
        <div class="modal-header">
          <h5 class="modal-title">DATOS DE COMPRA</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">

            <div class="row">

                <div class="col-12 mb-4">
                    <h6>SELECCIONA TIPO DE ENTREGA</h6>
                    <div class="btn-group w-100">
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn01 "
                            @click="tipoEntrega(1)">
                            EN LOCAL
                        </button>
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn02 "
                            @click="tipoEntrega(2)">
                            TAKE AWAY
                        </button>
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn03 "
                            @click="tipoEntrega(3)">
                            DELIVERY
                        </button>
                    </div>
                </div>
                
                <div class="col-12 mb-4" v-if="idTipoEntrega">
                    <h6>SELECCIONA FORMA DE PAGO</h6>

                    <div class="btn-group-vertical w-100">
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn04 "
                            @click=" tipoPago(1) ">
                            EFECTIVO <small>CONTRA-ENTREGA</small>
                        </button>
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn05 "
                            @click=" tipoPago(2) ">
                            TARJETA <small>CONTRA-ENTREGA</small>
                        </button>
                        <button 
                            type="button" 
                            class="btn"
                            :class= " classBtn06 "
                            @click=" tipoPago(3) ">
                            TRANSFERENCIA
                        </button>
                    </div>
                </div>

                <div class="col-12">
                    <div class="btn-group w-100">
                        <button 
                            type="button" 
                            class="btn btn-primary text-white"
                            @click="back">
                            <i class="fa fa-arrow-left"></i> VOLVER
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-primary text-white"
                            @click="goDatos"
                            v-html=" btnNext.txt "
                            :disabled=" btnNext.disabled ">
                        </button>
                    </div>
                </div>

            </div>

        </div><!-- FIN MODAL BODY -->

      </div>
    </div>
  </div>
  
</template>

<script>
  import { mapGetters } from "vuex";
  import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

  export default {
    
    data() {
      return {
        idTipoEntrega: '',
        idTipoPago: '',
        classBtn01: 'btn-outline-info',
        classBtn02: 'btn-outline-info',
        classBtn03: 'btn-outline-info',
        classBtn04: 'btn-outline-info',
        classBtn05: 'btn-outline-info',
        classBtn06: 'btn-outline-info',
        btnNext: {
            txt: 'SIGUIENTE <i class="fa fa-arrow-right"></i>',
            disabled: true
        },
      };
    },
    watch: {
        getOpenModalTipoPago(newVal,oldVal){
            if( newVal ){
                $('#showModalTipoPago').modal({backdrop:'static', keyboard:false});
                $('#showModalTipoPago').modal('show');
            }
            else{
                $('#showModalTipoPago').modal('hide');
            }
        }
    },
    computed:{
        ...mapGetters('home',['getOpenModalTipoPago']),
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        onHidden(){
          $('#showModalTipoPago').modal('hide');
          this.$store.commit('home/setOpenModalTipoPago', false);
        },
        back(){
            this.onHidden();
            this.$store.commit('home/setOpenModalShop', true);
        },
        tipoEntrega( value ){
            this.idTipoEntrega = value;
            this.focusTipoEntrega(value);
        },
        focusTipoEntrega(value){

            this.classBtn01 = 'btn-outline-info';
            this.classBtn02 = 'btn-outline-info';
            this.classBtn03 = 'btn-outline-info';

            switch(value) {
                case 1:
                    this.classBtn01 = 'btn-info text-white';
                    break;
                case 2:
                    this.classBtn02 = 'btn-info text-white';
                    break;
                case 3:
                    this.classBtn03 = 'btn-info text-white';
                    break;
            }
        },
        tipoPago( value ){
            this.idTipoPago = value;
            this.focusTipoPago(value);
        },
        focusTipoPago(value){

            this.classBtn04 = 'btn-outline-info';
            this.classBtn05 = 'btn-outline-info';
            this.classBtn06 = 'btn-outline-info';

            switch(value) {
                case 1:
                    this.classBtn04 = 'btn-info text-white';
                    break;
                case 2:
                    this.classBtn05 = 'btn-info text-white';
                    break;
                case 3:
                    this.classBtn06 = 'btn-info text-white';
                    break;
            }

            this.btnNext.disabled = false;
        },
        goDatos(){
            const value = { 'entrega': this.idTipoEntrega ,'pago': this.idTipoPago };
            this.$store.commit('home/setTipoPago', value);
            this.$store.commit('home/setOpenModalTipoPago', false);
            this.$store.commit('home/setOpenModalDatosPago', true);
        },
    }

  };
</script>

<style scoped lang="scss">
    #showModalShop{
    padding-top: 0%;
    }
    .modal-content{
    background-color: #eceded;
    -webkit-box-shadow: 5px 5px 49px 5px #000000; 
    box-shadow: 5px 5px 49px 5px #000000;
    }
    h5.modal-title{
        color: var(--texto);
    }
    .modal-title button i{
        font-size: 3rem;
    }
</style>