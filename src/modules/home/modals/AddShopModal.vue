<template v-if="getOpenModalAddShop">

  <div class="modal fade" id="showModalAddShop" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content" v-if=" getVVSelected.producto ">
          
        <div class="modal-header">
          <h5 class="modal-title">{{ `${this.getVVSelected.producto.PRODUCTO_NOMBRE} - ${getVVSelected.valor.PROVAR_NOMBRE} - ${formatDinero(getVVSelected.valor.PROVAR_VALOR)}` }}</h5>
          <button type="button" class="btn-close" @click=" onHidden "></button>
        </div>

        <div class="modal-body">

          <div class="row">

            <div class="col-12">
              <div class="form-group">
                  <label>SELECCIONAR CANTIDAD</label>
                  <select 
                    class="form-control form-control-lg"
                    v-model.trim=" optShop.cantidad "
                    @change="cmbCantidad">
                  
                    <option value="0"> 0</option>
                    <option v-for=" c in cantidad " :key=" c " :value=" c ">{{ c }}</option>
                  </select>
              </div>
            </div>
            <div class="col-12 mt-1">
              <div class="form-group">
                  <label>COMENTARIO</label>
                  <textarea 
                    class="form-control form-control-lg"
                    placeholder="INGRESAR COMENTARIO ..." 
                    v-model.trim =" optShop.comentario "
                    rows="3">
                  </textarea>
              </div>
            </div>
            <div class="col-12">              
              <button 
                type="button" 
                class="btn btn-primary text-white w-100 my-3" 
                @click="addShop"
                v-html=" btnShop.txt " 
                :disabled=" btnShop.disabled ">
              </button>
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
        cantidad: 10,
        optShop: {
          cantidad: 0,
          comentario: ''
        },
        addShopRes: [],
        btnShop: {
            txt: '<i class="fa fa-shopping-cart"></i> AGREGAR',
            disabled: true
        }
      };
    },
    watch: {
        getOpenModalAddShop(newVal,oldVal){
            if( newVal ){
              this.resetValues();
              this.instanciar();
              $('#showModalAddShop').modal({backdrop:'static', keyboard:false});
              $('#showModalAddShop').modal('show');
            }
        },
        getIsClean(newVal,oldVal){
            if( newVal ){
              this.addShopRes = [];
            }
        },
    },
    computed:{        
        ...mapGetters('home',['getOpenModalAddShop','getVVSelected','getIsClean','getShop'])
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        instanciar(){
          this.getShop.forEach(element => {
            if( element.PROVAR_ID == this.getVVSelected.valor.PROVAR_ID ){
              this.optShop.cantidad   = element.CANTIDAD;
              this.optShop.comentario = element.COMENTARIO;
              return;
            }
          });
          this.cmbCantidad();
        },
        resetValues(){
          this.optShop.cantidad   = 0;
          this.optShop.comentario = '';
          this.btnShop.disabled   = true;
        },
        onHidden(){
          $('#showModalAddShop').modal('hide');
          this.$store.commit('home/setOpenModalAddShop', false);
        },
        cmbCantidad(){
          if( this.optShop.cantidad > 0 ){
            const total = this.optShop.cantidad * this.getVVSelected.valor.PROVAR_VALOR;
            this.btnShop.txt = `<i class="fa fa-shopping-cart"></i> AGREGAR ${this.formatDinero(total)}`;
            this.btnShop.disabled = false;
          }else{
            this.btnShop.txt = `<i class="fa fa-shopping-cart"></i> AGREGAR`;
            this.btnShop.disabled = true;
          }
        },
        processShop(){
          this.addShopRes.forEach((element,index) => {
            if( element.PROVAR_ID == this.getVVSelected.valor.PROVAR_ID ){
              this.addShopRes.splice(index,1);
              return;
            }
          });

          this.addShopRes.push(
            {
              PRODUCTO_NOMBRE: this.getVVSelected.producto.PRODUCTO_NOMBRE,
              PROVAR_ID: this.getVVSelected.valor.PROVAR_ID,
              PROVAR_NOMBRE: this.getVVSelected.valor.PROVAR_NOMBRE,
              PROVAR_VALOR: this.getVVSelected.valor.PROVAR_VALOR,
              CANTIDAD: this.optShop.cantidad,
              COMENTARIO: this.optShop.comentario 
            }
          );
        },
        addShop(){
          this.processShop();
          this.toast();
          this.$store.commit('home/setAddShop', this.addShopRes);
          this.onHidden();
        },
        toast(){
          $("#myToast").toast({ delay: 3000 });
          $("#myToast").toast("show");
        },
    }

  };
</script>

<style scoped lang="scss">
  #showModalAddShop{
    padding-top: 50%;
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