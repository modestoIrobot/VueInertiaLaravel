require('./bootstrap');

import {createApp, h} from 'vue';
import { App, plugin } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import ModalWindow2 from './Partials/ModalWindow2'
import ModalWindow4 from './Partials/ModalWindow4'
import VCalendar from 'v-calendar';
import 'v-calendar/dist/style.css';

const el = document.getElementById('app');
InertiaProgress.init();

    const app = createApp({
        data: function() {
            return {
                isModalVisible2: false,
                isModalVisible4: false
            }
        },
        render: () => h(App, {
            initialPage: JSON.parse(el.dataset.page),
            resolveComponent: name => require(`./Pages/${name}`).default
        })
    });
	app.config.globalProperties.$route = window.route;
    app.provide('$route', window.route);
    app.use(plugin).mount(el);

// register modal component
app.component("Modal2", ModalWindow2);
app.component("Modal4", ModalWindow4);
app.use(VCalendar);
