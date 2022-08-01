<template>

    <div class="row">
        <div class="col" v-if=" !getValidate.existe ">
            <h1 class="existe-margin">
                ERROR, MENÚ NO EXISTENTE<br />
                <i class="fa-solid fa-triangle-exclamation fa-5x"></i>
            </h1>
        </div>
    </div>

    <div class="row">
        <div class="col limite-margin" v-if=" getValidate.limite ">
            <img 
                :src="urlSite(getObjLogo.img)" 
                :alt="getObjLogo.nombre" 
                class="img-fluid rounded float-center logo" 
                v-if=" getObjLogo.img " 
                loading="lazy" />
            <h1>
                SE HA EXCEDIDO EL LÍMITE PERMITIDO DE VISITAS!!!<br />
                <i class="fa-solid fa-face-sad-cry fa-5x"></i>
            </h1>
        </div>
    </div>

    <div class="row">
        <div class="col" v-if=" !getValidate.menu && !getValidate.limite && getValidate.existe ">
            <img src="@/assets/loading.gif" class="img-fluid loading-margin" alt="">
        </div>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
import { urlSite } from "@/modules/shared/helpers/helpers"

export default {

    props: {
    },
    computed:{        
        ...mapGetters('home',['getValidate','getObjLogo'])
    },   
    methods: {
        urlSite,
    }

}
</script>

<style scoped>
    .existe-margin{
        margin-top: 30vh;
    }
    .limite-margin{
        margin-top: 20vh;
    }
    .loading-margin{
        margin-top: 30vh;
    }
    img.logo{
        max-height: 200px;
        max-width: 200px;
        margin: 0 0;
    }
</style>