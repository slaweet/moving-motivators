import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUsers, faMedal, faSearch, faChess, faPowerOff,
  faUmbrellaBeach, faBook, faBullseye, faPoll, faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default () => {
  library.add(
    faUsers, faMedal, faSearch, faChess, faPowerOff,
    faUmbrellaBeach, faBook, faBullseye, faPoll, faComments,
  );

  Vue.component('font-awesome-icon', FontAwesomeIcon);
};
