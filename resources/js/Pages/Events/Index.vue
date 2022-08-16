<template>
  <div id="app">
    <h1>Calendrier d'évenements</h1>
    <div id="conteneur1" class="row">
      <div class="offset-4 col-8">
        <form>
          <label id="nom" class="col-2" for="date"><strong>Periode</strong></label>
          <input class="col-5" id="date" type="text" v-model="periode" placeholder="YYYY-MM-DD - YYYY-MM-DD">
          <a @click="getFilteredEvents" class="btn btn-primary"><strong>afficher</strong></a>
        </form>
      </div>
    </div>
    <div>
      <table class="table">
        <tbody>
          <template v-for="item in events.data" v-bind:key="item.id">
            <tr>
              <td><strong>{{ item.name }}/{{item.date}}</strong></td>
              <td>
                <a @click="showModal4" class="btn btn-primary">  
                  <strong>Modifier</strong>
                </a>
                <a @click="deletePost(item.id)" class="btn btn-danger">  
                  <strong>Supprimer</strong>
                </a>
              </td>
            </tr>
            <modal4 v-show="isModalVisible4" :item="item" v-if="isModalVisible4" @close="closeModal4">
              <h3 slot="header">modification d'un évenement</h3>
            </modal4>
          </template>
        </tbody>
      </table>
      <div>
        <a id="create" @click="showModal2" class="btn btn-success">  
          <strong>Créer un évenement</strong>
        </a>
      </div>
    </div>
    <modal2 v-show="isModalVisible2" v-if="isModalVisible2" @close="closeModal2">
      <h3 slot="header">creation d'un évenement</h3>
    </modal2>
    <div id="conteneur2">
      <v-calendar />
    </div>
  </div>
</template>

<script>
import {usePage} from "@inertiajs/inertia-vue3";
import {Inertia} from "@inertiajs/inertia";
import {computed, inject} from "vue";
import ModalWindow2 from "../../Partials/ModalWindow2.vue";
import ModalWindow4 from "../../Partials/ModalWindow4.vue";

export default {
   data: () => ({
      begin_date: '',
      end_date: '',
      periode: '',
      events2: [],
      isModalVisible2: false,
      isModalVisible4: false            
   }),
    setup() {
      const route = inject('$route');
      const deletePost = (id) => {
        if (!confirm('Are you sure?')) return;
        Inertia.delete(route('events.destroy', {id}));
      }
      const events = computed(() => usePage().props.value.events);
      const numberLinks = events.value.links.filter((v, i) => i > 0 && i < events.value.links.length - 1);
      return {
        events,
        deletePost,
        numberLinks
      }
    },
    components: {
      ModalWindow2,
      ModalWindow4
    },
    methods: {
      showModal2() {
        this.isModalVisible2 = true;
      },
      showModal4() {
        this.isModalVisible4 = true;
      },
      closeModal2() {
        this.isModalVisible2 = false;
      },
      closeModal4() {
        this.isModalVisible4 = false;
      },
      getFilteredEvents() {
        let temp = '';
        for(var i=0 ; i<10 ; i++){
          temp = temp + this.periode.charAt(i);
        }
        this.begin_date = temp;
        let temp2 = '';
        for(var j=13; j<this.periode.length ; j++){
          temp2 = temp2 + this.periode.charAt(j);
        }
        this.end_date = temp2;
        Inertia.post(route('filteredEvents'), {begin_date: this.begin_date, end_date: this.end_date});
      }
    }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #42b983;
  text-align: center;
  margin-top: 5%;
  margin-right: 10%;
  margin-left: 10%;
}

#conteneur1 {
  margin-top: 7%;
  margin-bottom: 4%;
}

#conteneur2 {
  margin-top: 4%;
}

#date {
  margin-right: 4%;
}

#nom {
  color: black;
}
</style>
