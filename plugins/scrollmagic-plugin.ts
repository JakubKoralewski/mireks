import Vue from "vue";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/minified/plugins/animation.gsap.min";

const GSAPScrollMagic = {
	install(Vue, options) {
		Vue.prototype.$ScrollMagic = {
			Controller: new ScrollMagic.Controller(),
			Scene: ScrollMagic.Scene
		};
	}
};

Vue.use(GSAPScrollMagic);
