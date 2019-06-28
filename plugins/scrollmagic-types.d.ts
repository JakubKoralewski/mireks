import Vue from "vue";
import { Timeline, Tween } from "gsap";
/* tslint:disable ban-types no-namespace max-classes-per-file */
/* https://github.com/danhanfry/KawasakiReproject/blob/master/KawasakiReproject/scripts/typings/scrollmagic.d.ts */

declare enum SCROLL_DIRECTION {
	SCROLL_DIRECTION_FORWARD,
	SCROLL_DIRECTION_REVERSE,
	SCROLL_DIRECTION_PAUSED
}

declare enum SCENE_STATE {
	SCENE_BEFORE,
	SCENE_DURING,
	SCENE_AFTER
}

interface IControllerOptions {
	container?: string | HTMLElement;
	vertical?: boolean;
	globalSceneOptions?: ISceneOptions;
	loglevel?: number;
	refreshInterval?: number;
}

interface ISceneOptions {
	duration?: number | string | Function;
	offset?: number;
	triggerElement?: string | HTMLElement;
	triggerHook?: number | string;
	reverse?: boolean;
	loglevel?: number;
}

interface ISetPinSettings {
	pushFollowers?: boolean;
	spacerClass?: string;
}

interface ICommonEventProperties {
	type: string;
	target: ScrollMagic.Scene;
}

interface IAddSceneEventProperties extends ICommonEventProperties {
	controller: boolean;
}

interface IChangeScenceEventProperties extends ICommonEventProperties {
	what: string;
	newval: any;
}

interface IDestroySceneEventProperties extends ICommonEventProperties {
	reset: boolean;
}

interface ISceneDirectionEventProperties extends ICommonEventProperties {
	progress: number;
	state: string;
	scrollDirection: string;
}

interface IShiftSceneEventProperties extends ICommonEventProperties {
	reason: string;
}

interface IUpdateSceneEventProperties extends ICommonEventProperties {
	startPos: number;
	endPos: number;
	scrollPos: number;
}

interface ISceneAddIndicatorOptions {
	parent?: string | HTMLElement;
	name?: string;
	indent?: number;
	colorStart?: string;
	colorEnd?: string;
	colorTrigger?: string;
}

interface ISceneAboutProperties {
	size: number;
	vertical: boolean;
	scrollPos: number;
	scrollDirection: string;
	container: HTMLElement;
	isDocument: boolean;
}

declare namespace ScrollMagic {
	export class Controller {
		constructor(options?: IControllerOptions);
		addScene(newScene: Scene | Scene[]): Controller;
		destroy(resetScenes?: boolean): void;
		removeScene(scene: Scene | Scene[]): Controller;
		scrollTo(
			scrollTarget: number | string | HTMLElement | Function | Scene,
			additionalParameter?: any
		): Controller;
		update(immediately?: boolean): Controller;
		updateScene(scene: Scene, immediately?: boolean): Controller;

		enabled(newState?: boolean): boolean | Controller;
		loglevel(newLogLevel?: number): number | Controller;
		scrollPos(scrollPosMethod?: Function): number | Controller;

		info(
			about?: string
		): ISceneAboutProperties | number | string | boolean | HTMLElement;
	}

	export class Scene {
		constructor(options?: ISceneOptions);

		addTo(controller: Controller): Scene;
		controller(): Controller;
		destroy(reset?: boolean): void;
		progress(progress?: number): number;
		refresh(): Scene;
		remove(): Scene;
		removeClassToggle(reset?: boolean): Scene;
		removePin(reset?: boolean): Scene;
		setClassToggle(element: string | HTMLElement, classes: string): Scene;
		setPin(
			element: string | HTMLElement,
			settings?: ISetPinSettings
		): Scene;
		update(immediately?: boolean): Scene;

		duration(newDuration?: number | Function): number;
		enabled(newState?: boolean): boolean | Scene;
		loglevel(newLogLevel?: number): number;
		offset(newOffset?: number): number;
		reverse(newReverse?: boolean): boolean;
		triggerElement(
			newTriggerElement?: string | HTMLElement
		): string | HTMLElement;
		triggerHook(newTriggerHook?: number | string): number;

		scrollOffset(): number;
		state(): string;
		triggerPosition(): number;

		off(
			names: string,
			callback?: (
				event:
					| ICommonEventProperties
					| IAddSceneEventProperties
					| IChangeScenceEventProperties
					| IDestroySceneEventProperties
					| ISceneDirectionEventProperties
					| IShiftSceneEventProperties
					| IUpdateSceneEventProperties
			) => void
		): Scene;

		on(
			names: string,
			callback: (
				event:
					| ICommonEventProperties
					| IAddSceneEventProperties
					| IChangeScenceEventProperties
					| IDestroySceneEventProperties
					| ISceneDirectionEventProperties
					| IShiftSceneEventProperties
					| IUpdateSceneEventProperties
			) => void
		): Scene;

		trigger(name: string, vars?: any): Scene;

		/* add indicator plugins */
		addIndicators(options?: ISceneAddIndicatorOptions): Scene;
		removeIndicators(): void;

		/*GSAP plugins */
		removeTween(reset?: boolean): Scene;
		setTween(tweenObject: Timeline | Tween): Scene;
		setTween(
			tweenObject: string | HTMLElement | Tween,
			duration: number,
			params: Object
		): Scene;
		tweenChanges(newTweenChanges?: boolean): Scene;
	}
}

declare module "vue/types/vue" {
	interface Vue {
		$ScrollMagic: {
			Controller: ScrollMagic.Controller;
			Scene: new (options: ISceneOptions) => ScrollMagic.Scene;
		};
	}
}

