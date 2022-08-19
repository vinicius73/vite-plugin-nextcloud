import { createApp, defineComponent, defineAsyncComponent, h } from 'vue';
import Main from './views/main.vue'

import './assets/main.pcss';

const app = createApp(defineComponent({
  render: () => h(Main)
}));

app.mount('#app-main-content');
