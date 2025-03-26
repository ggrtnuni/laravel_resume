import './bootstrap';

import resumeV3 from './modules/resume-v3';

window.resumeV3 = resumeV3;

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist'

Alpine.plugin(persist)

window.Alpine = Alpine;

Alpine.start();
