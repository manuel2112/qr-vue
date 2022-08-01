<template>
    <div class="container">
        
        <ValidatePage />

        <button 
            class="btn btn-danger text-white shop" 
            @click="openShop"
            v-if=" getIsShop ">
            <i class="fa fa-shopping-cart"></i>
        </button>
        <button 
            class="btn btn-outline-primary rounded-circle top" 
            @click="goGrupo('#menu-principal')">
            <i class="fa-solid fa-angle-up"></i>
        </button>
        
        <div v-if=" getValidate.menu && !getValidate.limite ">

            <div class="row" v-if=" getValidate.menu ">

                <HeaderPage />

                <div class="col">

                    <div class="scrolling-wrapper" id="menu-principal">
                        <span v-for=" m in getMenu " :key="m">
                            <a 
                                href="javascript:void(0)"
                                class="box-menu rounded-pill" 
                                v-if=" m.COUNT_PRODUCTOS > 0 "
                                @click=" goGrupo(`#menu-${m.GRUPO.GRUPO_ID}`) ">
                                {{ m.GRUPO.GRUPO_NOMBRE }}                                    
                            </a>
                        </span>
                    </div>

                    <div v-for=" m in getMenu " :key="m">

                        <div v-if=" m.COUNT_PRODUCTOS > 0 ">
                            
                            <div class="group-header-con-img" v-if="m.GRUPO.GRUPO_IMG">
                                <img :src="urlSite(m.GRUPO.GRUPO_IMG)" :alt="m.GRUPO.GRUPO_NOMBRE" loading="lazy">
                                <div class="centered">
                                    <h4 :id="`menu-${m.GRUPO.GRUPO_ID}`">{{ m.GRUPO.GRUPO_NOMBRE }}</h4>
                                </div>
                            </div>
                            <div class="group-header-sin-img" v-else>
                                <div class="centered">
                                    <h4 :id="`menu-${m.GRUPO.GRUPO_ID}`">{{ m.GRUPO.GRUPO_NOMBRE }}</h4>
                                </div>
                            </div>

                            <div class="row g-0 producto" v-for=" p in m.PRODUCTOS " :key="p" @click="showModal(p)">

                                <div :class=" p.IMAGENES[0] ? 'col-3' : 'd-none' ">
                                    <img :src=" p.IMAGENES[0] ? urlSite(p.IMAGENES[0].PROIMG_RUTA) : '' " class="img-thumbnail rounded" style="width: 100%" loading="lazy">
                                </div>

                                <div :class=" p.IMAGENES[0] ? 'col-9' : 'col-12' ">

                                    <div class="title">
                                        <h5 :class="p.PRODUCTO_LINKED == 0 ? 'margin-title' : '' ">
                                            {{ p.PRODUCTO_NOMBRE }}
                                        </h5>

                                        <h6 v-if=" p.PRODUCTO_LINKED == 1 ">
                                            {{ formatDinero(p.PRODUCTO_BASE.PROVAR_VALOR) }} 
                                            <small v-if=" p.PRODUCTO_BASE.PROVAR_NOMBRE ">/ {{ p.PRODUCTO_BASE.PROVAR_NOMBRE }}</small>
                                        </h6>
                                    </div>

                                    <p v-html="nl2br(p.PRODUCTO_DET)" v-if="p.PRODUCTO_DET"></p>

                                    <div class="mas" v-if=" p.PRODUCTO_LINKED == 1 ">
                                        <p :class=" p.PRODUCTO_DET ? 'mas01' : 'mas02' ">VER MÁS...</p>
                                    </div>

                                    <dl v-if=" p.PRODUCTO_LINKED == 0 ">
                                        <span v-for=" ( valor ) in p.VALORES " :key="valor.PROVAR_VALOR">
                                            <dt>{{ valor.PROVAR_NOMBRE ? `${valor.PROVAR_NOMBRE}` : '*****' }}</dt>
                                            <dd>{{ formatDinero(valor.PROVAR_VALOR) }}</dd>  
                                        </span>
                                    </dl>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <FooterPage />

            </div>
            
        </div>
    </div>
    <ShopResModal />
    <ProductoModal />
    <TipoPagoModal />
    <DatosPagoModal />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from "vuex";
import { urlSite, formatDinero, nl2br } from "@/modules/shared/helpers/helpers"

export default {

    props:{
        slug: {
            type: String,
            required: true
        }
    },
    components: {
        ProductoModal: defineAsyncComponent(() => import('../modals/ProductoModal.vue')),
        HeaderPage: defineAsyncComponent(() => import('../components/HeaderPage.vue')),
        FooterPage: defineAsyncComponent(() => import('../components/FooterPage.vue')),
        ValidatePage: defineAsyncComponent(() => import('../components/ValidatePage.vue')),
        ShopResModal: defineAsyncComponent(() => import('../modals/ShopResModal.vue')),
        TipoPagoModal: defineAsyncComponent(() => import('../modals/TipoPagoModal.vue')),
        DatosPagoModal: defineAsyncComponent(() => import('../modals/DatosPagoModal.vue'))
    },
    computed:{        
        ...mapGetters('home',['getValidate','getMenu','getIsShop'])
    },
    created(){
        this.getMenuApi(this.slug);
    },
    methods: {
        urlSite,
        formatDinero,
        nl2br,
        ...mapActions('home',['getMenuApi']),
        showModal(obj){
            this.$store.commit('home/setOpenModalProducto', true);
            this.$store.commit('home/setProducto', obj);
        },
        goGrupo(id){
            $('html, body').animate({
                scrollTop: $(id).offset().top
            }, 0);
        },
        openShop(){
            this.$store.commit('home/setOpenModalShop', true);            
        },
    }

}
</script>

<style scoped lang="scss">

    .pre-formatted {
    white-space: pre;
    }
    .group-header-con-img {
    position: relative;
    height: 200px;
    overflow: hidden;
    margin-bottom: 10px;
    }
    .group-header-sin-img {
    height: auto;
    margin-bottom: 10px;
    }
    .group-header-con-img img {
        width: 100%;
    }
    .group-header-con-img .centered{
        background-color: rgba(28, 28, 28, 0.5);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .group-header-sin-img .centered {
        background-color: rgba(28, 28, 28, 0.5);
        width: 100%;
        padding: 10px 0;
    }
    .group-header-con-img .centered h4,
    .group-header-sin-img .centered h4{
        color: var(--light);
        text-align: center; 
        font-size: 1.6rem;
        margin: 8px 0;
    }
    .producto{
        background-color: #f8f8f9;
        border-bottom: 1px solid #ececec;
        padding: 20px 0 10px;
    }
    .producto .title .margin-title{
        margin-bottom: 10px;
    }
    .producto h5{
        font-size: 1.0rem;
        font-weight: bold;
        text-align: left;
        margin: 0 0 0 5px;
        padding: 0;
    }
    .producto h6{
        font-size: 1.0rem;
        font-style: oblique;
        font-weight: bold;
        text-align: right;
        padding: 0;
    }
    .producto h6 small{
        font-weight: normal;
    }
    .producto p{
        line-height: 0.9rem;
        font-size: 0.8rem;
        text-align: left;
        margin: -8px 20px 0 5px;
    }
    .producto .mas p{
        font-size: 0.8rem;
        font-style: oblique;
        text-align: right;
    }
    .producto .mas p.mas01{
        margin: 15px 0 0 0 !important;
    }
    .producto .mas p.mas02{
        margin: 35px 0 0 0 !important;
    }
    dl {
        width: 50%;
        color: var(--texto);
        float: right;
        font-weight: normal;
        font-size: 0.9rem;
        line-height: 0.9rem;
        margin: 10px 0 0;
    }
    dt {
        float: left; 
        font-weight: normal;
        overflow: hidden; 
        white-space: nowrap;
        width: 75%; 
    }
    dd { 
        float: left; 
        overflow: hidden;
        text-align: right;
        width: 25%;
    }
    dt:after { 
        content: " .................................................................................." 
    }

    .scrolling-wrapper {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin: 15px 0;

        a.box-menu {
            display: inline-block;
            background-color: var(--dark);
            color: var(--light);
            padding: 5px 10px;
            margin: 0 2px 0;
            text-decoration: none;
        }
    }
    .top {
        width: auto;
        font-size: 1rem;
        color: #9c9a9f;
        cursor: pointer;
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 15;
    }
    .shop {
        width: auto;
        font-size: 1rem;
        color: #9c9a9f;
        cursor: pointer;
        position: fixed;
        top: 28%;
        right: 0;
        z-index: 15;
    }

    @media (min-width: 500px) {
            .top {
            right: 38%;
        }    
    }
</style>